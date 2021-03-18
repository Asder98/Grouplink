using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Users
    {
        [Key]
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
    }
}
