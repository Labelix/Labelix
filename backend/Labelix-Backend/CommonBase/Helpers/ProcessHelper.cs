using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace CommonBase.Helpers
{
    public static partial class ProcessHelper
    {
        public static Task<int> RunProcessAsync(string fileName, string arguments, bool noWindow = true, bool shellExecute = false)
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

            return RunProcessAsync(process, noWindow, shellExecute);
        }

        public static int RunProcess(string fileName, string arguments, bool noWindow = true, bool shellExecute = false)
        {
            return RunProcessAsync(fileName, arguments, noWindow, shellExecute).Result;
        }

        public static Task<int> RunProcessAsync(Process process, bool noWindow = true, bool shellExecute = false)
        {
            var tcs = new TaskCompletionSource<int>();

            process.EnableRaisingEvents = true;
            process.Exited += (sender, args) =>
            {
                tcs.SetResult(process.ExitCode);
                process.Dispose();
            };

            return tcs.Task;
        }

        public static int RunProcess(Process process, string arguments, bool noWindow = true, bool shellExecute = false)
        {
            return RunProcessAsync(process, noWindow, shellExecute).Result;
        }
    }
}
