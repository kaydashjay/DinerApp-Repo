
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
        [HttpGet]
        public string GetCart()
        {
            var cartDTO = Cart.cart.CartConvertToDTO();

            var json = JsonConvert.SerializeObject(cartDTO);

            return json;
        }

        [Route("api/Cart/GetItem/{id}")]
        public IHttpActionResult GetCartItem(int id)
        {
            /* TouristAttraction touristattraction = db.TouristAttractions.Find(id);
             if (touristattraction == null)
             {
                 throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
             }

             return touristattraction;*/
            var cart = Cart.cart.FirstOrDefault((c) => c.ID == id);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        //need for cart async
        [HttpDelete]
        [Route("api/Delete/{index}")]
        public IHttpActionResult DeleteCartItemAtIndex(int index)
        {
            try
            {
                Cart.cart.RemoveAt(index);
            }
            catch (ArgumentOutOfRangeException e)
            {
                //log the exception e.Message
                return BadRequest("The index is out of range");
            }

            return Ok(Cart.cart);
        }

        [HttpPost]
        //[Route("api/AddItem")]
        public IHttpActionResult PostAddItem([FromBody]string data)
        {
            CartDAO C = JsonConvert.DeserializeObject<CartDAO>(data);
           Cart.cart.Add( new CartDAO(C.ID,C.Name, C.Price,C.Quantity));
           
            return Ok(C);
        }

    }
}
