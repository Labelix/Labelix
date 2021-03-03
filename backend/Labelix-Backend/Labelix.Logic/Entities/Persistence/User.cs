using System.ComponentModel.DataAnnotations.Schema;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Persistence
{
    internal class User : IdentityObject, IUser
    {
        [Column("Keycloak_id")] public string KeycloakId { get; set; }

        public void CopyProperties(IUser other)
        {
            Id = other.Id;
            KeycloakId = other.KeycloakId;
        }
    }
}