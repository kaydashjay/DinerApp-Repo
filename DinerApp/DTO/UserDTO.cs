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
        public Address address { get; set; }

        public UserDTO() { }
        public UserDTO(string Fname, string Lname, int Id, Address Address)
        {
            this.fname = Fname;
            this.lname = Lname;
            this.address = Address;
            this.id = Id;

        }
        
    }
}
