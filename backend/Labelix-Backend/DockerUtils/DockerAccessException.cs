using System;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.Extensions.Primitives;

namespace DockerAccess
{
    public class DockerAccessException:  Exception
    {
        private readonly StringBuilder sb;

        public DockerAccessException(int errorCode, StreamReader stderr, Exception inner = null)
            :base("", inner) 
        {
            sb = new StringBuilder();
            sb.Append(Enum.IsDefined(typeof(ErrorCodes), errorCode)
                ? $"DockerError[{errorCode} {(ErrorCodes) errorCode}]: "
                : $"ProcessError[{errorCode}]: ");
            sb.Append(stderr.ReadToEnd());
        }
        
        public override string Message => sb.ToString();
    }
}