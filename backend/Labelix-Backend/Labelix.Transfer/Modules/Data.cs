using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Labelix.WebAPI.Modules
{
    public class Data
    {
        [JsonPropertyName("data")]
        string Base64 { get; set; }
    }
}
