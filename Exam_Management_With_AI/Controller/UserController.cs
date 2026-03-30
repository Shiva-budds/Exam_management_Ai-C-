using Exam_Management_With_AI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam_Management_With_AI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }

        // It's better to use POST for creating resources and sending data in the body.
        [HttpPost("signup")]
        public async Task<ActionResult<UserModel>> signup([FromBody] UserModel u)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == u.PhoneNumber);
            if(user != null)
            {
                return BadRequest("Allready Exists");
            }

            // IMPORTANT: You should hash and salt the password before saving it.
            // Storing plain text passwords is a major security risk.
            // Example using a placeholder hashing function:
            // u.Password = PasswordHasher.Hash(u.Password);

            await _context.Users.AddAsync(u);
            await _context.SaveChangesAsync();
            return Created("User Created",u);
        }

        // Login should also be a POST request to keep credentials out of the URL.
        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> Login([FromBody] UserModel U)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == U.PhoneNumber);
            if(user == null)
            {
                // Use NotFound (404) to be more specific.
                return NotFound("User not found.");
            }

            // IMPORTANT: You should compare the hashed password from the DB 
            // with the hash of the password provided by the user.
            // if (PasswordHasher.Verify(user.Password, U.Password))
            if(user.Password == U.Password)
            {
                return Created("Login successful", user); // OK (200) is more appropriate for a successful login than Created (201).
            }
            return BadRequest("Invalid password.");
        }
    }
}
