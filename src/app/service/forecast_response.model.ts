export interface ForecastResponse {
    date: string[]; 
    weather_code: number[]; 
    temperature_2m_max: number[];  
    temperature_2m_min: number[];  
    generated_energy: number;  
  }