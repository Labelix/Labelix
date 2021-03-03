using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Contracts.Persistence
{
    public partial interface IProject_AIModelConfig : ICopyable<IProject_AIModelConfig>, IIdentifiable
    {
        public int ProjectKey { get; set; }
        public int AIConfigKey { get; set; }
    }
}
