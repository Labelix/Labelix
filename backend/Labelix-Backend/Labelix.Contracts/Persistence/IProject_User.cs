using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace Labelix.Contracts.Persistence
{
    public interface IProject_User : IIdentifiable,ICopyable<IProject_User>
    {
        public int ProjectKey { get; set; }
        public int UserIdKey { get; set; }
    }
}
