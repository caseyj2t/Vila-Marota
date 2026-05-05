// Coordenadas de Marota, Pindobaçu, BA
const MAROTA_LAT = '-10.7447';
const MAROTA_LON = '-40.4498';

// Função para traduzir código de clima
function getWeatherDescription(weatherCode) {
    const weatherCodes = {
        0: '☀️ Céu limpo',
        1: '🌤️ Parcialmente nublado',
        2: '⛅ Nublado',
        3: '☁️ Muito nublado',
        45: '🌫️ Neblina',
        48: '🌫️ Neblina com geada',
        51: '🌧️ Chuva leve',
        53: '🌧️ Chuva moderada',
        55: '🌧️ Chuva forte',
        61: '🌧️ Chuva leve',
        63: '🌧️ Chuva moderada',
        65: '🌧️ Chuva forte',
        71: '❄️ Neve leve',
        73: '❄️ Neve moderada',
        75: '❄️ Neve forte',
        77: '❄️ Grãos de neve',
        80: '🌧️ Chuva leve',
        81: '🌧️ Chuva moderada',
        82: '🌧️ Chuva forte',
        85: '❄️ Neve leve',
        86: '❄️ Neve forte',
        95: '⛈️ Tempestade'
    };
    return weatherCodes[weatherCode] || '🌤️ Desconhecido';
}

// Função para buscar o clima
async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${MAROTA_LAT}&longitude=${MAROTA_LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=America/Bahia`
        );
        
        if (!response.ok) {
            throw new Error('Erro ao conectar com o serviço de clima');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('weather-container').innerHTML = 
            `<p style="color: #d32f2f; text-align: center;">Erro ao carregar clima. Tente mais tarde.</p>`;
    }
}

// Função para exibir o clima
function displayWeather(data) {
    const current = data.current;
    const timezone = data.timezone;
    
    const weatherHTML = `
        <div class="weather-content">
            <div class="weather-header">
                <h3>Previsão do Tempo - Marota, Pindobaçu</h3>
            </div>
            <div class="weather-main">
                <div class="weather-temp">
                    <span class="temperature">${Math.round(current.temperature_2m)}°C</span>
                    <span class="weather-emoji">${getWeatherDescription(current.weather_code)}</span>
                </div>
                <div class="weather-details">
                    <p class="condition">${getWeatherDescription(current.weather_code).split(' ').slice(1).join(' ')}</p>
                    <div class="weather-info">
                        <p><strong>Umidade:</strong> ${current.relative_humidity_2m}%</p>
                        <p><strong>Vento:</strong> ${Math.round(current.wind_speed_10m)} km/h</p>
                    </div>
                </div>
            </div>
            <p class="weather-updated">Última atualização: agora</p>
        </div>
    `;
    
    document.getElementById('weather-container').innerHTML = weatherHTML;
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', fetchWeather);
