using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DAO
{
    [DataContract]
    public class MenuDAO : DataAO
    {
        /// <summary>
        /// a Shape class
        /// </summary>
        // private fields
        private string name;
        private int id;
        private double price;
        private string type;

        #region constructors
        /// <summary>
        /// default constructor
        /// </summary>
        public MenuDAO()
        {
            name = "";
            price = 0;
            type = "";
        }

        /// <summary>
        /// constructor to set height and width
        /// </summary>
        /// <param name="height">height of shape</param>
        /// <param name="width">width of shape</param>
        public MenuDAO(int id, string name, double price, string type)
        {
            this.id = id;
            this.name = name;
            this.price = price;
            this.type = type;
        }
        #endregion constructors

        #region properties
        [DataMember]
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        [DataMember]
        public int ID
        {
            get { return id; }
            set { id = value; }
        }
        [DataMember]
        public double Price
        {
            get { return price; }
            set { price = value; }
        }

        [DataMember]
        public string Type
        {
            get { return type; }
        }
        #endregion properties
    }
}
