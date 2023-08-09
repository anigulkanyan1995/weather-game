import React, { useState } from 'react';
import AnswersList from '../answersList';
import TextConstants from "../../constants/TextConstants";
import GuessForm from "../guessForm";

interface ICity {
    name: string;
    actualTemp: number | null;
}

interface IUserAnswer {
    userGuess: number;
    actualTemp: number | null;
}

const Game = () => {
    const apiKey = 'b355db3a8217ae32abe405b8021b20a5';
    const initialCities: ICity[] = [
        { name: 'London', actualTemp: null },
        { name: 'New York', actualTemp: null },
        { name: 'Tokyo', actualTemp: null },
        { name: 'Paris', actualTemp: null },
        { name: 'Sydney', actualTemp: null },
    ];
    const [cities, setCities] = useState<ICity[]>(initialCities);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);

    const fetchCityData = async (cityName: string) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                {cities.map((city, index) => (
                    <div key={index}>
                        <h3>{city.name}</h3>
                        <p>Actual Temperature: {city.actualTemp !== null ? `${city.actualTemp}°C` : ''}</p>
                        <GuessForm onGuess={(guess: number) => handleGuess(guess, index)} />
                    </div>
                ))}
            </div>
            <div>
                <AnswersList userAnswers={userAnswers} cities={cities} />
            </div>
        </div>
    );
};

export default Game;
