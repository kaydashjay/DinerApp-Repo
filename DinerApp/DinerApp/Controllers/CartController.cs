
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
using Newtonsoft.Json.Linq;

namespace DinerApp.WebAPI.Controllers
{ [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CartController : ApiController
    {

        [HttpGet]
        public string GetCart()
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            { 
                IEnumerable<CartDTO> cartDTO = (from item in db.Carts
                                                //join m in db.Menus on item.menu_id equals m.menu_id into members
                                               where item.Menu.menu_id == item.menu_id
                                                select new CartDTO()
                                                {
                                                    id = item.cart_id,
                                                    menu_id = item.menu_id,
                                                    name = item.Menu.name,
                                                    price = item.Menu.price,
                                                    quantity = item.quantity
                                                }).ToList();


            //IEnumerable<CartDTO> cartDTO = DTOMapper.CartConvertToDTO(cart);

            var json = JsonConvert.SerializeObject(cartDTO);

            return json;
            }
        }
        [Route("api/Cart/GetTotal")]
        public decimal? GetTotal()
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                var total = db.GetTotal().Single();

                /*IEnumerable<CartDTO> cartDTO = (from item in db.Carts
                                                    //join m in db.Menus on item.menu_id equals m.menu_id into members
                                                where item.Menu.menu_id == item.menu_id
                                                select new CartDTO()
                                                {
                                                    id = item.cart_id,
                                                    menu_id = item.menu_id,
                                                    name = item.Menu.name,
                                                    price = item.Menu.price,
                                                    quantity = item.quantity
                                                }).ToList();*/


                //IEnumerable<CartDTO> cartDTO = DTOMapper.CartConvertToDTO(cart);


                return total;
            }
        }

        [Route("api/Cart/{id}")]
        public string GetCartItem(int id)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                IEnumerable<CartDTO> item = (from listitem in db.Carts
                                                 //join m in db.Menus on id equals m.menu_id into members
                                             where id == listitem.menu_id
                                             select new CartDTO()
                                             {
                                                id = listitem.cart_id,
                                                menu_id = listitem.menu_id,
                                                name = listitem.Menu.name,
                                                price =listitem.Menu.price,
                                                quantity = listitem.quantity
                                             });
                if (item == null)
                {
                    return "Not Found";
                }

                var json = JsonConvert.SerializeObject(item);

                return json;
              
            }
       }
        [HttpPut]
       // [Route("api/Cart/{name}")]
        public IHttpActionResult UpdateCartItem([FromBody]string data)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                var cart = JObject.Parse(data);
                var name = (string)cart["name"];
                //gets the record that needs to be updated
                var item = (from listitem in db.Carts
                                //join m in db.Menus on id equals m.menu_id into members
                            where name ==listitem.Menu.name
                            select listitem).Single();
                
                if (item == null) 
                {
                    return NotFound();
                }

                item.quantity = (int)cart["quantity"];
                db.SaveChanges();
                return Ok();
            }
        }

        //need for cart async
        [HttpDelete]
        [Route("api/Cart/{name}")]
        public IHttpActionResult DeleteCartItemByID(string name)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                try
                {
                    var row = (from item in db.Carts
                               where name == item.Menu.name
                               select item).Single();

                   
                    db.Carts.Remove(row);
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

        [HttpPost]
        //[Route("api/AddItem")]
        public IHttpActionResult PostAddItem([FromBody]string data)
        {
            using (DinerAppDB2Entities db = new DinerAppDB2Entities())
            {
                Cart cart= new Cart();
                CartDTO C = JsonConvert.DeserializeObject<CartDTO>(data);
                //gets menu_id from Menu
                var menu_id = (from item in db.Menus
                         where C.name == item.name
                         select item.menu_id).SingleOrDefault();

                bool Exist = false;

                    Exist = db.Carts.Any(r => r.menu_id.Equals(menu_id));

                     if (Exist)
                    {
                    var row = (from item in db.Carts
                               where menu_id == item.menu_id
                               select item).Single();
                   
                   
                        row.quantity += C.quantity;
                        db.SaveChanges();
                    return Ok(row.quantity);
                
                    }

                
                if (Exist == false)
                {
                    cart = new Cart()
                    {
                        menu_id = menu_id,
                        quantity = C.quantity
                    };

                    db.Carts.Add(cart);
                    db.SaveChanges();
                    return Ok(cart);
                }
                return Ok();
                
            }
        }

    }
}
