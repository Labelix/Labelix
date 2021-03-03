using System.Collections.Generic;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class AIModelConfig : IdentityObject, IAIModelConfig
    {
        public ICollection<Project_AIModelConfig> Projects { get; set; }
        public string Name { get; set; }
        public string DockerImageName { get; set; }
        public string Parameter { get; set; }
        public string InputDirectory { get; set; }
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