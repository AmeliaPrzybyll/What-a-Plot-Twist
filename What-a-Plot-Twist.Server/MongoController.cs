using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

[Route("api/mongo")]
[ApiController]
public class MongoController : ControllerBase
{
    private readonly MongoDbContext _context;

    public MongoController(MongoDbContext context)
    {
        _context = context;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddJson([FromBody] object jsonData)
    {
        var collection = _context.GetCollection<BsonDocument>("mojaKolekcja");
        var document = BsonDocument.Parse(jsonData.ToString());
        await collection.InsertOneAsync(document);
        return Ok("Dodano JSON do MongoDB");
    }
}
