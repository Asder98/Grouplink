using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class UsersCourses
    {
        [Key]
        public int idUserCourse { get; set; }
        public int idCourse { get; set; }
        public int idUser { get; set; }
    }
}
