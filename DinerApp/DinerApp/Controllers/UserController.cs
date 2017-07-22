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
        static DinerAppDB2Entities db = new DinerAppDB2Entities();

        [HttpGet]
        public string GetUser()
        {
            var user = (from item in db.Users
                        select item).ToList();

            IEnumerable<UserDTO> userDTO = DTOMapper.UserConvertToDTO(user);

            var json = JsonConvert.SerializeObject(userDTO);

            return json;
        }
    }
}
