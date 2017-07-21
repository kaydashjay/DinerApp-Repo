using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DAO;
using DTO;


namespace DinerApp.Tests
{
    [TestClass]
    public class MapperTests
    {
        Address address;
        MenuDAO MenuMock;
        CartDAO CartMock; 
        UserDAO UserMock; 
        CartDTO cart; 
        MenuDTO menu; 
        UserDTO user;

    [TestInitialize]
        public void Init()
        {
            address = new Address("20 Street", "Albania", "Alabama", 12345);
             MenuMock = new MenuDAO("Poo", 10.00, "Burgers");
           CartMock = new CartDAO(2, "Fillet", 2.00, 5);
           UserMock = new UserDAO("KJ", "Harris", 2,address );
             cart = new CartDTO();
           menu = new MenuDTO();
            user = new UserDTO();
        }

        [TestMethod]
        public void TestMenuDAOMapToDTO()
        {
            //arrange
            CartDTO expect = new CartDTO(CartMock.Price, CartMock.Name, CartMock.Quantity);

            //act
            CartDTO actual = CartMock.CartConvertToDTO();

            //assert
            Assert.AreEqual(expect, actual);


        }
    }
}
