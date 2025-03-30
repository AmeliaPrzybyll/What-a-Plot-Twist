using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using What_a_Plot_Twist.Server.Model;

[Route("api/mongo")]
[ApiController]
public class MongoController : ControllerBase
{
    private readonly MongoDbContext _context;

    public MongoController(MongoDbContext context)
    {
        _context = context;
    }
    
    [HttpPost("add-document")]
    public async Task<IActionResult> AddDocument([FromBody] User newUser)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");
            await collection.InsertOneAsync(newUser);
            return Ok("Dokument dodany");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd: {ex.Message}");
        }
    }

    [HttpGet("test-connection")]
    public IActionResult TestConnection()
    {
        try
        {
            var collection = _context.GetCollection<BsonDocument>("User");
            collection.EstimatedDocumentCount();
            return Ok("Działa");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd połączenia: {ex.Message}");
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");

            var user = await collection.Find(u => u.Username == loginRequest.Username).FirstOrDefaultAsync();
            if (user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash))
            {
                return Unauthorized("Nieprawidłowa nazwa użytkownika lub hasło.");
            }

            return Ok(new { message = "Logowanie udane", username = user.Username });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd serwera: {ex.Message}");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Registration([FromBody] RegistrationRequest registrationRequest)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");

            var existingUser = await collection.Find(u => u.Username == registrationRequest.Username).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return Conflict("Użytkownik o tej nazwie już istnieje.");
            }

            var hashedPassword = HashPassword(registrationRequest.Password);

            var newUser = new User
            {
                Username = registrationRequest.Username,
                PasswordHash = hashedPassword,
                Avatar = null
            };

            await collection.InsertOneAsync(newUser);

            return Ok(new { message = "Rejestracja zakończona pomyślnie", username = newUser.Username });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd serwera: {ex.Message}");
        }
    }


    private string HashPassword(string password, string salt)
    {
        using (var sha256 = SHA256.Create())
        {
            var saltedPassword = password + salt;
            var bytes = Encoding.UTF8.GetBytes(saltedPassword);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
    private bool VerifyPassword(string enteredPassword, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(enteredPassword, storedHash);
    }

}
public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class RegistrationRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}


