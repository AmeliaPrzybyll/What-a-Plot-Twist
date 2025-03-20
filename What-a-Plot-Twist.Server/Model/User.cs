using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;
using Newtonsoft.Json;



namespace What_a_Plot_Twist.Server.Model
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId(); //problem with id (it is saved incorrectly in the database)

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("passwordHash")]
        public string PasswordHash { get; set; }

        [BsonElement("salt")]
        public string Salt { get; set; }

        //[BsonElement("avatar")]
        //public byte[] Avatar { get; set; }

    }
}
