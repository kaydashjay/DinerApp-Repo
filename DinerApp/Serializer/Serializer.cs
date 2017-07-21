using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
using DTO;

namespace Serializer
{
    public static class ListSerializer
    {
        private static Type listType = typeof(MenuDTO);
        private static MemoryStream stream = null;
        private static DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(listType);
        private static DataContractSerializer xmlSerializer = null;
        private static MenuDTO menu = null;

        /// <summary>
        /// serialize an object with JSON format
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string ListToJson(MenuDTO data)
        {
            stream = new MemoryStream();
            jsonSerializer = new DataContractJsonSerializer(listType);
            jsonSerializer.WriteObject(stream, data);
            byte[] serializedData = stream.ToArray();
            stream.Close();

            return Encoding.UTF8.GetString(serializedData);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MenuDTO JsonToList(string data)
        {
            using (stream = new MemoryStream(Encoding.UTF8.GetBytes(data)))
            {
                menu = jsonSerializer.ReadObject(stream) as MenuDTO;
            }
            return menu;
        }


    }
}
