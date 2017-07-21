using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DAO
{
    public class CartDAO : DataAO
    {
        /// <summary>
        /// a Shape class
        /// </summary>
        // private fields
        private string name;
        private double price;
       // private string type;
        private int quantity;
        private int id;
        private static List<CartDAO> cart = null;

        #region constructors
        /// <summary>
        /// default constructor
        /// </summary>
        public CartDAO()
        {
            name = "";
            price = 0;
           // type = "";
            quantity = 0;
        }

        /// <summary>
        /// constructor to set height and width
        /// </summary>
        /// <param name="height">height of shape</param>
        /// <param name="width">width of shape</param>
        public CartDAO(int id, string name, double price, int quantity)
        {
            this.id = id;
            this.name = name;
            this.price = price;
            //this.type = type;
            this.quantity = quantity;
        }
        #endregion constructors

        #region properties
        [DataMember]
        public int ID
        {
            get { return id; }
            set { id = value; }
        }
        [DataMember]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        [DataMember]
        public double Price
        {
            get { return price; }
            set { price = value; }
        }

        /*[DataMember]
        public string Type
        {
            get { return type; }
        }*/

        [DataMember]
        public int Quantity
        {
            get { return quantity; }
            set { quantity = value; }
        }
        #endregion properties

        #region methods
        public static void AddItem(CartDAO listItem)
        {
            cart.Add(listItem);
        }
       /* public static List<CartDAO> GetCart()
        {
            var query = from employee in dataContext.Employees
                        select employee;
            return query.ToList();
        }*/

        #endregion methods 

    }
}

