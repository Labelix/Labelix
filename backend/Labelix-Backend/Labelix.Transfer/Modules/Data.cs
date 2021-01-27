using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Modules
{
    public class Data : TransferObject, IData
    {
        [JsonPropertyName("ProjectId")]
        public int ProjectId { get; set; }
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Format")]
        public string Format { get; set; }
        [JsonPropertyName("Data")]
        public string Base64 { get; set; }
        [JsonPropertyName("Width")]
        public double Width { get; set; }
        [JsonPropertyName("Height")]
        public double Height { get; set; }


        public Data(){}

        public Data(int projectId, string name, string format, string base64, double height, double width)
        {
            ProjectId = projectId;
            Name = name;
            Format = format;
            Base64 = base64;
            Width = width;
            Height = height;
        }
    }
}
