using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DAO
{
    [DataContract]
    public class UserDAO : DataAO
    {
        /// <summary>
        /// a UserDAO class
        /// </summary>
        // private fields
        private string fname;
        private string lname;
        private int userID;
        private string streetAddress;
        private string city;
        private string state;
        private int zip;

        

        #region constructors
        /// <summary>
        /// default constructor
        /// </summary>
        //public UserDAO()
        //{
           // fname = "";
            //lname = "";
            //userID   = null;
          //  address = null;
        //}

        /// <summary>
        /// UserDAO constructor
        /// </summary>
        /// <param name="fname">height of shape</param>
        /// <param name="lname">width of shape</param>
        public UserDAO(string fname, string lname, int id, string street, string city, string state, int zipcode)
        {
            this.fname = fname;
            this.lname = lname;
            this.userID = id;
            this.streetAddress = street;
            this.city = city;
            this.state = state;
            this.zip = zipcode;


    }
    #endregion constructors

    #region properties
    [DataMember]
        public string Fname
        {
            get { return fname; }
            set { fname = value; }
        }
        [DataMember]
        public string Lname
        {
            get { return lname; }
            set { lname = value; }
        }

        [DataMember]
        public int ID
        {
            get { return userID; }
        }
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
            get { return zip; }
            set { zip = value; }
        }
        #endregion properties
    }

}
