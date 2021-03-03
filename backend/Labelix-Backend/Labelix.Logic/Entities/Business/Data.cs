using System;
using System.Collections.Generic;
using System.Text;
using Labelix.Contracts.Persistence;

namespace Labelix.Logic.Entities.Business
{
    class Data : IData
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Format { get; set; }
        public string Base64 { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
    }
}
