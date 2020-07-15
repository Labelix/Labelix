using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CommonBase.Helpers
{
    public static partial class ProcessHelper
    {
        /// <summary>
        /// Runs a process asyncronously.
        /// </summary>
        /// <param name="fileName">The name of the application to start.</param>
        /// <param name="arguments">CLI arguments to be appended when application starts.</param>
        /// <param name="noWindow">Defines whether the application should be started in windowed mode.</param>
        /// <param name="shellExecute">Defines whether the application is run by the systems shell or the process is started directly.</param>
        /// <returns>The processes exit code.</returns>
        public static async Task<(int, StreamReader, StreamReader)> RunProcessAsync(string fileName, string arguments, bool noWindow = true, bool shellExecute = false)
        {
            using var process = new Process
            {
                StartInfo = {
                    FileName = fileName,
                    Arguments = arguments,
                    CreateNoWindow = noWindow,
                    UseShellExecute = shellExecute
                }
            };

            return await RunProcessAsync(process);
        }

        /// <summary>
        /// Runs a process.
        /// </summary>
        /// <param name="fileName">The name of the application to start.</param>
        /// <param name="arguments">CLI arguments to be appended when application starts.</param>
        /// <param name="noWindow">Defines whether the application should be started in windowed mode.</param>
        /// <param name="shellExecute">Defines whether the application is run by the systems shell or the process is started directly.</param>
        /// <returns>The processes exit code.</returns>
        public static (int, StreamReader, StreamReader) RunProcess(string fileName, string arguments, bool noWindow = true, bool shellExecute = false)
        {
            return RunProcessAsync(fileName, arguments, noWindow, shellExecute).Result;
        }

        /// <summary>
        /// Runs a process asyncronously.
        /// </summary>
        /// <param name="process">The process which will be started.</param>
        /// <returns>The processes exit code.</returns>
        public static Task<(int, StreamReader, StreamReader)> RunProcessAsync(Process process)
        {
            var tcs = new TaskCompletionSource<(int, StreamReader, StreamReader)>();

            process.EnableRaisingEvents = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;

            process.Exited += (sender, args) =>
            {
                tcs.SetResult((process.ExitCode, process.StandardOutput, process.StandardError));
                process.Dispose();
            };

            process.OutputDataReceived += (sender, args) => process.BeginOutputReadLine();
            process.ErrorDataReceived += (sender, args) => process.BeginErrorReadLine();

            process.Start();
            return tcs.Task;
        }

        /// <summary>
        /// Runs a process.
        /// </summary>
        /// <param name="process">The process which will be started.</param>
        /// <param name="noWindow">Defines whether the application should be started in windowed mode.</param>
        /// <param name="shellExecute">Defines whether the application is run by the systems shell or the process is started directly.</param>
        /// <returns>The processes exit code.</returns>
        public static (int, StreamReader, StreamReader) RunProcess(Process process)
        {
            return RunProcessAsync(process).Result;
        }
    }
}
