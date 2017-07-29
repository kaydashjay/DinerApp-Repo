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
        public int id { get; set; }
        [DataMember]
        public int cat { get; set; }
        [DataMember]
        public decimal price { get; set; }

        public MenuDTO() { }
        public MenuDTO(int i, string n, decimal p, int cat)
        {
            id = i;
            name = n;
            this.cat = cat;
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

        
   

