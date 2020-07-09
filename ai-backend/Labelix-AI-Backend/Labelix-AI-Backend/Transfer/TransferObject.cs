using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Labelix_AI_Backend.Transfer
{
    public class TransferObject : Contracts.IIdentifiable
    {
        public virtual int Id { get; set; }

        public byte[] Timestamp { get; set; }
    }
}
