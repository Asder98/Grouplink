using System;
using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Courses
    {
        [Key]
        public int idCourse { get; set; }
        public int idLecturer { get; set; }
        [MaxLength(10)]
        public string groupCode { get; set; }
        [MaxLength(20)]
        public string courseCode { get; set; }
        public DateTime startDate { get; set; }
        [MaxLength(20)]
        public string groupMixingType { get; set; }
        [MaxLength(5)]
        public string weekType { get; set; }
    }
}
