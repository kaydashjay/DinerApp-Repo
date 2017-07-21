using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
using Newtonsoft.Json;

namespace DTO
{
    public class Serializer
    {
        private static Type listType = typeof(DataTO);
        private static MemoryStream stream = null;
        private static DataContractJsonSerializer jsonSerializer = new DataContractJsonSerializer(listType);
        private static DataContractSerializer xmlSerializer = null;
        private static DataTO menu = null;
        private static byte[] serializedData=null;

        public Serializer(){ }
        /// <summary>
        /// serialize an object with JSON format
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static string ListToJSON (IEnumerable<DataTO> data)
        {
            stream = new MemoryStream();
                jsonSerializer = new DataContractJsonSerializer(data.GetType());
                jsonSerializer.WriteObject(stream, data);
                serializedData = stream.ToArray();
            stream.Close();
                

            return Encoding.UTF8.GetString(serializedData);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DataTO JsonToList(string data)
        {
            using (stream = new MemoryStream(Encoding.UTF8.GetBytes(data)))
            {
                menu = jsonSerializer.ReadObject(stream) as DataTO;
            }
            return menu;
        }


    }
}
