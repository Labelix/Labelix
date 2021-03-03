using System.Collections.Generic;
using System.Text.Json.Serialization;
using Labelix.Transfer.Persistence;

namespace Labelix.Transfer.Modules
{
    public class AILabelingInfo : TransferObject
    {
        [JsonPropertyName("config")] public AIModelConfig config { get; set; }

        [JsonPropertyName("images")] public List<Data> data { get; set; }
    }
}