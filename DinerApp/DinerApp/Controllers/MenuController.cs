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
using AutoMapper;


namespace DinerApp.Controllers
{
    [EnableCors(origins:"*", headers:"*", methods:"*")]
    public class MenuController : ApiController
    {
        

        [HttpGet]
        public string GetMenu()
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                List<Menu> menu = new List<Menu>();

                menu = (from item in db.Menus
                        select item).ToList();

                IEnumerable<MenuDTO> menuDTO = DTOMapper.MenuConvertToDTO(menu);

                var json = JsonConvert.SerializeObject(menuDTO);

                return json;
            }
        }
        [Route("api/Menu/{name}")]
        public string GetMenuItem(string name)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                MenuDTO item = (from listitem in db.Menus
                                    //join m in db.Menus on id equals m.menu_id into members
                                where name== listitem.name
                                select new MenuDTO()
                                {
                                    name = listitem.name,
                                    price = listitem.price,
                                    cat = listitem.cat_id
                                }).Single();
                if (item == null)
                {
                    return "Not Found";
                }

                var json = JsonConvert.SerializeObject(item);

                return json;

            }
        }

        //need for cart async
        [HttpDelete]
        [Route("api/Delete/{index}")]
        public IHttpActionResult DeleteMenuItemAtIndex(int index)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                try
                {
                    // Menu.menu.RemoveAt(index);
                }
                catch (ArgumentOutOfRangeException e)
                {
                    //log the exception e.Message
                    return BadRequest("The index is out of range");
                }
                return null;
                //return Ok(Menu.menu);
            }
        }
        [HttpPost]
        public IHttpActionResult PostAddItem([FromBody]string data)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                //Menu cart = new Menu();
                Menu menu = JsonConvert.DeserializeObject<Menu>(data);

                bool Exist = false;

                Exist = db.Menus.Any(r => r.menu_id.Equals(menu.menu_id));

                if (Exist)
                {
                    return null;

                }

                if (Exist == false)
                {
                   
                    db.Menus.Add(menu);
                    db.SaveChanges();
                    return Ok(menu);
                }
                return Ok();

            }
        }
        [HttpPut]
        // [Route("api/Cart/{name}")]
        public IHttpActionResult UpdateMenuItem([FromBody]string data)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                Menu menu = JsonConvert.DeserializeObject<Menu>(data);
                
                //gets the record that needs to be updated
                var item = (from listitem in db.Menus
                                //join m in db.Menus on id equals m.menu_id into members
                            where menu.name == listitem.name
                            select listitem).Single();

                if (item == null)
                {
                    return NotFound();
                }

                item.cat_id = menu.cat_id;
                item.price = menu.price;
                db.SaveChanges();
                return Ok(menu);
            }
        }

        //need for cart async
        [HttpDelete]
        [Route("api/Cart/{name}")]
        public IHttpActionResult DeleteCartItemByName(string name)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                try
                {
                    var row = (from item in db.Menus
                               where name == item.name
                               select item).Single();


                    db.Menus.Remove(row);
                    db.SaveChanges();
                    return Ok(row);
                }
                catch (ArgumentOutOfRangeException e)
                {
                    //log the exception e.Message
                    return BadRequest("The item is not in the Cart");
                }
            }
        }

       
    }
}
