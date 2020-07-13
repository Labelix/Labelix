﻿using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public partial class Image : TransferObject, IImage
    {
        [JsonPropertyName("ImagePath")]
        public string ImagePath { get; set; } = "";
        [JsonPropertyName("LabeledPath")]
        public string LabeledPath { get; set; } = "";
        [JsonPropertyName("ProjectImageId")]
        public int ProjectImageId { get; set; }

        


        public void CopyProperties(IImage other)
        {
            Id = other.Id;
            ImagePath = other.ImagePath;
            LabeledPath = other.LabeledPath;
            ProjectImageId = other.ProjectImageId;
        }
    }
}