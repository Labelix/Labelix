using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Transfer.Persistence
{
    public class Project_AIModelConfig : TransferObject, IProject_AIModelConfig
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }

        public void CopyProperties(IProject_AIModelConfig other)
        {
            this.ProjectKey = other.ProjectKey;
            this.AIConfigKey = other.AIConfigKey;
        }
        public Project_AIModelConfig(){}
        public Project_AIModelConfig(int aiConfigKey, int projectKey)
        {
            ProjectKey = projectKey;
            AIConfigKey = aiConfigKey;
        }
    }
}
