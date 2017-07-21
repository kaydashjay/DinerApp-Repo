using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace DTO
{
    [DataContract]
    public class CartDTO : DataTO
    {
        [DataMember]
        public string name { get; set; }
        //[DataMember]
       // public string type { get; set; }
        [DataMember]
        public double price { get; set; }
        [DataMember]
        public int quantity { get; set; }
        [DataMember]
        public int id { get; set; }

        public CartDTO() { }
        public CartDTO(int id,double p, string n, int q)
        {
            this.id = id;
            name = n;
            //type = t;
            price = p;
            quantity = q;
        }

    }
}
