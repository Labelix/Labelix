using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
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
        public static Task<(int, StreamReader, StreamReader)> RunProcessAsync(this Process process) {
            return RunProcessAsync(process);
        }

        /// <summary>
        /// Extension method to run a process.
        /// </summary>
        /// <param name="process">This Process.</param>
        /// <returns>The processes exit code.</returns>
        public static (int, StreamReader, StreamReader) RunProcess(this Process process)
        {
            return RunProcess(process);
        }
    }
}
