using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dtos
{
    public class RegisterModel
    {
        [Required, MaxLength(30)]
        public string login { get; set; }

        [Required, MaxLength(20)]
        public string password { get; set; }

        [Required, MaxLength(20)]
        public string ConfirmPassword { get; set; }        
    }
}




