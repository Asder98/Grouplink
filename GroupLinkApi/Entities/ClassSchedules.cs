using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class ClassSchedules
    {
        [Key]
        public int idClassSchedule { get; set; }
        [MaxLength(20)]
        public string dayOfTheWeek { get; set; }
        [MaxLength(10)]
        public string startTime { get; set; }
        [MaxLength(10)]
        public string endTime { get; set; }
        [MaxLength(5)]
        public string type { get; set; }
    }
}
