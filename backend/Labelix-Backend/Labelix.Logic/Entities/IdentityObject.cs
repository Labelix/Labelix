using Labelix.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Logic.Entities
{
    internal partial class IdentityObject : IIdentifiable
    {
        public int Id { get; set; }
    }
}
