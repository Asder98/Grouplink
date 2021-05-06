using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities
{
    public class ClassSchedules
    {
        [Key, JsonIgnore]
        public int idClassSchedule { get; set; }
        [MaxLength(20)]
        public string dayOfTheWeek { get; set; }
        [MaxLength(10)]
        public string startTime { get; set; }
        [MaxLength(10)]
        public string endTime { get; set; }
        [MaxLength(5)]
        public string type { get; set; }


        [NotMapped, JsonIgnore]
        public virtual List<Courses> Courses { get; set; }
    }
}
