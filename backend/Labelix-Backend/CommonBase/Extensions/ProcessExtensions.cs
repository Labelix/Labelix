using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;

namespace CommonBase.Extensions
{
    public static partial class ProcessExtensions
    {
        /// <summary>
        /// Extension method to run a process asyncronously.
        /// </summary>
        /// <param name="process">This Process.</param>
        /// <returns>The processes exit code.</returns>
        public static Task<int> RunProcessAsync(this Process process) {
            return RunProcessAsync(process);
        }

        /// <summary>
        /// Extension method to run a process.
        /// </summary>
        /// <param name="process">This Process.</param>
        /// <param name="noWindow">Defines whether the application should be started in windowed mode.</param>
        /// <param name="shellExecute">Defines whether the application is run by the systems shell or the process is started directly.</param>
        /// <returns>The processes exit code.</returns>
        public static int RunProcess(this Process process)
        {
            return RunProcess(process);
        }
    }
}
