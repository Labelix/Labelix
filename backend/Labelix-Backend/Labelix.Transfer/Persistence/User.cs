using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Transfer.Persistence
{
    public class User : TransferObject,IUser
    {
        public void CopyProperties(IUser other)
        {
            Id = other.Id;
            KeycloakId = other.KeycloakId;
        }

        public string KeycloakId { get; set; }
    }
}
