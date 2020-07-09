using Labelix_AI_Backend.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix_AI_Backend.Entities
{
    internal partial class IdentityObject : IIdentifiable
    {
        public int Id { get; set; }
    }
}
