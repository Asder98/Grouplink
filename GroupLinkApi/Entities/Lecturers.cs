using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Lecturers
    {
        [Key, JsonIgnore]
        public int idLecturer { get; set; }
        [MaxLength(20)]
        public string name { get; set; }
        [MaxLength(20)]
        public string surname { get; set; }
        [MaxLength(50)]
        public string email { get; set; }


        [NotMapped, JsonIgnore]
        public virtual List<Courses> Courses { get; set; }
    }
}
