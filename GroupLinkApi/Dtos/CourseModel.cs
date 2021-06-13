using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Dtos
{
    public class CourseModel
    {
        public string userLogin { get; set; }

        //Course data
        public int idCourse { get; set; }
        [MaxLength(50)]
        public string courseName { get; set; }
        [MaxLength(10)]
        public string groupCode { get; set; }
        [MaxLength(20)]
        public string courseCode { get; set; }
        [MaxLength(20)]
        public string groupMixingType { get; set; }

        //ClassSchedule
        [MaxLength(20)]
        public string dayOfTheWeek { get; set; }
        [MaxLength(10)]
        public string startTime { get; set; }
        [MaxLength(10)]
        public string endTime { get; set; }
        [MaxLength(5)]
        public string type { get; set; }

        //Lecturer
        [MaxLength(20)]
        public string lecturerName { get; set; }
        [MaxLength(20)]
        public string lecturerSurname { get; set; }
        [MaxLength(50)]
        public string lecturerEmail { get; set; }


    }
}
