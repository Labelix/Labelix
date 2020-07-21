using Labelix.Contracts.Persistence;
using System.Collections.Generic;

namespace Labelix.Logic.Entities.Persistence
{
    class AIModelConfig : IdentityObject, IAIModelConfig
    {
        public string Name { get; set; }
        public string DockerImageName { get; set; }
        public string Parameter { get; set; }
        public string InputDirectory { get; set; }
        public string OutputDirectory { get; set; }
        public string Options { get; set; }
        public ICollection<Project_AIModelConfig> Projects { get; set; }

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
