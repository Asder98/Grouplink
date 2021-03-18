using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Lecturers
    {
        [Key]
        public int idLecturer { get; set; }
        [MaxLength(20)]
        public string name { get; set; }
        [MaxLength(20)]
        public string surname { get; set; }
        [MaxLength(50)]
        public string email { get; set; }
    }
}
