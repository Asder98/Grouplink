using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Users
    {
        [Key, JsonIgnore]
        public int idUser { get; set; }
        [MaxLength(20)]
        public string name { get; set; }
        [MaxLength(20)]
        public string surname { get; set; }
        [MaxLength(50)]
        public string email { get; set; }
        [MaxLength(20)]
        public string login { get; set; }
        [MaxLength(30)]
        public string password { get; set; }


        [NotMapped, JsonIgnore]
        public virtual List<UsersCourses> UsersCourses { get; set; }
    }
}
