using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class Project_AIModelConfig : IdentityObject, IProject_AIModelConfig
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }

        public void CopyProperties(IProject_AIModelConfig other)
        {
            ProjectKey = other.ProjectKey;
            AIConfigKey = other.AIConfigKey;
        }
    }
}