using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using DAO;
//using Serialization;

namespace DTO
{
    [DataContract]
    public class MenuDTO : DataTO
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

       /* public static string SerializeMenu(MenuDAO menu)
        {

            return Serializer.Serializer.ListToJson(menu);
        }

        public static MenuDTO DeserializeMenu (string Menu)
        {
            return Serializer.Serializer.JsonToList(Menu) as MenuDTO;
        }
        */

    }
}

        
   

