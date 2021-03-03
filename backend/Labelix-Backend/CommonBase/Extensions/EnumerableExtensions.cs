//@QnSCodeCopy
//MdStart
using System;
using System.Collections.Generic;

namespace CommonBase.Extensions
{
    public static partial class EnumerableExtensions
    {
        public static IEnumerable<ST> ToEnumerable<T, ST>(this IEnumerable<T> source, Func<T, ST> expandSelector)
        {
            List<ST> expandResult = new List<ST>();

            if (source != null && expandSelector != null)
            {
                foreach (var item in source)
                {
                    var subItem = expandSelector(item);

                    if (subItem != null)
                    {
                        expandResult.Add(subItem);
                    }
                }
            }
            return expandResult;
        }
        public static IEnumerable<ST> FlattenEnumerable<T, ST>(this IEnumerable<T> source, Func<T, IEnumerable<ST>> expandSelector)
        {
            List<ST> expandResult = new List<ST>();

            if (source != null && expandSelector != null)
            {
                foreach (var item in source)
                {
                    var subItems = expandSelector(item);

                    if (subItems != null)
                    {
                        expandResult.AddRange(subItems);
                    }
                }
            }
            return expandResult;
        }

        public static IEnumerable<T> ForeachAction<T>(this IEnumerable<T> source, Action<T> action)
        {
            if (source != null && action != null)
            {
                foreach (var item in source)
                {
                    action(item);
                }
            }
            return source;
        }
        public static int NextValue<T>(this IEnumerable<T> source, Func<T, int> getValue)
        {
            int result = 0;

            if (source != null && getValue != null)
            {
                source.ForeachAction(i =>
                {
                    int value = getValue(i);

                    if (value > result)
                    {
                        result = value;
                    }
                });
            }
            return result + 1;
        }

        ///<summary>Finds the index of the first item matching an expression in an enumerable.</summary>
        ///<param name="items">The enumerable to search.</param>
        ///<param name="predicate">The expression to test the items against.</param>
        ///<returns>The index of the first matching item, or -1 if no items match.</returns>
        public static int FindIndex<T>(this IEnumerable<T> items, Func<T, bool> predicate)
        {
            items.CheckArgument(nameof(items));
            predicate.CheckArgument(nameof(predicate));

            int retVal = 0;

            foreach (var item in items)
            {
                if (predicate(item)) return retVal;
                retVal++;
            }
            return -1;
        }
        ///<summary>Finds the index of the first occurrence of an item in an enumerable.</summary>
        ///<param name="items">The enumerable to search.</param>
        ///<param name="item">The item to find.</param>
        ///<returns>The index of the first matching item, or -1 if the item was not found.</returns>
        public static int IndexOf<T>(this IEnumerable<T> items, T item)
        {
            return items.FindIndex(i => EqualityComparer<T>.Default.Equals(item, i));
        }

    }
}
//MdEnd
