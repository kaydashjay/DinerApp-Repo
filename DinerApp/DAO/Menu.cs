using DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DinerApp
{
    public static class Menu
    {
        public static List<MenuDAO> menu = new List<MenuDAO>()
        {
           new MenuDAO("Boneless Wings",10.49,"Appetizers"),
           new MenuDAO("Salsa Verde Beef Nachos", 9.99,"Appetizers"),
           new MenuDAO("Chicken Quesadilla",8.29,"Appetizers"),
           new MenuDAO("Steak Quesadilla",9.29,"Appetizers"),
           new MenuDAO("Mozzerella Sticks",8.29,"Appetizers"),

           new MenuDAO("Thai Shrimp Salad",11.29,"Salads"),
           new MenuDAO("Grilled Chicken Caesar Salad",10.79,"Salads"),
           new MenuDAO("Oriental Chicken Salad",10.99,"Salads"),
           new MenuDAO("Crispy Chicken 'N Cornbread Salad",10.99,"Salads"),
           new MenuDAO("Southwest Grilled Chicken Salad",10.29,"Salads"),

           new MenuDAO("NEW Caprese Mozzarella Chicken",10.99,"Chicken"),
           new MenuDAO("Cedar Grilled Lemon Chicken",11.29,"Chicken"),
           new MenuDAO("Chicken Tenders Platter",11.29,"Chicken"),
           new MenuDAO("Bourbon Street Chicken + Shrimp",13.49,"Chicken"),
           new MenuDAO("Fiesta Lime Chicken",12.49,"Chicken"),

           new MenuDAO("NEW Whisky Bacon Burger",10.99,"Burgers"),
           new MenuDAO("All-day Brunch Burger",10.99,"Burgers"),
           new MenuDAO("NEW Caprese Mozzarella Burger",10.99,"Burgers"),
           new MenuDAO("Quesadilla Burger",10.69,"Burgers"),
           new MenuDAO("The American Standard",9.99,"Burgers")
            };
    }
}