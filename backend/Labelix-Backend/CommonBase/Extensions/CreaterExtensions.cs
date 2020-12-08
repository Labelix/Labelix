//@QnSCodeCopy
//MdStart
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CommonBase.Extensions
{
    public static partial class CreaterExtensions
    {
        private static Dictionary<Type, Dictionary<string, PropertyInfo>> MappingInfos { get; } = new Dictionary<Type, Dictionary<string, PropertyInfo>>();

        public static T CreateObject<T>(this string[] source, string[] header) where T : class, new()
        {
            return source.CreateObject<T>(header, null);
        }
        public static T CreateObject<T>(this string[] source, string[] header, Func<PropertyInfo, bool> canMap) where T : class, new()
        {
            source.CheckArgument(nameof(source));
            header.CheckArgument(nameof(header));

            T result = new T();
            Dictionary<string, PropertyInfo> mapInfos;

            if (MappingInfos.TryGetValue(typeof(T), out mapInfos) == false)
            {
                mapInfos = new Dictionary<string, PropertyInfo>();

                foreach (var pi in typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance))
                {
                    if (header.Contains(pi.Name))
                    {
                        mapInfos.Add(pi.Name, pi);
                    }
                }
                MappingInfos.Add(typeof(T), mapInfos);
            }
            for (int i = 0; i < header.Length; i++)
            {
                PropertyInfo pi;
                string field = header[i];

                if (mapInfos.TryGetValue(field, out pi)
                    && pi.CanWrite
                    && (canMap == null || canMap(pi)))
                {
                    if (i < source.Length)
                    {
                        string strValue = source[i];

                        if (strValue.Equals("NULL", StringComparison.CurrentCultureIgnoreCase))
                        {
                            pi.SetValue(result, null);
                        }
                        else
                        {
                            Object objValue = Convert.ChangeType(strValue, pi.PropertyType);

                            pi.SetValue(result, objValue);
                        }
                    }
                }
            }
            return result;
        }
    }
}
//MdEnd
