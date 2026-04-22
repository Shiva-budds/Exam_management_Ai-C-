using Exam_Management_With_AI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam_Management_With_AI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTeacherController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentTeacherController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("teacherrequest")]
        public async Task<ActionResult<StudentTeacherModel>> teacherReaquest(StudentTeacherModel student_techer)
        {
            await _context.StudentTeacher.AddAsync(student_techer);
            await _context.SaveChangesAsync();
            return Created("succesfully got the data", student_techer);
            // var user = await _context.Users.FindAsync(student_techer.StudentId);
            // if (user != null)
            // {
            //   await  _context.StudentTeacher.AddAsync(student_techer);
            //   await _context.SaveChangesAsync();
            //   return Created("succesfully got the data",student_techer);
            // }
            // return BadRequest();


        }
    }
}
