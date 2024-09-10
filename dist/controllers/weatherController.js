"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const errorClasses_1 = require("../utils/errorClasses");
// In-memory cache object to store the weather data
const cache = {};
// Set cache duration (in milliseconds)
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
// Function to fetch weather data from external API
const fetchWeatherData = (place) => __awaiter(void 0, void 0, void 0, function* () {
    const WEATHER_API_ID = process.env.WEATHER_API_ID; // Get WEATHER_API_ID from env file
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${WEATHER_API_ID}`;
    const response = yield axios_1.default.get(url);
    return response.data;
});
// Weather controller to handle the route
const getWeather = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const place = req.params.place;
    try {
        // Check if the data is in cache and not expired
        if (cache[place] && cache[place].expiry > Date.now()) {
            console.log(`Serving data for ${place} from cache`);
            return res.status(200).json(cache[place].data);
        }
        // Fetch new data if cache is expired or not available
        console.log(`Fetching fresh data for ${place}`);
        const weatherData = yield fetchWeatherData(place);
        // Store the fetched data in the cache with an expiry time
        cache[place] = {
            data: weatherData,
            expiry: Date.now() + CACHE_DURATION,
        };
        return res.status(200).json(weatherData);
    }
    catch (error) {
        return next(new errorClasses_1.DatabaseError("Error fetching weather data"));
    }
});
exports.getWeather = getWeather;
