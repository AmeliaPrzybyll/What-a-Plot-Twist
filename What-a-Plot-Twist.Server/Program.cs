using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("https://localhost:61788") // Adres frontendu (React/Vite)
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

//test połaczenia z bazą danych przy starcie aplikacji
var mongoConnectionString = builder.Configuration.GetSection("MongoDB:ConnectionString").Value;
var databaseName = builder.Configuration.GetSection("MongoDB:DatabaseName").Value;

if (string.IsNullOrEmpty(mongoConnectionString))
{
    Console.WriteLine("❌ Błąd: Brak connection stringa! Sprawdź appsettings.json.");
    Environment.Exit(1);
}
else
{
    Console.WriteLine($"✅ Connection string: {mongoConnectionString}");
}

try
{
    var mongoClient = new MongoClient(mongoConnectionString);
    var database = mongoClient.GetDatabase(databaseName);
    var pingResult = database.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait(2000);

    if (!pingResult)
    {
        throw new Exception("Brak odpowiedzi od serwera MongoDB.");
    }

    Console.WriteLine("✅ Połączenie z bazą MongoDB działa poprawnie.");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Błąd połączenia z bazą: {ex.Message}");
    Environment.Exit(1);
}


// Rejestracja ustawień MongoDB
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<MongoDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseCors("AllowFrontend"); // Włączenie CORS

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
