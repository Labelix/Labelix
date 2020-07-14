using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Modules
{
    public class MultipleData: TransferObject
    {
        [JsonPropertyName("images")]
        public List<Data> data{ get; set; }
    }
}
