using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Contracts.Persistence
{
    public interface IUser : ICopyable<IUser>, IIdentifiable
    {
        string Keycloak_id { get; set; }
    }
}
