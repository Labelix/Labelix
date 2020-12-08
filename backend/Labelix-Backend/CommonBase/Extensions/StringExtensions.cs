//@QnSCodeCopy
//MdStart
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace CommonBase.Extensions
{
    public static partial class StringExtensions
    {
        public static void CheckArgument(this string source, string name)
        {
            if (string.IsNullOrEmpty(source))
                throw new ArgumentException("String is null or empty!", name);
        }

        public static IEnumerable<string[]> Split(this IEnumerable<string> source, string separator)
        {
            source.CheckArgument(nameof(source));

            return source.Select(l => string.IsNullOrEmpty(l) ? new string[0] : l.Split(separator));
        }
        public static IEnumerable<T> SplitAndMap<T>(this IEnumerable<string> source, string separator, Func<string[], T> mapper)
        {
            source.CheckArgument(nameof(source));
            mapper.CheckArgument(nameof(mapper));

            return source.Split(separator).Select(d => mapper(d));
        }
        public static IEnumerable<T> SplitAndMap<T>(this IEnumerable<string> source, string separator, Func<string[], string[], T> mapper)
        {
            source.CheckArgument(nameof(source));
            mapper.CheckArgument(nameof(mapper));

            var splitSource = source.Split(separator);
            var header = splitSource.FirstOrDefault();

            return splitSource.Skip(1).Select(d => mapper(d, header));
        }

        public static string Separator { get; set; } = ";";
        public static string NullText { get; set; } = "<NULL>";
        private static Regex Trimmer { get; } = new Regex(@"\s\s+");

        internal class TagHeader
        {
            public TagHeader(string source)
            {
                source.CheckArgument(nameof(source));

                Source = source;
            }
            public string Source { get; }
        }
        public class TagInfo
        {
            internal TagHeader Header { get; set; }

            public string Source => Header.Source;
            public string StartTag { get; internal set; }
            public int StartTagIndex { get; internal set; }
            public string EndTag { get; internal set; }
            public int EndTagIndex { get; internal set; }

            public string GetStartTagValue(string endLabel)
            {
                string result = string.Empty;
                int? endPos = Source?.IndexOf(endLabel, StartTagIndex);

                if (endPos > 0)
                {
                    result = Source?.Partialstring(StartTagIndex + StartTag.Length, endPos.GetValueOrDefault() - 1);
                }
                return result;
            }
            public string GetFullStartTag(string endLabel)
            {
                endLabel.CheckArgument(nameof(endLabel));

                string result = StartTag;
                int? endPos = Source?.IndexOf(endLabel, StartTagIndex);

                if (endPos > 0)
                {
                    result = Source?.Partialstring(StartTagIndex, endPos.GetValueOrDefault() + endLabel.Length - 1);
                }
                return result;
            }
            public string GetFullEndTag(string endLabel)
            {
                endLabel.CheckArgument(nameof(endLabel));

                string result = EndTag;
                int? endPos = Source?.IndexOf(endLabel, EndTagIndex + 1);

                if (endPos > 0)
                {
                    result = Source?.Partialstring(EndTagIndex, endPos.GetValueOrDefault());
                }
                return result;
            }

            public string GetFullText()
            {
                return Source?.Partialstring(StartTagIndex, EndTagIndex + EndTag.Length);
            }
            public string GetFullText(string endTagEndLabel)
            {
                string fullEndTag = GetFullEndTag(endTagEndLabel);

                return Source?.Partialstring(StartTagIndex, EndTagIndex + fullEndTag.Length);
            }

            public string GetInnerText()
            {
                return Source?.Partialstring(StartTagIndex + StartTag.Length, EndTagIndex - 1);
            }
            public string GetInnerText(string startTagEndLabel)
            {
                string fullStartTag = GetFullStartTag(startTagEndLabel);

                return Source?.Partialstring(StartTagIndex + fullStartTag.Length, EndTagIndex - 1);
            }
        }

        public class DivideInfo : TagInfo
        {
            public DivideInfo(int startIdx, int endIdx)
            {
                StartTag = string.Empty;
                StartTagIndex = startIdx;
                EndTag = string.Empty;
                EndTagIndex = endIdx;
            }

            public DivideInfo(TagInfo tagInfo)
            {
                tagInfo.CheckArgument(nameof(tagInfo));

                StartTag = tagInfo.StartTag;
                StartTagIndex = tagInfo.StartTagIndex;
                EndTag = tagInfo.EndTag;
                EndTagIndex = tagInfo.EndTagIndex;
            }
            public string Text { get; internal set; }
        }

        public static IEnumerable<DivideInfo> Divide(this string text, string[] tags)
        {
            List<DivideInfo> result = new List<DivideInfo>();
            int startIdx = 0;
            var tagInfos = text.GetAllTags(tags);

            foreach (var tagInfo in tagInfos)
            {
                if (startIdx < tagInfo.StartTagIndex)
                {
                    result.Add(new DivideInfo(startIdx, tagInfo.StartTagIndex - 1)
                    {
                        Text = text.Partialstring(startIdx, tagInfo.StartTagIndex - 1),
                    });
                    result.Add(new DivideInfo(tagInfo)
                    {
                        Text = text.Partialstring(tagInfo.StartTagIndex, tagInfo.EndTagIndex),
                    });
                    startIdx = tagInfo.EndTagIndex + 1;
                }
                else if (startIdx == tagInfo.StartTagIndex)
                {
                    result.Add(new DivideInfo(tagInfo)
                    {
                        Text = text.Partialstring(tagInfo.StartTagIndex, tagInfo.EndTagIndex),
                    });
                    startIdx = tagInfo.EndTagIndex + 1;
                }
            }
            if (startIdx < text.Length - 1)
            {
                result.Add(new DivideInfo(startIdx, text.Length)
                {
                    Text = text.Partialstring(startIdx, text.Length - 1),
                });
            }
            return result;
        }

        public static IEnumerable<TagInfo> GetAllTags(this string text, string[] tags)
        {
            tags.CheckArgument(nameof(tags));

            List<TagInfo> result = new List<TagInfo>();

            for (int i = 0; i + 1 < tags.Length; i += 2)
            {
                result.AddRange(text.GetAllTags(tags[i], tags[i + 1]));
            }
            return result;
        }
        public static IEnumerable<TagInfo> GetAllTags(this string text, string startTag, string endTag)
        {
            return text.GetAllTags<TagInfo>(startTag, endTag);
        }
        public static IEnumerable<TagInfo> GetAllTags(this string text, string startTag, string endTag, params char[] excludeBlocks)
        {
            return text.GetAllTags<TagInfo>(startTag, endTag, excludeBlocks);
        }
        public static IEnumerable<T> GetAllTags<T>(this string text, string startTag, string endTag, params char[] excludeBlocks)
            where T : TagInfo, new()
        {
            text.CheckArgument(nameof(text));

            var parseIndex = 0;
            int startTagIndex;
            int endTagIndex;
            var result = new List<T>();
            var tagHeader = new TagHeader(text);

            do
            {
                startTagIndex = text.IndexOf(startTag, parseIndex, StringComparison.CurrentCultureIgnoreCase);
                var startTagEndIndex = startTagIndex > -1 ? startTagIndex + startTag.Length : parseIndex;
                endTagIndex = startTagEndIndex >= 0 ? text.IndexOf(endTag, startTagEndIndex, StringComparison.CurrentCultureIgnoreCase) : -1;

                if (startTagIndex > -1 && endTagIndex > startTagIndex)
                {
                    int idx = startTagEndIndex;
                    int endTagSearchPosAt = startTagEndIndex;
                    var blockCounter = new int[excludeBlocks.Length];

                    while (idx < endTagIndex)
                    {
                        for (int j = 0; j < blockCounter.Length; j++)
                        {
                            if (text[idx] == excludeBlocks[j])
                            {
                                endTagSearchPosAt = idx;
                                blockCounter[j] += j % 2 == 0 ? 1 : -1;
                            }
                        }
                        idx++;
                    }
                    while (idx < text.Length && blockCounter.Sum() != 0)
                    {
                        for (int j = 0; j < blockCounter.Length; j++)
                        {
                            if (text[idx] == excludeBlocks[j])
                            {
                                endTagSearchPosAt = idx;
                                blockCounter[j] += j % 2 == 0 ? 1 : -1;
                            }
                        }
                        idx++;
                    }
                    if (endTagSearchPosAt > endTagIndex && blockCounter.Sum() == 0)
                    {
                        endTagIndex = text.IndexOf(endTag, endTagSearchPosAt, StringComparison.CurrentCultureIgnoreCase);
                    }
                }

                if (startTagIndex > -1 && endTagIndex > startTagIndex)
                {
                    result.Add(new T
                    {
                        Header = tagHeader,
                        StartTag = startTag,
                        StartTagIndex = startTagIndex,
                        EndTag = endTag,
                        EndTagIndex = endTagIndex,
                    });
                    parseIndex = startTagEndIndex;
                }
            } while (startTagIndex > -1 && endTagIndex > -1);
            return result;
        }

        /// <summary>
        /// Indicates whether the specified string is null or an Empty string.
        /// </summary>
        /// <param name="text">The string to test.</param>
        /// <returns>true if the value parameter is null or an empty string (""); otherwise, false.</returns>
        public static bool IsNullOrEmpty(this string text)
        {
            return string.IsNullOrEmpty(text);
        }

        /// <summary>
        /// Indicates whether the specified string has a content.
        /// </summary>
        /// <param name="source">The string to test.</param>
        /// <returns>true if the value parameter is not null and not empty; otherwise, false.</returns>
        public static bool HasContent(this string source)
        {
            return !string.IsNullOrEmpty(source);
        }

        /// <summary>
        /// Determines if two string objects have unequal values.
        /// </summary>
        /// <param name="source">The string to compare to the value.</param>
        /// <param name="value">The string to compare to the source.</param>
        /// <returns></returns>
        public static bool NotEquals(this string source, string value)
        {
            return source?.Equals(value) == false;
        }

        /// <summary>
        /// Indicates whether a specified string is null, empty, or consists only of white-space characters.
        /// </summary>
        /// <param name="text">The string to test.</param>
        /// <returns>true if the value parameter is null or String.Empty, or if value consists exclusively of white-space characters.</returns>
        public static bool IsNullOrWhiteSpace(this string text)
        {
            return string.IsNullOrWhiteSpace(text);
        }

        /// <summary>
        /// Gets the value of the current object or the default value of the parameter.
        /// </summary>
        /// <param name="text">The current objet.</param>
        /// <param name="defaultValue">The default value if the object is null or empty.</param>
        /// <returns>The value of the current object, or the parameter default value.</returns>
        public static string GetValueOrDefault(this string text, string defaultValue)
        {
            return string.IsNullOrEmpty(text) ? defaultValue : text;
        }

        /// <summary>
        /// Diese Methode entfernt alle redundanten Leerzeichen aus dem Text.
        /// </summary>
        /// <param name="text">Text aus welchem die redundanten Leerzeichen entfernt werden sollen.</param>
        /// <returns>Text ohne redundante Leerzeichen.</returns>
        public static string Fulltrim(this string text)
        {
            text.CheckArgument(nameof(text));

            if (String.IsNullOrEmpty(text) == false)
            {
                text = Trimmer.Replace(text, " ");
                text = text.Trim();
                if (text.Equals(" "))
                {
                    text = String.Empty;
                }
            }
            return text;
        }

        /// <summary>
        /// Diese Methode fuegt einem Text n Einzuege hinzu.
        /// </summary>
        /// <param name="text">Text, dem die Einzuege hinzugefuegt werden.</param>
        /// <param name="count">Anzahl der Einzuege die dem Text hinzugefuegt werden.</param>
        /// <returns>Text mit Anzahl von Einzuegen.</returns>
        public static string SetIndent(this string text, int count)
        {
            StringBuilder sb = new StringBuilder();

            if (text != null)
            {
                for (int i = 0; i < count; i++)
                    sb.Append('\t');
            }
            sb.Append(text);
            return sb.ToString();
        }

        /// <summary>
        /// This method adds n indents to a string array.
        /// </summary>
        /// <param name="lines">String array to which the indents are added.</param>
        /// <param name="count">Number of indents that are added to the string array.</param>
        /// <returns>String array with number of indents.</returns>
        public static string[] SetIndent(this string[] lines, int count)
        {
            lines.CheckArgument(nameof(lines));

            if (lines != null)
            {
                for (int i = 0; i < lines.Length; i++)
                {
                    lines[i] = lines[i].SetIndent(count);
                }
            }
            return lines;
        }
        /// <summary>
        /// This method adds n indents to a string array.
        /// </summary>
        /// <param name="lines">String array to which the indents are added.</param>
        /// <param name="count">Number of indents that are added to the string array.</param>
        /// <returns>String array with number of indents.</returns>
        public static IEnumerable<string> SetIndent(this IEnumerable<string> lines, int count)
        {
            lines.CheckArgument(nameof(lines));

            return lines.ToArray().SetIndent(count);
        }

        /// <summary>
        /// This method converts a string array to a coherent text.
        /// </summary>
        /// <param name="lines">The String-Array.</param>
        /// <returns>The compound text.</returns>
        public static string ToText(this IEnumerable<string> lines)
        {
            if (lines == null)
                throw new ArgumentNullException(nameof(lines));

            StringBuilder sb = new StringBuilder();

            foreach (var line in lines)
            {
                sb.AppendLine(line);
            }
            return sb.ToString();
        }

        /// <summary>
        /// This method converts a string array to a coherent text.
        /// </summary>
        /// <param name="lines">The String-Array.</param>
        /// <param name="lineConvert">Lines converter.</param>
        /// <returns>The compound text.</returns>
        public static string ToText(this IEnumerable<string> lines, Func<string, string> lineConvert)
        {
            if (lines == null)
                throw new ArgumentNullException(nameof(lines));

            StringBuilder sb = new StringBuilder();

            foreach (var line in lines)
            {
                sb.AppendLine(lineConvert == null ? line : lineConvert(line));
            }
            return sb.ToString();
        }

        /// <summary>
        /// This method converts text with line breaks into a string array.
        /// </summary>
        /// <param name="text">The text to be converted.</param>
        /// <returns>The string-array from the text.</returns>
        public static IEnumerable<string> ToLines(this string text)
        {
            if (text == null)
                throw new ArgumentNullException(nameof(text));

            List<string> result = new List<string>();

            foreach (var line in text.Split(new string[] { Environment.NewLine }, StringSplitOptions.None))
            {
                result.Add(line);
            }
            return result;
        }

        /// <summary>
        /// Extracts a substring from a string.
        /// </summary>
        /// <param name="text">The text.</param>
        /// <param name="from">Startposition</param>
        /// <param name="to">Endposition</param>
        /// <returns>The substring.</returns>
        public static string Partialstring(this string text, int from, int to)
        {
            StringBuilder sb = new StringBuilder();

            if (string.IsNullOrEmpty(text) == false)
            {
                for (int i = from; i >= 0 && i <= to && i < text.Length; i++)
                {
                    sb.Append(text[i]);
                }
            }
            return sb.ToString();
        }

        /// <summary>
        /// Removes the text from the start tag to the end tag.
        /// </summary>
        /// <param name="text">The text from which the partial text should be removed.</param>
        /// <param name="startTag">Startposition</param>
        /// <param name="endTag">Endposition</param>
        /// <returns>The text with the missing partial text.</returns>
        public static string Remove(this string text, string startTag, string endTag)
        {
            text.CheckArgument(nameof(text));
            startTag.CheckArgument(nameof(startTag));
            endTag.CheckArgument(nameof(endTag));

            StringBuilder result = new StringBuilder();
            int parseIndex = 0;
            int startTagIndex;
            int endTagIndex;

            do
            {
                startTagIndex = text.IndexOf(startTag, parseIndex, StringComparison.CurrentCultureIgnoreCase);
                var startTagEndIndex = startTagIndex > -1 ? startTagIndex + startTag.Length : parseIndex;
                endTagIndex = startTagEndIndex >= 0 ? text.IndexOf(endTag, startTagEndIndex, StringComparison.CurrentCultureIgnoreCase) : -1;
                var endTagEndIndex = endTagIndex > -1 ? endTagIndex + endTag.Length : parseIndex;

                if (startTagIndex > -1 && endTagIndex > startTagIndex)
                {
                    result.Append(text[parseIndex..startTagIndex]);
                    parseIndex = endTagEndIndex;
                }
            } while (startTagIndex > -1 && endTagIndex > -1);

            if (parseIndex < text.Length)
            {
                result.Append(text[parseIndex..]);
            }
            return result.ToString();
        }

        public static string ReplaceUmlauts(this string text)
        {
            StringBuilder sb = new StringBuilder();

            if (text != null)
            {
                foreach (var item in text)
                {
                    if (item == 223) // sz is replaced by ss
                    {
                        sb.Append("ss");
                    }
                    else if (item == 196)
                    {
                        sb.Append("Ae");
                    }
                    else if (item == 228)
                    {
                        sb.Append("ae");
                    }
                    else if (item == 214)
                    {
                        sb.Append("Oe");
                    }
                    else if (item == 246)
                    {
                        sb.Append("oe");
                    }
                    else if (item == 220)
                    {
                        sb.Append("Ue");
                    }
                    else if (item == 252)
                    {
                        sb.Append("ue");
                    }
                    else
                    {
                        sb.Append(item);
                    }
                }
            }
            return sb.ToString();
        }
        public static string ReplaceAll(this string text, TagInfo tagInfo, Func<string, string> replace)
        {
            text.CheckArgument(nameof(text));
            tagInfo.CheckArgument(nameof(tagInfo));

            StringBuilder result = new StringBuilder();
            int parseIndex = 0;
            int startTagIndex;
            int endTagIndex;

            do
            {
                startTagIndex = text.IndexOf(tagInfo.StartTag, parseIndex, StringComparison.CurrentCultureIgnoreCase);
                int startTagEndIndex = startTagIndex > -1 ? startTagIndex + tagInfo.StartTag.Length : parseIndex;
                endTagIndex = startTagEndIndex >= 0 ? text.IndexOf(tagInfo.EndTag, startTagEndIndex, StringComparison.CurrentCultureIgnoreCase) : -1;
                int endTagEndIndex = endTagIndex > -1 ? endTagIndex + tagInfo.EndTag.Length : parseIndex;

                if (startTagIndex > -1 && endTagIndex > startTagIndex)
                {
                    string substr = text.Substring(startTagIndex, endTagIndex - startTagIndex + tagInfo.EndTag.Length);

                    result.Append(text[parseIndex..startTagIndex]);
                    if (replace != null)
                    {
                        result.Append(replace(substr));
                    }
                    parseIndex = endTagEndIndex;
                }
            } while (startTagIndex > -1 && endTagIndex > -1);

            if (parseIndex < text.Length)
            {
                result.Append(text[parseIndex..]);
            }
            return result.ToString();
        }
        public static string ReplaceAll(this string text, string startTag, string endTag, string replaceText)
        {
            text.CheckArgument(nameof(text));

            return text.ReplaceAll(startTag, endTag, s => replaceText);
        }
        public static string ReplaceAll(this string text, string startTag, string endTag, Func<string, string> replace)
        {
            text.CheckArgument(nameof(text));
            startTag.CheckArgument(nameof(startTag));
            endTag.CheckArgument(nameof(endTag));

            int parseIndex = 0;
            int startTagIndex;
            int endTagIndex;
            StringBuilder result = new StringBuilder();

            do
            {
                startTagIndex = text.IndexOf(startTag, parseIndex, StringComparison.CurrentCultureIgnoreCase);
                int startTagEndIndex = startTagIndex > -1 ? startTagIndex + startTag.Length : parseIndex;
                endTagIndex = startTagEndIndex >= 0 ? text.IndexOf(endTag, startTagEndIndex, StringComparison.CurrentCultureIgnoreCase) : -1;
                int endTagEndIndex = endTagIndex > -1 ? endTagIndex + endTag.Length : parseIndex;

                if (startTagIndex > -1 && endTagIndex > startTagIndex)
                {
                    string substr = text.Substring(startTagIndex, endTagIndex - startTagIndex + endTag.Length);

                    result.Append(text[parseIndex..startTagIndex]);
                    if (replace != null)
                    {
                        result.Append(replace(substr));
                    }
                    parseIndex = endTagEndIndex;
                }
            } while (startTagIndex > -1 && endTagIndex > -1);

            if (parseIndex < text.Length)
            {
                result.Append(text[parseIndex..]);
            }
            return result.ToString();
        }

        public static int ToInt(this string text)
        {
            int result = 0;

            if (text != null)
            {
                foreach (var item in text)
                {
                    if (char.IsDigit(item))
                    {
                        result *= 10;
                        result = result + item - '0';
                    }
                }
            }
            return result;
        }
        public static long ToLong(this string text)
        {
            long result = 0;

            if (text != null)
            {
                foreach (var item in text)
                {
                    if (char.IsDigit(item))
                    {
                        result *= 10;
                        result = result + item - '0';
                    }
                }
            }
            return result;
        }
        public static string ToFileName(this string text)
        {
            if (text != null)
            {
                foreach (char c in Path.GetInvalidFileNameChars())
                {
                    text = text.Replace(c, '_');
                }
            }
            return text;
        }

        public static IEnumerable<T> ToEnumerable<T>(this string source, string separator)
        {
            List<T> result = new List<T>();

            if (string.IsNullOrEmpty(source) == false)
            {
                string[] items = source.Split(separator);

                foreach (var item in items)
                {
                    if (item.Equals(NullText))
                    {
                        result.Add(default);
                    }
                    else
                    {
                        try
                        {
                            result.Add((T)Convert.ChangeType(item, typeof(T)));
                        }
                        catch (Exception e)
                        {
                            System.Diagnostics.Debug.WriteLine(e.Message);
                            result.Add(default);
                        }
                    }
                }
            }
            return result;
        }

        public static byte[] ConvertToByteArray(this string source)
        {
            byte[] result = null;

            if (source != null)
            {
                ASCIIEncoding enc = new ASCIIEncoding();
                result = enc.GetBytes(source);
            }
            return result;
        }

        public static string Encrypt(this string text, string keyString)
        {
            var key = Encoding.UTF8.GetBytes(keyString);

            using var aesAlg = Aes.Create();
            using var encryptor = aesAlg.CreateEncryptor(key, aesAlg.IV);
            using var msEncrypt = new MemoryStream();
            using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
            using (var swEncrypt = new StreamWriter(csEncrypt))
            {
                swEncrypt.Write(text);
            }

            var iv = aesAlg.IV;

            var decryptedContent = msEncrypt.ToArray();

            var result = new byte[iv.Length + decryptedContent.Length];

            Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
            Buffer.BlockCopy(decryptedContent, 0, result, iv.Length, decryptedContent.Length);

            return Convert.ToBase64String(result);
        }
        public static string Decrypt(this string cipherText, string keyString)
        {
            var fullCipher = Convert.FromBase64String(cipherText);

            var iv = new byte[16];
            var cipher = new byte[16];

            Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, iv.Length);
            var key = Encoding.UTF8.GetBytes(keyString);

            string result;
            using var aesAlg = Aes.Create();
            using var decryptor = aesAlg.CreateDecryptor(key, iv);
            using (MemoryStream msDecrypt = new MemoryStream(cipher))
            {
                using var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
                using var srDecrypt = new StreamReader(csDecrypt);
                result = srDecrypt.ReadToEnd();
            }

            return result;
        }
    }
}
//MdEnd
