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

        // POST: LectureController/Create
        [HttpPost]
        //[Authorize]
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


        [Route("ByName")]
        [HttpGet]
        public async Task<List<Lecturers>> GetByName(string name)
        {
            return await _lectureRepository.GetLecturersByName(name);
        }

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
