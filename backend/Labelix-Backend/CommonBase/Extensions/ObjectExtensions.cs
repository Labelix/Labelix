using System;
using System.Collections.Generic;
using System.Text;

namespace CommonBase.Extensions
{
    public static class ObjectExtensions
    {
        public static void CheckArgument(this object source, string name)
        {
            if (source == null)
                throw new ArgumentNullException(name);
        }
    }
}
