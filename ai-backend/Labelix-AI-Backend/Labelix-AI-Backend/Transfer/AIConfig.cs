using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Labelix_AI_Backend.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Labelix_AI_Backend.Transfer
{
    public class AIConfig : TransferObject, IAIConfig
    {
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("DockerImageName")]
        public string DockerImageName { get; set; }
        [JsonPropertyName("Parameter")]
        public string Parameter { get; set; }
        [JsonPropertyName("InputDirectory")]
        public string InputDirectory { get; set; }
        [JsonPropertyName("OutputDirectory")]
        public string OutputDirectory { get; set; }

        public void CopyProperties(IAIConfig other)
        {
            Name = other.Name;
            DockerImageName = other.DockerImageName;
            Parameter = other.Parameter;
            InputDirectory = other.InputDirectory;
            OutputDirectory = other.OutputDirectory;
        }
    }
}
