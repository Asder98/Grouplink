namespace Dtos
{
    public class ExtendedNotification
    {
        public int idNotification { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string GroupCode { get; set; }
        public string CourseName { get; set; }
        public string LecturerName { get; set; }
        public string CourseCode { get; set; }
        public string DayOfTheWeek { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string ScheduleType { get; set; }
        public int Amount { get; set; }
    }
}
