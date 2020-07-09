//@QnSCodeCopy
//MdStart
using CommonBase.Extensions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;

namespace CommonBase.Helpers
{
    public static partial class FileHelper
    {
        internal static string Separator = ";";

        public static string GetCsvFileName(Type type)
        {
            if (type == null)
                throw new ArgumentNullException(nameof(type));

            return $"{type.Name}.csv";
        }
        public static string GetCsvFilePath(string csvFolderName, Type type)
        {
            return Path.Combine(AppContext.BaseDirectory, csvFolderName, GetCsvFileName(type));
        }

        public static IEnumerable<T> ReadFromCsv<T>(string filePath) where T : class, new()
        {
            List<T> result = new List<T>();

            result.AddRange(File.ReadAllLines(filePath, Encoding.UTF8)
                .SplitAndMap<T>(Separator, (d, h) =>
                {
                    return d.CreateObject<T>(h);
                }));

            return result;
        }
        public static void WriteToCsv<T>(string filePath, IEnumerable<T> source)
        {
            if (source == null)
                throw new ArgumentNullException(nameof(source));

            List<string> lines = new List<string>();
            List<PropertyInfo> propInfos = new List<PropertyInfo>();
            StringBuilder sb = new StringBuilder();

            foreach (var item in typeof(T).GetProperties(BindingFlags.Instance | BindingFlags.Public)
                                          .Where(i => i.CanRead))
            {
                if (sb.Length > 0)
                {
                    sb.Append(Separator);
                }
                sb.Append(item.Name);
                propInfos.Add(item);
            }
            lines.Add(sb.ToString());

            foreach (var item in source)
            {
                sb.Clear();
                foreach (var pi in propInfos)
                {
                    if (sb.Length > 0)
                    {
                        sb.Append(Separator);
                    }
                    object value = pi.GetValue(item);

                    if (value == null)
                    {
                        sb.Append("NULL");
                    }
                    else
                    {
                        sb.Append(value.ToString());
                    }
                }
                lines.Add(sb.ToString());
            }
            File.WriteAllLines(filePath, lines.ToArray(), Encoding.UTF8);
        }

        public static string GetSerFileName(Type type)
        {
            if (type == null)
                throw new ArgumentNullException(nameof(type));

            return $"{type.Name}.ser";
        }
        public static string GetSerFilePath(string serFolderName, Type type)
        {
            string serFolder = Path.Combine(AppContext.BaseDirectory, serFolderName);

            if (Directory.Exists(serFolder) == false)
            {
                Directory.CreateDirectory(serFolder);
            }
            return Path.Combine(serFolder, GetSerFileName(type));
        }

        public static void Serialize(string filePath, IEnumerable<object> source)
        {
            if (source == null)
                throw new ArgumentNullException(nameof(source));

            using (Stream stream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                IFormatter formatter = new BinaryFormatter();

                formatter.Serialize(stream, source);
            }
        }

        public static IEnumerable<T> Deserialize<T>(string filePath) where T : class, new()
        {
            IEnumerable<T> result = null;

            if (File.Exists(filePath))
            {
                using (Stream stream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
                {
                    IFormatter formatter = new BinaryFormatter();

                    result = (IEnumerable<T>)formatter.Deserialize(stream);
                }
            }
            else
            {
                result = new T[0];
            }
            return result;
        }
    }
}
//MdEnd
