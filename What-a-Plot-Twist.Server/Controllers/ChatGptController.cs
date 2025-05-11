using Microsoft.AspNetCore.Mvc;
using System.Text;
using Newtonsoft.Json;

namespace What_a_Plot_Twist.Server.Controllers
{
    [Route("api/chatgpt")]
    [ApiController]
    public class ChatGptController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public ChatGptController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] ChatRequest chatRequest)
        {
            var apiKey = "kluczyk"; 
            var apiUrl = "https://api.openai.com/v1/completions"; 

            var requestPayload = new
            {
                model = "text-davinci-003", 
                prompt = chatRequest.Message,
                max_tokens = 150
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestPayload), Encoding.UTF8, "application/json");

            content.Headers.Add("Authorization", $"Bearer {apiKey}");

            var response = await _httpClient.PostAsync(apiUrl, content);
            if (response.IsSuccessStatusCode)
            {
                var responseString = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<ChatResponse>(responseString);

                return Ok(result);
            }
            return StatusCode(500, "Błąd podczas komunikacji z ChatGPT");
        }
    }
    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class ChatResponse
    {
        public string Id { get; set; }
        public string Object { get; set; }
        public string Model { get; set; }
        public string Choices { get; set; }
    }
}
