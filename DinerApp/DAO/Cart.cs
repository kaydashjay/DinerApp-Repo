//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAO
{
    using System;
    using System.Collections.Generic;
    
    public partial class Cart
    {
        public int cart_id { get; set; }
        public int menu_id { get; set; }
        public int quantity { get; set; }
    
        public virtual Menu Menu { get; set; }
    }
}
