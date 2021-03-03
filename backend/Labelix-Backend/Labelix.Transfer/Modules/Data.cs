using System.Text.Json.Serialization;
using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Modules
{
    public class Data : TransferObject, IData
    {
        public Data()
        {
        }

        public Data(int projectId, string name, string format, string base64, double height, double width)
        {
            ProjectId = projectId;
            Name = name;
            Format = format;
            Base64 = base64;
            Width = width;
            Height = height;
        }

        [JsonPropertyName("ProjectId")] public int ProjectId { get; set; }

        [JsonPropertyName("Name")] public string Name { get; set; }

        [JsonPropertyName("Format")] public string Format { get; set; }

        [JsonPropertyName("Data")] public string Base64 { get; set; }

        [JsonPropertyName("Width")] public double Width { get; set; }

        [JsonPropertyName("Height")] public double Height { get; set; }

        public Data CopyProperties(IData other)
        {
            Base64 = other.Base64;
            Format = other.Format;
            Height = other.Height;
            Name = other.Name;
            ProjectId = other.ProjectId;
            Width = other.Width;
            Id = other.Id;
            return this;
        }
    }
}