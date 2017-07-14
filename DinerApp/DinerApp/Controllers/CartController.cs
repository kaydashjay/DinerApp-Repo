using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

using DAO;

namespace DinerApp.WebAPI.Controllers
{ [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CartController : ApiController
    {
            [HttpGet]
            public IEnumerable<CartDAO> GetCart()
            {
            return null;
                //return Cart.cart;

            }

            //need for cart async
            [HttpDelete]
            [Route("api/Delete/{index}")]
            public IHttpActionResult DeleteCartItemAtIndex(int index)
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
        }
}
