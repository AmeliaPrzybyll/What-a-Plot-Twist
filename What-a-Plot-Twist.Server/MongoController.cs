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

    // Logowanie
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");
            var user = await collection.Find(u => u.Username == loginRequest.Username).FirstOrDefaultAsync();

            Console.WriteLine($"Typ ID: {user?.Id?.GetType()}");

            Console.WriteLine("Wynik z MongoDB:");
            Console.WriteLine(user?.ToJson());


            if (user == null)
                return Unauthorized("Nieprawidłowy login lub hasło.");

            var hashedInput = HashPassword(loginRequest.Password, user.Salt);

            if (hashedInput != user.PasswordHash)
                return Unauthorized("Nieprawidłowy login lub hasło.");

            return Ok(new { message = "Zalogowano pomyślnie", username = user.Username });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Błąd serwera: {ex.Message}");
        }
    }

    // Rejestracja
    [HttpPost("registration")]
    public async Task<IActionResult> Registration([FromBody] RegistrationRequest registrationRequest)
    {
        try
        {
            var collection = _context.GetCollection<User>("User");

            // Sprawdź, czy użytkownik już istnieje
            var existingUser = await collection.Find(u => u.Username == registrationRequest.Username).FirstOrDefaultAsync();
            if (existingUser != null)
            {
                return Conflict("Użytkownik o tej nazwie już istnieje.");
            }

            // Generowanie unikalnego salt (możesz użyć np. GUID)
            var salt = GenerateSalt();

            // Haszowanie hasła z użyciem salt
            var hashedPassword = HashPassword(registrationRequest.Password, salt);

            // Tworzenie nowego użytkownika
            var newUser = new User
            {
                Username = registrationRequest.Username,
                PasswordHash = hashedPassword,
                Salt = salt  // Przechowujemy salt w bazie danych
            };

            // Zapisz użytkownika do bazy
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

    private string GenerateSalt()
    {
        // Można tu wygenerować losowy salt (np. 16 bajtów)
        using (var rng = new RNGCryptoServiceProvider())
        {
            byte[] salt = new byte[16];
            rng.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }
    }
}

// Modele danych do rejestracji i logowania

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

//public class User     //A oto jest winowajca
//{
//    public string Username { get; set; }
//    public string PasswordHash { get; set; }
//    public string Salt { get; set; } // Salt do hasła
//}
