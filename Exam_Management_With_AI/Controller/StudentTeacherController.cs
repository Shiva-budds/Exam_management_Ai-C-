using Exam_Management_With_AI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Exam_Management_With_AI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTeacherController : ControllerBase
    {
        private readonly AppDbContext _context;
        public StudentTeacherController ( AppDbContext context)
        {
            _context =context ;
        }
        [HttpPost("teacherrequest")]
        public async Task<ActionResult<StudentTeacherModel>> teacherReaquest()
        {
            
        } 
    }
}
