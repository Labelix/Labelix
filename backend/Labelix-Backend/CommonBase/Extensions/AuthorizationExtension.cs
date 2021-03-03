using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace CommonBase.Extensions
{
    public static class AuthorizationExtension
    {
        public static string GetUserId(this IEnumerable<Claim> claims)
        {
            return claims.First(i => i.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname").Value;
        }
    }
}
