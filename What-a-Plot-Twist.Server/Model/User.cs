using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using Newtonsoft.Json;



namespace What_a_Plot_Twist.Server.Model
{
    public class User
    {
        [BsonId]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();  //problem with id (it is saved incorrectly in the database)

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("salt")]
        public string Salt { get; set; }

        //[BsonElement("avatar")]
        //public byte[] Avatar { get; set; }

        [BsonElement("charadesGameScore")]
        public List<GameSession> CharadesGameScore { get; set; } = new List<GameSession>();

    }
    public class GameSession
    {
        [BsonElement("gameSessionId")]
        public ObjectId GameSessionId { get; set; } = ObjectId.GenerateNewId();  //problem with id (it is saved incorrectly in the database)

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
