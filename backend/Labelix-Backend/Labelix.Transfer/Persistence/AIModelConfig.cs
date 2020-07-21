using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public class AIModelConfig : TransferObject, IAIModelConfig
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("dockerImageName")]
        public string DockerImageName { get; set; }
        [JsonPropertyName("parameter")]
        public string Parameter { get; set; }
        [JsonPropertyName("inputDirectory")]
        public string InputDirectory { get; set; }
        [JsonPropertyName("outputDirectory")]
        public string OutputDirectory { get; set; }
        [JsonPropertyName("options")]
        public string Options { get; set; }

        public void CopyProperties(IAIModelConfig other)
        {
            Id = other.Id;
            Name = other.Name;
            DockerImageName = other.DockerImageName;
            Parameter = other.Parameter;
            InputDirectory = other.InputDirectory;
            OutputDirectory = other.OutputDirectory;
            Options = other.Options;
        }
    }
}
