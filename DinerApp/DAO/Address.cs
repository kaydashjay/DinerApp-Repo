using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DAO
{
    [DataContract]
   public class Address
    {
        /// <summary>
        /// a UserDAO class
        /// </summary>
        // private fields
        private string streetAddress;
        private string city;
        private string state;
        private int zip;

        #region constructors
        /// <summary>
        /// default constructor
        /// </summary>
       /* public Address()
        {
            streetAddress = "";
            city = "";
            state = "";
            zip = null;
        }*/

        /// <summary>
        /// constructor to set height and width
        /// </summary>
        /// <param name="height">height of shape</param>
        /// <param name="width">width of shape</param>
        public Address(string street, string city, string state, int zipcode)
        {
            this.streetAddress = street;
            this.city = city;
            this.state =state;
            this.zip = zipcode;
        }
        #endregion constructors

        #region properties
        [DataMember]
        public string Street
        {
            get { return streetAddress; }
            set { streetAddress = value; }
        }
        [DataMember]
        public string City
        {
            get { return city; }
            set { city = value; }
        }

        [DataMember]
        public string State
        {
            get { return state; }
            set { state = value; }
        }

        [DataMember]
        public int Zip
        {
            get { return zip;}
            set { zip = value; }
        }
        #endregion properties
    }

}
