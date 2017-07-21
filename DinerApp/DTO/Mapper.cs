using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAO;

namespace DTO
{
    public static class Mapper
    {
        //MENU MAPPING
        public static MenuDTO MenuConvertToDTO(this MenuDAO data)
        {
            return new MenuDTO(data.Name, data.Price, data.Type);

        }
        public static IEnumerable<MenuDTO> MenuConvertToDTO (this IEnumerable <MenuDAO> data)
        {
            return data.Select(item => item.MenuConvertToDTO());
        }

        //CART MAPPING
        public static CartDTO CartConvertToDTO(this CartDAO data)
        {
            return new CartDTO(data.ID, data.Price, data.Name, data.Quantity);

        }
        public static IEnumerable<CartDTO> CartConvertToDTO(this IEnumerable<CartDAO> data)
        {
            return data.Select(item => item.CartConvertToDTO());
        }

        //USER MAPPING
        public static UserDTO UserConvertToDTO(this UserDAO data)
        {
            return new UserDTO(data.Fname, data.Lname, data.ID, data.Address);

        }
        public static IEnumerable<UserDTO> UserConvertToDTO(this IEnumerable<UserDAO> data)
        {
            return data.Select(item => item.UserConvertToDTO());
        }
    }
}
