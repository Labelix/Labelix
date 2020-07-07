using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Contracts.Persistence
{
    public interface IProject : IIdentifiable, ICopyable<IProject>
    {
        string Name { get; set; }
        string Description { get; set; }

    }
}
