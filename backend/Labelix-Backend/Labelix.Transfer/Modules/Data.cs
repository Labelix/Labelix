using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Labelix.WebAPI.Modules
{
    public class Data
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("format")]
        public string Format { get; set; }
        [JsonPropertyName("data")]
        public string Base64 { get; set; }
    }
}
