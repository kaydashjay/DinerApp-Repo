using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using DAO;

namespace DTO
{
    [DataContract]
    public class UserDTO : DataTO
    {
        [DataMember]
        public string fname { get; set; }
        [DataMember]
        public string lname { get; set; }
        [DataMember]
        public int id { get; set; }
        [DataMember]
        public string street{ get; set; }
        [DataMember]
        public string city { get; set; }
        [DataMember]
        public string state { get; set; }
        [DataMember]
        public int zip { get; set; }

        public UserDTO() { }
        public UserDTO(int Id, string Fname, string Lname, string street,string city, string state, int zipcode  )
        {
            this.fname = Fname;
            this.lname = Lname;         
            this.id = Id;
            this.street = street;
            this.city = city;
            this.state = state;
            this.zip = zipcode;

        }
        
    }
}
