using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
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


}
