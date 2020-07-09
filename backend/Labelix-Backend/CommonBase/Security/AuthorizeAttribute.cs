//@QnSCodeCopy
//MdStart
using System;
using System.Collections.Generic;

namespace CommonBase.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute
    {
        public bool IsRequired { get; }
        public IEnumerable<string> Roles { get; }
        public AuthorizeAttribute()
        {
            IsRequired = true;
            Roles = new string[0];
        }
        public AuthorizeAttribute(params string[] roles)
        {
            IsRequired = true;
            Roles = roles ?? new string[0];
        }
        protected AuthorizeAttribute(bool isRequired, params string[] roles)
        {
            IsRequired = isRequired;
            Roles = roles ?? new string[0];
        }
    }
}
//MdEnd
