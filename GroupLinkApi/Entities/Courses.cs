using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Courses
    {
        [Key, JsonIgnore]
        public int idCourse { get; set; }
        [JsonIgnore]
        public int idLecturer { get; set; }

        [ForeignKey(nameof(idLecturer)), JsonIgnore]
        public virtual Lecturers Lecturers { get; set; }

        [MaxLength(50)]
        public string courseName { get; set; }
        [MaxLength(10)]
        public string groupCode { get; set; }
        [MaxLength(20)]
        public string courseCode { get; set; }
        [MaxLength(20)]
        public string groupMixingType { get; set; }
        [JsonIgnore]
        public int  idClassSchedule { get; set; }

        [ForeignKey(nameof(idClassSchedule)), JsonIgnore]
        public virtual ClassSchedules ClassSchedules { get; set; }


        [NotMapped, JsonIgnore]
        public virtual List<UsersCourses> UsersCourses { get; set; }
    }
}
