using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.IO;

namespace CommonBase.Extensions
{
    public static partial class ImageExtensions
    {
        public static byte[] Base64ToByte(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);

            return imageBytes;
        }
        public static string ImageToBase64(Image image, System.Drawing.Imaging.ImageFormat format)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to base 64 string
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
        }
    }
}
