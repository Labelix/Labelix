using Labelix.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Labelix.Logic.Entities.Persistence
{
    class Project_AIConfig : IdentityObject, IProject_AIConfig
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
