using Labelix_AI_Backend.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix_AI_Backend.Entities
{
    class AIConfig : IdentityObject, IAIConfig
    {
        public string Name { get; set; }
        public string DockerImageName { get; set; }
        public string Parameter { get; set; }
        public string InputDirectory { get; set; }
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
