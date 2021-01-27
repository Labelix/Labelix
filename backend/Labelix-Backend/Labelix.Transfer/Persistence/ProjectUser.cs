using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Persistence
{
    public class ProjectUser : TransferObject, IProject_User
    {
        public void CopyProperties(IProject_User other)
        {
            this.Id = other.Id;
            this.ProjectKey = other.ProjectKey;
            this.UserIdKey = other.UserIdKey;
        }

        public int ProjectKey { get; set; }
        public int UserIdKey { get; set; }
    }
}
