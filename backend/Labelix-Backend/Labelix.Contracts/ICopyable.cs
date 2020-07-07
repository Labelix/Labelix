using System;
using System.Collections.Generic;
using System.Text;

namespace Labelix.Contracts
{
    public partial interface ICopyable<T>
    {
        void CopyProperties(T other);
    }
}
