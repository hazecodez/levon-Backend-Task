import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { DatabaseError } from "../utils/errorClasses";

// In-memory cache object to store the weather data
const cache: { [key: string]: { data: any; expiry: number } } = {};

// Set cache duration (in milliseconds)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Function to fetch weather data from external API
const fetchWeatherData = async (place: string) => {
  const WEATHER_API_ID = process.env.WEATHER_API_ID as string; // Get WEATHER_API_ID from env file
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${WEATHER_API_ID}`;
  const response = await axios.get(url);
  return response.data;
};

// Weather controller to handle the route
export const getWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const place = req.params.place;

  try {
    // Check if the data is in cache and not expired
    if (cache[place] && cache[place].expiry > Date.now()) {
      console.log(`Serving data for ${place} from cache`);
      return res.status(200).json(cache[place].data);
    }

    // Fetch new data if cache is expired or not available
    console.log(`Fetching fresh data for ${place}`);
    const weatherData = await fetchWeatherData(place);

    // Store the fetched data in the cache with an expiry time
    cache[place] = {
      data: weatherData,
      expiry: Date.now() + CACHE_DURATION,
    };

    return res.status(200).json(weatherData);
  } catch (error) {
    return next(new DatabaseError("Error fetching weather data"));
  }
};
