// Exibir o widget embarcado do tempo.com
function displayWeather() {
    const weatherHTML = `
        <div class="weather-content">
            <div class="weather-header">
                <h3>Previsão do Tempo - Marota, Pindobaçu</h3>
            </div>
            <div style="width: 100%; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                <iframe 
                    src="https://www.tempo.com/marota.htm" 
                    width="100%" 
                    height="450"
                    frameborder="0"
                    style="border: none; border-radius: 10px;">
                </iframe>
            </div>
            <p style="text-align: center; margin-top: 15px; color: #666; font-size: 0.9rem;">
                Dados em tempo real de <strong>tempo.com</strong>
            </p>
        </div>
    `;
    
    const container = document.getElementById('weather-container');
    if (container) {
        container.innerHTML = weatherHTML;
    }
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', displayWeather);
