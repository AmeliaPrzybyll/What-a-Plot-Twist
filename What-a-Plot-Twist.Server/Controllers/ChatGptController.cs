using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
//AP: trzeba doładowac za 5 USD

namespace What_a_Plot_Twist.Server.Controllers
{
    [Route("api/chatgpt")]
    [ApiController]
    public class ChatGptController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public ChatGptController(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["OpenAI:ApiKey"];
        }

        [HttpPost("send-message")]
        public async Task<IActionResult> SendMessage([FromBody] ChatRequest chatRequest)
        {
            var apiUrl = "https://api.openai.com/v1/chat/completions";

            var requestPayload = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = chatRequest.Message }
                },
                max_tokens = 150
            };

            var content = new StringContent(JsonConvert.SerializeObject(requestPayload), Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = await _httpClient.PostAsync(apiUrl, content);

            var responseContent = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine("Błąd OpenAI: " + responseContent);
                return StatusCode((int)response.StatusCode, $"Błąd od OpenAI: {responseContent}");
            }

            var result = JsonConvert.DeserializeObject<ChatResponse>(responseContent);
            var message = result?.Choices?.FirstOrDefault()?.Message?.Content;

            return Ok(new { response = message?.Trim() });
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class ChatResponse
    {
        public List<ChatChoice> Choices { get; set; }
    }

    public class ChatChoice
    {
        public ChatMessage Message { get; set; }
    }

    public class ChatMessage
    {
        public string Role { get; set; }
        public string Content { get; set; }
    }
}
