using Exam_Management_With_AI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Exam_Management_With_AI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public class LoginRequest
        {
            public string PhoneNumber { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        private readonly AppDbContext _context;
        public UserController(AppDbContext context)
        {
            _context = context;
        }
        // A simple placeholder for demonstration. DO NOT USE IN PRODUCTION.
        // You would typically use a library like BCrypt.Net-Next or ASP.NET Core Identity's PasswordHasher.
        // For a real application, this should be in a separate utility class.
        private static class PasswordHasher
        {
            public static string Hash(string password)
            {
                // In a real app, this would be a strong hashing algorithm with salting
                return Convert.ToBase64String(SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(password)));
            }

            public static bool Verify(string hashedPassword, string passwordToVerify)
            {
                return Hash(passwordToVerify) == hashedPassword;
            }
        }
        [HttpPost("debug-login")]
        public async Task<ActionResult> debugLogin([FromBody] UserModel U)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == U.PhoneNumber);
            if (user == null) return NotFound("User not found");
            var hashOfInput = PasswordHasher.Hash(U.Password);
            return Ok(new
            {
                storedPassword = user.Password,
                hashOfInput = hashOfInput,
                matches = user.Password == hashOfInput
            });
        }
        // It's better to use POST for creating resources and sending data in the body.
        [HttpPost("signup")]
        public async Task<ActionResult<UserModel>> signup([FromBody] UserModel u)
        {
            Console.WriteLine("hello this is another degubber 74");
            var user = await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == u.PhoneNumber);
            if (user != null)
            {
                return BadRequest("Allready Exists");
            }
            // IMPORTANT: You should hash and salt the password before saving it.
            // Storing plain text passwords is a major security risk.
            u.Password = PasswordHasher.Hash(u.Password); // UNCOMMENTED: Hash password before saving
            await _context.Users.AddAsync(u);
            await _context.SaveChangesAsync();
            return Created("User Created", u);
        }

        // Login should also be a POST request to keep credentials out of the URL.
        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> login([FromBody] LoginRequest U)
        {
            Console.WriteLine("hello this is another degubber 24");
            var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(x => x.PhoneNumber == U.PhoneNumber);
            
            if (user == null)
            {   // Use NotFound (404) to be more specific.
                return NotFound("User not found.");
            }
            // IMPORTANT: Compare the hashed password from the DB with the hash of the password provided by the user.
            // Replace the direct comparison with a proper verification method.
            // user.Password is the HASHED password from the DB. U.Password is the PLAIN-TEXT password from the request.
            Console.WriteLine("hello this is another degubber 34");
            if (PasswordHasher.Verify(user.Password, U.Password)) // Use the PasswordHasher to verify
            {
                return Ok(user); // OK (200) is more appropriate for a successful login than Created (201).
            }
            Console.WriteLine("hello this is another degubber 44");
            return BadRequest("Invalid password.");
        }
    }
}
