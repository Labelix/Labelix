using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Modules
{
    public class MultipleData : TransferObject
    {
        [JsonPropertyName("images")]
        public List<Data> Data { get; set; }
    }
}
