using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DTO;
using DAO;
using System.Web.Http.Cors;
using Newtonsoft.Json;



namespace DinerApp.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class MenuController : ApiController
    {
        [HttpGet]
        public string GetMenu()
        {
            var menuDTO = Menu.menu.MenuConvertToDTO();

             var json = JsonConvert.SerializeObject(menuDTO);

            return json;
        }

        //need for cart async
        [HttpDelete]
        [Route("api/Delete/{index}")]
        public IHttpActionResult DeleteMenuItemAtIndex(int index)
        {
            try
            {
                Menu.menu.RemoveAt(index);
            }
            catch (ArgumentOutOfRangeException e)
            {
                //log the exception e.Message
                return BadRequest("The index is out of range");
            }

            return Ok(Menu.menu);
        }
        /*[HttpPost]
        public IHttpActionResult PostMenu(List<MenuItem> data)
        {
        }*/
    }
}
