using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DTO;

using Newtonsoft.Json;


namespace DinerApp.Controllers
{
    [EnableCors(origins:"*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        [HttpGet]
        public string GetUser()
        {
            var userDTO = DinerApp.User.user.UserConvertToDTO();

            var json = JsonConvert.SerializeObject(userDTO);

            return json;
        }
    }
}
