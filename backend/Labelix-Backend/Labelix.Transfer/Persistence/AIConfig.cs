using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    class AIConfig : TransferObject, IAIConfig
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
