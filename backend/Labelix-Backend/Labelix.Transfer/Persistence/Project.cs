using Labelix.Contracts.Persistence;
using Labelix.Transfer.Modules;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public class Project : TransferObject, IProject
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Description")]
        public string Description { get; set; }
        [JsonPropertyName("CreationDate")]
        public DateTime CreationDate { get; set; }
        [JsonPropertyName("FinishedAnnotation")]
        public bool FinishedAnnotation { get; set; }
        [JsonPropertyName("Label")]
        public string LabeledPath { get; set; } = "";
        [JsonPropertyName("Images")]
        public List<Data> Images { get; set; }

        public void CopyProperties(IProject other)
        {
            Id = other.Id;
            Name = other.Name;
            Description = other.Description;
            CreationDate = other.CreationDate;
            FinishedAnnotation = other.FinishedAnnotation;
            LabeledPath = other.LabeledPath;
        }
    }
}
