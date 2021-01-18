using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    class User : IdentityObject, IUser
    {
        public void CopyProperties(IUser other)
        {
            this.Id = other.Id;
            Keycloak_id = other.Keycloak_id;
        }

        public string Keycloak_id { get; set; }
    }
}
