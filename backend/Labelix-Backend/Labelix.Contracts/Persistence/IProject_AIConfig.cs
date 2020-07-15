using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Contracts.Persistence
{
    public partial interface IProject_AIConfig : ICopyable<IProject_AIConfig>, IIdentifiable
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }
    }
}
