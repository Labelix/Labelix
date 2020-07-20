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

        public Data(){}

        public Data(int projectId, string name, string format, string base64)
        {
            ProjectId = projectId;
            Name = name;
            Format = format;
            Base64 = base64;
        }
    }
}
