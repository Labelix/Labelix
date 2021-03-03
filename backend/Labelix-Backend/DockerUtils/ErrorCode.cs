using System;
using System.Collections.Generic;
using System.Text;

namespace DockerAccess
{
    public enum ErrorCodes
    {
        Success = 0,
        DockerRunFailed = 125,
        ContainedCommandNotInvoked = 126,
        ContainedCommandNotFound = 127,
        FatalError = 128,
        TerminatedByCTRLC = 130,
        SIGKILL = 137,
        SIGTERM = 143
    }
}
