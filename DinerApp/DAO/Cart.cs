using DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DinerApp
{
    public static class Cart
    {
        public static List<CartDAO> cart = new List<CartDAO>()
        {
           new CartDAO(1,"Boneless Wings", 10.49, 3),
           new CartDAO(2,"Salsa Verde Beef Nachos", 9.99, 1),
           new CartDAO(3,"Chicken Quesadilla", 8.29, 4),
           new CartDAO(4,"Steak Quesadilla", 9.29, 1),
           new CartDAO(5,"Mozzerella Sticks", 8.29, 2)
           };
    }
}