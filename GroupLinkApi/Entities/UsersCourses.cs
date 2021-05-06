using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities
{
    public class UsersCourses
    {
        [Key, JsonIgnore]
        public int idUserCourse { get; set; }
        public int idCourse { get; set; }
        [ForeignKey(nameof(idCourse)), JsonIgnore]
        public virtual Courses Courses { get; set; }
        public int idUser { get; set; }
        [ForeignKey(nameof(idUser)), JsonIgnore]
        public virtual Users Users { get; set; }
    }
}
