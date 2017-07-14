using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DTO
{
    [DataContract]
    public class MenuDTO
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public double price { get; set; }

        public MenuDTO() { }
        public MenuDTO(string n, double p, string t)
        {
            name = n;
            type = t;
            price = p;
        }
        }
}

        
   

