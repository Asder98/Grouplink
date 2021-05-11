using Entities;
using GroupLinkApi.Database.Repositories.LectureRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        public readonly ILectureRepository _lectureRepository;

        public LectureController(ILectureRepository lectureRepository)
        {
            _lectureRepository = lectureRepository;
        }

        /// <summary>
        /// Metoda tworzy nowego prowadzacego na podstawie dostarczonego obiektu
        /// </summary>
        /// <param name="lecturers"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        // POST: LectureController/Create
        public IActionResult Create(Lecturers lecturers)//standard entity without id
        {
            try
            {
                var res = _lectureRepository.Add(lecturers);
                if(res.Result)
                    return Ok();
                else
                    return StatusCode(500);
            }
            catch
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Metoda zwraca liste prowadzacych na podstawie podanego imienia
        /// </summary>
        /// <param name="name">parametr okreslajacy imie prowadzacego</param>
        /// <returns>Lista prowadzacych</returns>
        [Route("ByName")]
        [HttpGet]
        public async Task<List<Lecturers>> GetByName(string name)
        {
            return await _lectureRepository.GetLecturersByName(name);
        }

        /// <summary>
        /// Metoda zwraca liste prowadzacych na podstawie podanego nazwiska
        /// </summary>
        /// <param name="name">parametr okreslajacy nazwisko prowadzacego</param>
        /// <returns>Lista prowadzacych</returns>
        [Route("BySurame")]
        [HttpGet]
        public async Task<List<Lecturers>> GetBySurame(string surname)
        {
            return await _lectureRepository.GetLecturersBySurame(surname);
        }

        [Route("All")]
        [HttpGet]
        public async Task<List<Lecturers>> GetAll()
        {
            return await _lectureRepository.GetAll();
        }


    }
}
