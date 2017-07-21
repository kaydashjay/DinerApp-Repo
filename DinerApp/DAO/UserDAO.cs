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
        private Address address;

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
        public UserDAO(string fname, string lname, int id, Address address)
        {
            this.fname = fname;
            this.lname = lname;
            this.address = address;
            this.userID = id;

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
        public Address Address
        {
            get { return address; }
            set { address = value; }
        }

        [DataMember]
        public int ID
        {
            get { return userID; }
        }
        #endregion properties
    }

}
