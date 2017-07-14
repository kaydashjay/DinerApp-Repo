using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DTO
{
    [DataContract]
    public class CartDTO
    {
        [DataMember]
        public string name { get; set; }
        [DataMember]
        public string type { get; set; }
        [DataMember]
        public double price { get; set; }
        [DataMember]
        public double quantity { get; set; }

        public CartDTO() { }
        public CartDTO(double p, string t, string n, int q)
        {
            name = n;
            type = t;
            price = p;
            quantity = q;
        }

    }
}
