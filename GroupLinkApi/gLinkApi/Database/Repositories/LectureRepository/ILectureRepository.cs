using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.LectureRepository
{
    public interface ILectureRepository : IBasicRepository<Lecturers>
    {
        int GetId(Lecturers lecturerToCheck);
        Lecturers GetLecturer(string name, string surname);
        Task<List<Lecturers>> GetLecturersByName(string name);
        Task<List<Lecturers>> GetLecturersBySurame(string surname);
        Task<List<Lecturers>> GetAll();
    }
}
