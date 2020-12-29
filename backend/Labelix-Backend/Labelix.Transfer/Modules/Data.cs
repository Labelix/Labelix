using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Modules
{
    public class Data : TransferObject, IData
    {
        #region Constructors
        public Data(){}
        public Data(int projectId, string name, string format, string base64, int width, int height)
        {
            ProjectId = projectId;
            Name = name;
            Format = format;
            Base64 = base64;
            Width = width;
            Height = height;
        }

        #endregion

        #region Properties
        public int ProjectId { get; set; }
        
        public string Name { get; set; }
        
        public string Format { get; set; }

        [JsonPropertyName("Data")]
        public string Base64 { get; set; }

        public int Width { get; set; }
        
        public int Height { get; set; }
        #endregion
    }
}
