using Labelix.Transfer.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Modules
{
    public class AILabelingInfo : TransferObject
    {
        [JsonPropertyName("config")]
        public AIModelConfig config { get; set; }

        [JsonPropertyName("images")]
        public List<Data> data { get; set; }

    }
}
