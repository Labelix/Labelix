using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

namespace CommonBase.Extensions
{
    // TODO Refactor naming
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
        
        public static byte[] ConvertBitmapToBitmask(this Bitmap bmp, byte threshold = 255)
        {
            BitmapData bitmapData = bmp.LockBits
            (
                new Rectangle(0, 0, bmp.Width, bmp.Height),
                ImageLockMode.ReadWrite,
                bmp.PixelFormat
            );
            
            int bytesPerPixel = Bitmap.GetPixelFormatSize(bmp.PixelFormat) / 8;
            int byteCount = bitmapData.Stride * bmp.Height;
            byte[] pixels = new byte[byteCount];

            IntPtr ptrFirstPixel = bitmapData.Scan0;
            Marshal.Copy(ptrFirstPixel, pixels, 0, pixels.Length);
            int heightInPixels = bitmapData.Height;
            int widthInBytes = bitmapData.Width * bytesPerPixel;

            BitArray arr = new BitArray(bmp.Width*bmp.Height);


            var (n, m) = (0, 0);

            for (int y = 0; y < heightInPixels; y++)
            {
                int currentLine = y * bitmapData.Stride;
                for (int x = 0; x < widthInBytes; x = x + bytesPerPixel)
                {
                    int oldBlue = pixels[currentLine + x];

                    arr[n * bmp.Width + m] = oldBlue >= threshold;

                    // calculate new pixel value
                    //pixels[currentLine + x] = (byte) (arr[n * bmp.Width + m] ? 255 : 0);

                    m++;
                }

                m = 0;
                n++;
            }
            
            Marshal.Copy(pixels, 0, ptrFirstPixel, pixels.Length);

            bmp.UnlockBits(bitmapData);
            
            // Save bitmap for debugging purposes
            // bmp.Save("bitmap.jpg", ImageFormat.Png);

            var bytes = new byte[(arr.Length + 7) / 8];
            arr.CopyTo(bytes, 0);
            return bytes;
        }
    }
}
