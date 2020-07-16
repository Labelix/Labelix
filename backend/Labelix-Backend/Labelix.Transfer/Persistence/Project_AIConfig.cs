using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Transfer.Persistence
{
    public class Project_AIConfig : TransferObject, IProject_AIConfig
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }

        public void CopyProperties(IProject_AIConfig other)
        {
            this.ProjectKey = other.ProjectKey;
            this.AIConfigKey = other.AIConfigKey;
        }
    }
}
