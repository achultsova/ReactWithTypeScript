export interface IResponse {
    forecast: Iforecast[];
  }
  
  export interface Iforecast {
    date: string;
    max_temp_c: number;
    min_temp_c: number;
    min_temp_f: number;
    avg_temp_c: number;
    avg_temp_f: number;
    condition: string;
    icon_url: string;
    sunrise: string;
    sunset: string;
  }
