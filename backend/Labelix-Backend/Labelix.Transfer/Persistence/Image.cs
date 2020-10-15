using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public partial class Image : TransferObject, IImage
    {
        [JsonPropertyName("imagePath")]
        public string ImagePath { get; set; } = "";

        [JsonPropertyName("projectImageId")]
        public int ProjectId { get; set; }


        public void CopyProperties(IImage other)
        {
            Id = other.Id;
            ImagePath = other.ImagePath;
            ProjectId = other.ProjectId;
        }
    }
}
