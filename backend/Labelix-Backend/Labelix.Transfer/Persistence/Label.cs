using System.Text.Json.Serialization;
using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Persistence
{
    public class Label : TransferObject, ILabel
    {
        [JsonPropertyName("name")] public string Name { get; set; }

        [JsonPropertyName("color")] public string Color { get; set; }

        public void CopyProperties(ILabel other)
        {
            Id = other.Id;
            Name = other.Name;
            Color = other.Color;
        }
    }
}