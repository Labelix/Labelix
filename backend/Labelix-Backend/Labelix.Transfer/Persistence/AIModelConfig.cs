using Labelix.Contracts.Persistence;
using System.Text.Json.Serialization;

namespace Labelix.Transfer.Persistence
{
    public class AIModelConfig : TransferObject, IAIModelConfig
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
