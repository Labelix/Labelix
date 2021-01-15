using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    class User : IdentityObject, IUser
    {
        public string KeycloakId { get; set; }
        public void CopyProperties(IUser other)
        {
            this.Id = other.Id;
            KeycloakId = other.KeycloakId;
        }
    }
}
