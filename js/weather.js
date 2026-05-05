// Configuração da API WeatherAPI
const API_KEY = '7b51fc0be70d02b4e105916e2636d989';
const API_URL = 'https://api.weatherapi.com/v1/current.json';
// Coordenadas de Marota, Pindobaçu, BA
const MAROTA_COORDS = '-10.7447,-40.4498';

// Função para buscar o clima
async function fetchWeather() {
    try {
        const response = await fetch(
            `${API_URL}?key=${API_KEY}&q=${MAROTA_COORDS}&lang=pt&aqi=no`
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Erro ao buscar dados do clima');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Erro na API do clima:', error);
        document.getElementById('weather-container').innerHTML = 
            `<p style="color: #d32f2f; text-align: center;">Erro ao carregar previsão do tempo: ${error.message}</p>`;
    }
}

// Função para exibir o clima
function displayWeather(data) {
    const location = data.location;
    const current = data.current;
    
    const weatherHTML = `
        <div class="weather-content">
            <div class="weather-header">
                <h3>Previsão do Tempo - ${location.name}</h3>
            </div>
            <div class="weather-main">
                <div class="weather-temp">
                    <span class="temperature">${Math.round(current.temp_c)}°C</span>
                    <img src="${current.condition.icon}" alt="Clima" class="weather-icon">
                </div>
                <div class="weather-details">
                    <p class="condition">${current.condition.text}</p>
                    <div class="weather-info">
                        <p><strong>Sensação:</strong> ${Math.round(current.feelslike_c)}°C</p>
                        <p><strong>Umidade:</strong> ${current.humidity}%</p>
                        <p><strong>Vento:</strong> ${Math.round(current.wind_kph)} km/h</p>
                        <p><strong>Pressão:</strong> ${current.pressure_mb} mb</p>
                    </div>
                </div>
            </div>
            <p class="weather-updated">Atualizado em: ${new Date(current.last_updated).toLocaleString('pt-BR')}</p>
        </div>
    `;
    
    document.getElementById('weather-container').innerHTML = weatherHTML;
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', fetchWeather);
