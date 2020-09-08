using System.Collections;
using System.Collections.Generic;

namespace Labelix.Contracts.Persistence
{
    public interface IAIModelConfig : IIdentifiable, ICopyable<IAIModelConfig>
    {
        public string Name { get; set; }
        public string DockerImageName { get; set; }
        public string Parameter { get; set; }
        public string InputDirectory { get; set; }
        public string OutputDirectory { get; set; }
        public string Options { get; set; }
    }
}
