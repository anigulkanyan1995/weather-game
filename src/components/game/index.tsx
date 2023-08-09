import React, { useEffect, useState } from 'react';
import GuessForm from '../guessForm';
import AnswersList from '../answersList';
import TextConstants from "../../constants/TextConstants";
interface ICityData {
    cityName: string;
    temperature: number;
}

const Game = () => {
    const [cityData, setCityData] = useState<ICityData | null>(null);
    const apiKey = 'b355db3a8217ae32abe405b8021b20a5';

    const fetchCityData = async (cityName: string) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
            );
            if (response.ok) {
                const data = await response.json();
                setCityData({
                    temperature: data.main.temp,
                    cityName: data.name,
                });
            } else {
                console.error(TextConstants.ERRORS.FETCHING_ERROR);
            }
        } catch (error) {
            console.error(TextConstants.ERRORS.ERROR, error);
        }
    };

    useEffect(() => {
        fetchCityData('London');
    }, []);

    console.log(cityData, 'cityData');

    return (
        <div>
            <GuessForm />
            <AnswersList />
        </div>
    );
};

export default Game;
