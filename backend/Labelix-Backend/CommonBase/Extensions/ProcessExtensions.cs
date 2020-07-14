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
        public static Task<(int, string)> RunProcessAsync(this Process process) {
            return RunProcessAsync(process);
        }

        /// <summary>
        /// Extension method to run a process.
        /// </summary>
        /// <param name="process">This Process.</param>
        /// <returns>The processes exit code.</returns>
        public static (int, string) RunProcess(this Process process)
        {
            return RunProcess(process);
        }
    }
}
