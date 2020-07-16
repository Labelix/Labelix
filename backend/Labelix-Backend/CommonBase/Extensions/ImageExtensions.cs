using System;

namespace CommonBase.Extensions
{
    public static partial class ImageExtensions
    {
        public static byte[] Base64ToByte(this string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);

            return imageBytes;
        }
        public static string ImageToBase64(this byte[] imageBytes)
        {
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }
    }
}
