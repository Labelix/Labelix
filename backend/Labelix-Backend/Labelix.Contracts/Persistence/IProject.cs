using System;
using System.Collections.Generic;

namespace Labelix.Contracts.Persistence
{
    public interface IProject : IIdentifiable, ICopyable<IProject>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public bool FinishedAnnotation { get; set; }
        public string LabeledPath { get; set; }
    }
}
