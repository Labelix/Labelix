using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Labelix_AI_Backend.Contracts
{
    public partial interface IIdentifiable
    {
        int Id { get; }
    }
}
