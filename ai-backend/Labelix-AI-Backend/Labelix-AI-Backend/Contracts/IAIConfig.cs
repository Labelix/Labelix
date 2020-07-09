using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix_AI_Backend.Contracts
{
    public interface IAIConfig : IIdentifiable, ICopyable<IAIConfig>
    {
        public string Name { get; set; }
        public string DockerImageName { get; set; }
        public string Parameter { get; set; }
        public string InputDirectory { get; set; }
        public string OutputDirectory { get; set; }
    }
}
