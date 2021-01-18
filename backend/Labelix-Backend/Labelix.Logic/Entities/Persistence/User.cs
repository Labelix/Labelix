using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    class User : IdentityObject, IUser
    {
        [Column("Keycloak_id")]
        public string KeycloakId { get; set; }
        public void CopyProperties(IUser other)
        {
            this.Id = other.Id;
            KeycloakId = other.KeycloakId;
        }
    }
}
