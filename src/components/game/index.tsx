import React, { useState } from 'react';
import AnswersList from '../answersList';
import TextConstants from "../../constants/TextConstants";
import GuessForm from "../guessForm";
import {ICity, IUserAnswer} from "../../types/types";
import Endpoints from "../../constants/EndPoinds";
import {initialCities} from "../../constants/HardCodedData";
import './styles.scss'
const Game = () => {
    const [cities, setCities] = useState<ICity[]>(initialCities);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);

    const fetchCityData = async (cityName: string) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Endpoints.API_KEY}`
            );
            if (response.ok) {
                const data = await response.json();
                setCities(prevCities => {
                    return prevCities.map(city =>
                        city.name === cityName ? { ...city, actualTemp: data.main.temp } : city
                    );
                });
            } else {
                console.error(TextConstants.ERRORS.FETCHING_ERROR);
            }
        } catch (error) {
            console.error(TextConstants.ERRORS.ERROR, error);
        }
    };

    console.log(cities, 'cities')
    const handleGuess = async (guess: number, cityIndex: number) => {
        if (userAnswers.length < 5) {
            await fetchCityData(cities[cityIndex].name);
            setUserAnswers(prevAnswers => [
                ...prevAnswers,
                { userGuess: guess, actualTemp: cities[cityIndex].actualTemp }
            ]);
        }
    };

    return (
        <div className="gameContainer">
            <div className="guessFormContainer">
                <h2>{TextConstants.GUESS_FORM.GUESS_TITLE}</h2>
                {cities.map((city, index) => (
                    <div key={index}>
                        <h3>{city.name}</h3>
                        <p>Actual Temperature: {city.actualTemp !== null ? `${city.actualTemp}°C` : ''}</p>
                        <GuessForm onGuess={(guess: number) => handleGuess(guess, index)} />
                    </div>
                ))}
            </div>
            <div className="answerListContainer">
                <AnswersList userAnswers={userAnswers} cities={cities} />
            </div>
        </div>

);
};

export default Game;
