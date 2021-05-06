using Dtos;
using Entities;
using GroupLinkApi.Database.Repositories.CourseRepository;
using GroupLinkApi.Interfaces;
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
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseService courseService, ICourseRepository courseRepository)
        {
            _courseService = courseService;
            _courseRepository = courseRepository;
        }

        [HttpPost]
        //[Authorize]
        // POST: CourseController/Create
        public ActionResult CreateCourse(CourseModel newCourseModel)
        {
            //sprawdzenie czy ten kurs zostal juz przypisany do osoby
            if ( !string.IsNullOrEmpty(newCourseModel.userLogin))
            {
                var courses = _courseService.UserCourseByFilter(newCourseModel);
                if (courses.Result.Count() > 0)
                    return BadRequest(new { message = "Course is assigned to you" });
            }

            //sprawdzenie czy ten kurs wgl istnieje
            if ( _courseService.IsCourseExist(newCourseModel))
                return BadRequest(new { message = "Course is exist" });

            var result = _courseService.AddCourse(newCourseModel);

            if (result)
                return Ok("Successfully created new course"); //stworzono
            else
                return StatusCode(500);
        }


        [HttpGet("AllUserCourses")]
        //[Authorize]
        public async Task<List<CourseModel>> AllUserCourses(string login)
        {
            return await _courseService.GetCoursesByLogin(login);
        }

        [HttpGet]
        public async Task<List<Courses>> GetByName(string groupOrCourseCode)
        {
            return await _courseRepository.GetCourses(groupOrCourseCode);
        }


        //[Authorize]
        [HttpPost("GetUserCoursesFiltredData")]
        public async Task<List<CourseModel>> GetAllUserCourseModel(CourseModel courseModelToFilter)
        {
            return await _courseService.UserCourseByFilter(courseModelToFilter);
        }

        //[Authorize]
        [HttpPost("GetCoursesFiltredData")]
        public async Task<List<CourseModel>> GetAllCourseModel(CourseModel courseModelToFilter)
        {
            return await _courseService.CoursesByFilter(courseModelToFilter);
        }

    }
}
