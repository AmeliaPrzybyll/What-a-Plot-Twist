using MongoDB.Driver;
using Microsoft.Extensions.Options;
using What_a_Plot_Twist.Server.Model;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> options)
    {
        var mongoClientSettings = MongoClientSettings.FromUrl(new MongoUrl(options.Value.ConnectionString));

        mongoClientSettings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };

        var client = new MongoClient(mongoClientSettings);
        _database = client.GetDatabase(options.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
