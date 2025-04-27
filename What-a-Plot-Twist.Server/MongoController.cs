using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using MongoDB.Bson;
using MongoDB.Driver;
using System.ComponentModel.DataAnnotations;
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
            var avatarBase64 = user.Avatar != null ? Convert.ToBase64String(user.Avatar) : null;

            return Ok(new { message = "Logowanie udane", username = user.Username, avatar = avatarBase64 });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd serwera: {ex.Message}");
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Registration([FromBody] RegistrationRequest registrationRequest)
    {
        if (!ModelState.IsValid)
        {
            var errorMessages = ModelState.Values
                                           .SelectMany(v => v.Errors)
                                           .Select(e => e.ErrorMessage)
                                           .ToList();

            // Zwróć błąd w formie czystego tekstu, aby użytkownik mógł łatwiej go zrozumieć
            var friendlyMessage = string.Join(", ", errorMessages);
            return BadRequest(friendlyMessage); // Błąd zwrócony jako tekst
        }

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

    // endpoint do zmiany loginu/hasła/avatara
    [HttpPost("update-user")]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest updateRequest)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");

            // znajdź użytkownika po starej nazwie
            var user = await collection.Find(u => u.Username == updateRequest.OldUsername).FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound("Nie znaleziono użytkownika.");
            }

            // Jeśli podano nowy login, zmień username
            if (!string.IsNullOrEmpty(updateRequest.NewUsername))
            {
                var existingUser = await collection.Find(u => u.Username == updateRequest.NewUsername).FirstOrDefaultAsync();
                if (existingUser != null)
                {
                    return Conflict("Użytkownik o tej nazwie już istnieje.");
                }
                else
                    user.Username = updateRequest.NewUsername;
            }

            // Jeśli podano nowe hasło, zmień hasło
            if (!string.IsNullOrEmpty(updateRequest.NewPassword))
            {
                user.PasswordHash = HashPassword(updateRequest.NewPassword);
            }

            // Jeśli podano nowe avatar, zmień avatar
            if (!string.IsNullOrEmpty(updateRequest.NewAvatar))
            {
                user.Avatar = Convert.FromBase64String(updateRequest.NewAvatar);
            }

            // Zaktualizuj użytkownika w bazie danych
            var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
            var result = await collection.ReplaceOneAsync(filter, user);

            if (result.ModifiedCount == 0)
            {
                return BadRequest("Nie udało się zaktualizować danych użytkownika.");
            }

            return Ok("Dane użytkownika zostały zaktualizowane.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd serwera: {ex.Message}");
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
    [Required(ErrorMessage = "Nazwa użytkownika jest wymagana")]
    [MinLength(3, ErrorMessage = "Nazwa użytkownika musi mieć co najmniej 3 znaki")]
    public string Username { get; set; }
    [Required(ErrorMessage = "Hasło jest wymagane")]
    [MinLength(8, ErrorMessage = "Hasło musi mieć co najmniej 8 znaków")]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$",
    ErrorMessage = "Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną cyfrę i jeden znak specjalny.")]
    public string Password { get; set; }
}

public class UpdateUserRequest
{
    public string OldUsername { get; set; } 
    public string NewUsername { get; set; }
    public string NewPassword { get; set; }
    public string NewAvatar { get; set; }
}

