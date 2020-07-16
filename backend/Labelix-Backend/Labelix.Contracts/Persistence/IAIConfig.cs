using System.Collections;
using System.Collections.Generic;

namespace Labelix.Contracts.Persistence
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
