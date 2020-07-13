using Labelix.Contracts.Persistence;
using Labelix.Transfer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Labelix.Transfer.Modules
{
    public class Data : TransferObject,IData
    {
        [JsonPropertyName("ProjectId")]
        public int ProjectId { get; set; }
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Format")]
        public string Format { get; set; }
        [JsonPropertyName("Data")]
        public string Base64 { get; set; }
    }
}
