
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

namespace DinerApp.WebAPI.Controllers
{ [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CartController : ApiController
    {
        static DinerAppDB2Entities db = new DinerAppDB2Entities();

        [HttpGet]
        public string GetCart()
        {

            IEnumerable<CartDTO> cartDTO = (from item in db.Carts
                               join m in db.Menus on item.menu_id equals m.menu_id into members
                        where item.Menu.menu_id==item.menu_id
                        select new CartDTO()
                        { 
                            id= item.cart_id, name = item.Menu.name, price = item.Menu.price, quantity= item.quantity }
                        ).ToList();

           
            //IEnumerable<CartDTO> cartDTO = DTOMapper.CartConvertToDTO(cart);

            var json = JsonConvert.SerializeObject(cartDTO);

            return json;
        }

        /*[Route("api/Cart/GetItem/{id}")]
        public IHttpActionResult GetCartItem(int id)
        {
            /* TouristAttraction touristattraction = db.TouristAttractions.Find(id);
             if (touristattraction == null)
             {
                 throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
             }

             return touristattraction;*/
        //var cart = Cart.cart.FirstOrDefault((c) => c.ID == id);
        /*   if (cart == null)
           {
               return NotFound();
           }
           return Ok(cart);
       }*/

        //need for cart async
        [HttpDelete]
        [Route("api/Delete/{index}")]
        public IHttpActionResult DeleteCartItemAtIndex(int index)
        {
            try
            {
               // Cart.cart.RemoveAt(index);
            }
            catch (ArgumentOutOfRangeException e)
            {
                //log the exception e.Message
                return BadRequest("The index is out of range");
            }
            return null;
            //return Ok(Cart.cart);
        }

        [HttpPost]
        //[Route("api/AddItem")]
        public IHttpActionResult PostAddItem([FromBody]string data)
        {
            CartDAO C = JsonConvert.DeserializeObject<CartDAO>(data);
          // Cart.cart.Add( new CartDAO(C.ID,C.Name, C.Price,C.Quantity));
           
            return Ok(C);
        }

    }
}
