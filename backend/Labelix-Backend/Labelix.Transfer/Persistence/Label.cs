using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public class Label : TransferObject, ILabel
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Color")]
        public string Color { get; set; }

        public void CopyProperties(ILabel other)
        {
            Id = other.Id;
            Name = other.Name;
            Color = other.Color;
        }
    }
}
