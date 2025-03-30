using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
//using System.Text.Json.Serialization;
using Newtonsoft.Json;



namespace What_a_Plot_Twist.Server.Model
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] // ← to rozwiązuje problem!
        [BsonElement("_id")]
        public string Id { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("avatar")]
        public byte[] Avatar { get; set; }

        [BsonElement("charadesGameScore")]
        public List<GameSession> CharadesGameScore { get; set; } = new List<GameSession>();
    }
    public class GameSession
    {
        [BsonElement("gameSessionId")]
        public string Id { get; set; } = ObjectId.GenerateNewId().ToString();   //problem with id (it is saved incorrectly in the database)
        //zmiana na id poniewaz był problem z mongo

        [BsonElement("players")]
        public List<PlayerScore> Players { get; set; } = new List<PlayerScore>();

        [BsonElement("winner")]
        public string Winner { get; set; }

    }

    public class PlayerScore
    {
        [BsonElement("playerName")]
        public string PlayerName { get; set; } 

        [BsonElement("score")]
        public int Score { get; set; } 
    }
}
