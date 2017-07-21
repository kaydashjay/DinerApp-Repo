using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using DAO;

namespace DinerApp
{
    public static class User
    {
        
        public static Address address = new Address("1810 Lind Street", "Quincy", "IL", 62301);
         public static UserDAO user = new UserDAO("Kurtwood", "Greene,Jr.", 1, address);
 
    }
}
