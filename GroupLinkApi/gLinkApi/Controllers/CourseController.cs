using Dtos;
using Entities;
using GroupLinkApi.Database.Repositories;
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
        private readonly IUserRepository _userRepository;

        public CourseController(ICourseService courseService, ICourseRepository courseRepository, IUserRepository userRepository)
        {
            _courseService = courseService;
            _courseRepository = courseRepository;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Metoda tworzy kurs na podstawie dostarczonego modelu "CourseModel". 
        /// Podajac login w modelu kurs zostanie przypisany do danej osoby jesli taka istnieje jesli loginu nie bedzie kurs zotanie tylko utworzony
        /// </summary>
        /// <param name="newCourseModel"></param>
        /// <returns>Wiadomosc o problemie lub potwierdzenie wykonania poprawnej operacji</returns>
        //[Authorize]
        [HttpPost("CreateNewCourse")]
        // POST: CourseController/Create
        public ActionResult CreateCourse(CourseModel newCourseModel)
        {
            if ( !string.IsNullOrEmpty(newCourseModel.userLogin))
            {
                var courses = _courseService.UserCourseByFilter(newCourseModel);
                if (courses.Result.Count() > 0)
                    return BadRequest(new { message = "Course is assigned to you" });
            }

            if ( _courseService.IsCourseExist(newCourseModel))
                return BadRequest(new { message = "Course is exist" });

            var result = _courseService.AddCourse(newCourseModel);

            if (result)
                return Ok("Successfully created new course");
            else
                return StatusCode(500);
        }

        /// <summary>
        /// Metoda przypisuje uzytkownika do danej instancji kursu, jesli taka istnieje.
        /// </summary>
        /// <param name="courseModel">w tej metodzie wymagany jest login w modelu</param>
        /// <returns>Wiadomosc o problemie lub potwierdzenie wykonania poprawnej operacji</returns>
        [Authorize]
        [HttpPost("AssignCourseToPerson")]
        public ActionResult AssignCourseToPerson(CourseModel courseModel)
        {
            if (!string.IsNullOrEmpty(courseModel.userLogin))
            {
                var courses = _courseService.UserCourseByFilter(courseModel);
                if (courses.Result.Count() > 0)
                    return BadRequest(new { message = "Course is assigned to you" });

                var idUser = _userRepository.GetUserId(courseModel.userLogin);

                if(idUser == 0)
                    return BadRequest(new { message = "Person do not exist" });
                else
                {
                    var addingCourse = _courseService.AssignCourse(courseModel);
                    if(addingCourse)
                        return Ok("Successfully assign course");
                    else
                        return BadRequest(new { message = "Course is not exist in database or we have problem with database" });
                }
            }
            else
                return BadRequest(new { message = "You did not provide your login" });
        }

        /// <summary>
        /// Metoda zwraca wszystkie kursy w formie listy jakie sa przypisane do danego uzytkownika na podstawie dostarczonego loginu
        /// </summary>
        /// <param name="login">login uzytkownika w formacie string</param>
        /// <returns>Lista kursow uzytkownika na bazie modelu "CourseModel"</returns>
        [Authorize]
        [HttpGet("GetAllUserCourses")]
        public async Task<List<CourseModel>> AllUserCourses(string login)
        {
            return await _courseService.GetCoursesByLogin(login);
        }

        /// <summary>
        /// Metoda zwraca liste kursow na podstawie parametru ktory okresla kod grupy lub kod kursu
        /// </summary>
        /// <param name="groupOrCourseCode"></param>
        /// <returns>Lista kursow</returns>
        [HttpGet("GetCourseByCodeGroupOrCodeCourse")]
        public async Task<List<Courses>> GetByName(string groupOrCourseCode)
        {
            return await _courseRepository.GetCourses(groupOrCourseCode);
        }

        /// <summary>
        /// Metoda zwraca liste kursow przypisanych do konkretnego uzytkownika na podstawie modelu "CourseModel".
        /// Mozliwe jest podanie niepelnego parametru
        /// Jesli pole w modelu nie zostalo podane zostanie pominiete jako parametr wyszukiwania
        /// </summary>
        /// <param name="courseModelToFilter">wymagany parametr login</param>
        /// <returns>Lista kursow</returns>
        [Authorize]
        [HttpPost("GetUserCoursesFiltredData")]
        public async Task<List<CourseModel>> GetAllUserCourseModel(CourseModel courseModelToFilter)
        {
            return await _courseService.UserCourseByFilter(courseModelToFilter);
        }

        /// <summary>
        /// Metoda zwraca liste kursow na podstawie modelu "CourseModel".
        /// Mozliwe jest podanie niepelnego parametru
        /// Jesli pole w modelu nie zostalo podane zostanie pominiete jako parametr wyszukiwania
        /// </summary>
        /// <param name="courseModelToFilter"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost("GetCoursesFiltredData")]
        public async Task<List<CourseModel>> GetAllCourseModel(CourseModel courseModelToFilter)
        {
            return await _courseService.CoursesByFilter(courseModelToFilter);
        }
        [Authorize]
        [HttpGet()]
        public CourseModel GetCoursesById(int id)
        {
            return _courseService.GetCourseById(id);
        }

    }
}
