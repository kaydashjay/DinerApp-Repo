using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAO;

namespace DTO
{
    public static class DTOMapper
    {
        //MENU MAPPING
        public static MenuDTO MenuConvertToDTO(this Menu data)
        {
            return new MenuDTO(data.menu_id, data.name, System.Convert.ToDouble(data.price), data.cat_id);

        }
        public static IEnumerable<MenuDTO> MenuConvertToDTO (this List <Menu> data)
        {
            return data.Select(item => item.MenuConvertToDTO());
        }

        //CART MAPPING
        public static CartDTO CartConvertToDTO(this Cart data)
        {
            return new CartDTO(data.cart_id,data.menu_id, data.Menu.name, data.Menu.price, data.quantity);

        }
        public static IEnumerable<CartDTO> CartConvertToDTO(this IEnumerable<Cart> data)
        {
            return data.Select(item => item.CartConvertToDTO());
        }

        //USER MAPPING
        public static UserDTO UserConvertToDTO(this User data)
        {
            return new UserDTO( data.user_id, data.username, data.password, data.fname, data.lname, data.street, data.city, data.state, data.zipcode);

        }
        public static IEnumerable<UserDTO> UserConvertToDTO(this IEnumerable<User> data)
        {
            return data.Select(item => item.UserConvertToDTO());
        }
    }
}
