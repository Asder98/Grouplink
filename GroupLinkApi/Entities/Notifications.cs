using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Notifications
    {
        [Key]
        public int idNotification { get; set; }
        public int idUser { get; set; }
        public int idCourse { get; set; }
        [MaxLength(40)]
        public string title { get; set; }
        [MaxLength(255)]
        public string content { get; set; }
        [MaxLength(20)]
        public string type { get; set; }
        public int amount { get; set; }
    }
}
