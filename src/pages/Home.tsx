import React, { useState, useEffect } from 'react';
import { IonContent, IonInput, IonCard, IonCardHeader, IonCardContent, IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import './Home.css';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('Manado');
  const [weather, setWeather] = useState<any>(null);

  const apiKey = 'ad73fbd4d6da5e2cbf23761a1acd976a';

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, [city]);

  return (
    <IonContent>
      <div className="weather-app-container">
        {weather && (
          <IonCard className="weather-card">
            <div className="input-section">
              <div className="search-box">
                <IonIcon icon={searchOutline} className="search-icon" />
                <IonInput value={city} placeholder="Search city" onIonChange={(e) => setCity(e.detail.value!)} clearInput class="city-input" />
              </div>
            </div>
            <IonCardHeader className="city-header">
              <h3>Weather in {city}</h3>
            </IonCardHeader>
            <IonCardContent>
              <div className="weather-icon">
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="Weather Icon" />
              </div>
              <h1 className="temperature">{Math.round(weather.main.temp)}°C</h1>
              <p className="description">{weather.weather[0].description}</p>
              <div className="weather-details">
                <div className="detail-box">
                  <p>Wind</p>
                  <p>{weather.wind.speed} m/s</p>
                </div>
                <div className="detail-box">
                  <p>Humidity</p>
                  <p>{weather.main.humidity}%</p>
                </div>
                <div className="detail-box">
                  <p>Visibility</p>
                  <p>{weather.visibility / 1000} km</p>
                </div>
                <div className="detail-box">
                  <p>Wind Direction</p>
                  <p>{weather.wind.deg}°</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </div>
    </IonContent>
  );
};

export default WeatherApp;
