using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DAO;
using DTO;

using Newtonsoft.Json;


namespace DinerApp.Controllers
{
    [EnableCors(origins:"*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {

        [HttpGet]
        [Route("api/User/{name}")]
        public string GetUser(string name)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                try
                {
                    var user = (from item in db.Users
                                where name == item.username
                                select new UserDTO()
                                {
                                    username = item.username,
                                    password = item.password,
                                    fname = item.fname,
                                    lname = item.lname,
                                    street = item.street,
                                    city = item.city,
                                    state = item.state,
                                    zip = item.zipcode
                                }).Single();

                   // UserDTO userDTO = DTOMapper.UserConvertToDTO(user);

                    var json = JsonConvert.SerializeObject(user);

                    return json;
                }
                catch (ArgumentNullException e)
                {
                    return null;
                }


              
            }
        }
    }
}
