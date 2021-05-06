using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.LectureRepository
{
    public class LectureRepository : BasicRepository<Lecturers>, ILectureRepository
    {
        public LectureRepository(GroupLinkContext context, ILogger<BasicRepository<Lecturers>> logger) : base(context, logger) { }


        public Lecturers GetLecturer(string name, string surname)
        {
            Lecturers lecturer = new Lecturers();
            if (DatabaseCorrectness().Result)
            {
                lecturer = _context.Lecturers.Where(x => x.name == name && x.surname == surname).FirstOrDefault();
            }
            return lecturer;
        }

        public int GetId(Lecturers lecturerToCheck)
        {
            Lecturers lecturer = _context.Lecturers.Where(x =>
                x.name == lecturerToCheck.name &&
                x.surname == lecturerToCheck.surname &&
                x.email == lecturerToCheck.email)
                .FirstOrDefault();

            if (lecturer == null)
                return 0;
            else
                return lecturer.idLecturer;
        }

        public async Task<List<Lecturers>> GetLecturersByName(string name)
        {
            List<Lecturers> lecturers = new List<Lecturers>();
            if (DatabaseCorrectness().Result)
            {
                lecturers = await _context.Lecturers.Where(x => x.name.StartsWith(name)).ToListAsync();
            }
            return lecturers;
        }

        public async Task<List<Lecturers>> GetLecturersBySurame(string surname)
        {
            List<Lecturers> lecturers = new List<Lecturers>();
            if (DatabaseCorrectness().Result)
            {
                lecturers = await _context.Lecturers.Where(x => x.surname.StartsWith(surname)).ToListAsync();
            }
            return lecturers;
        }
        public async Task<List<Lecturers>> GetAll()
        {
            List<Lecturers> lecturers = new List<Lecturers>();
            if (DatabaseCorrectness().Result)
            {
                lecturers = await _context.Lecturers.ToListAsync();
            }
            return lecturers;
        }


    }
}
