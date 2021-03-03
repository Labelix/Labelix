using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Modules
{
    public class ProjectInsert : TransferObject, IProject
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("creationDate")]
        public DateTime CreationDate { get; set; }
        [JsonPropertyName("finishedAnnotation")]
        public bool FinishedAnnotation { get; set; }
        [JsonPropertyName("label")]
        public string LabeledPath { get; set; } = "";
        [JsonPropertyName("images")]
        public List<Data> Images { get; set; }
        [JsonPropertyName("AIModelConfig")]
        public List<int> AiModelConfigIds { get; set; }

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
