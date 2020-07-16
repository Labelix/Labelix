using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Text;

namespace CommonBase.Helpers
{
    public static partial class PathHelper
    {

        /// <summary>
        /// Generates a random file while checking if the name is still free to use.
        /// </summary>
        /// <param name="path">Path to give context which names are already used.</param>
        /// <returns>path + random file name</returns>
        public static string GetRandomFileNameSecure(string path) {
            string dirName, fileName;
            do
            {
                dirName = Path.GetRandomFileName();
                fileName = Path.Combine(path, dirName);
            } while (Directory.Exists(fileName));

            return fileName;
        }
    }
}
