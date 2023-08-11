import React, { useEffect, useState } from 'react';
import AnswersList from '../answersList';
import TextConstants from '../../constants/TextConstants';
import GuessForm from '../guessForm';
import { ICity, IUserAnswer } from '../../types/types';
import Endpoints from '../../constants/EndPoinds';
import { initialCities } from '../../constants/HardCodedData';
import './styles.scss';
import ResultBox from '../resultBox';

const Game = () => {
    const [cities, setCities] = useState<ICity[]>(initialCities);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
    const [isFinal, setIsFinal] = useState(false);

    const handleGuess = async (guess: number, cityIndex: number) => {
        if (userAnswers.length < 5) {
            await fetchCityData(cities[cityIndex].name, guess);
        }
    };

    const fetchCityData = async (cityName: string, guess: number) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Endpoints.API_KEY}`
            );
            if (response.ok) {
                const data = await response.json();
                setCities((prevCities) =>
                    prevCities.map((city) =>
                        city.name === cityName ? { ...city, actualTemp: data.main.temp } : city
                    )
                );

                setUserAnswers((prevAnswers) => [
                    ...prevAnswers,
                    { userGuess: guess, actualTemp: data.main.temp },
                ]);
            } else {
                console.error(TextConstants.ERRORS.FETCHING_ERROR);
            }
        } catch (error) {
            console.error(TextConstants.ERRORS.ERROR, error);
        }
    };

    useEffect(() => {
        console.log(userAnswers, 'hhh');
    }, [userAnswers]);


    return (
        <div className={userAnswers.length === 5 ? 'resultContainer' : 'gameContainer'}>
            {userAnswers.length === 5 ? (
                <ResultBox userAnswers={userAnswers} />
            ) : (
                <div>
                    <div className="guessFormContainer">
                        <h2>{TextConstants.GUESS_FORM.GUESS_TITLE}</h2>
                        {cities.map((city, index) => (
                            <div key={index}>
                                <h3>{city.name}</h3>
                                <GuessForm
                                    onGuess={(guess: number) =>
                                        handleGuess(guess, index)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="answerListContainer">
                        <AnswersList userAnswers={userAnswers} cities={cities} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
