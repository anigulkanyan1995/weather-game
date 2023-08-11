import {initialCities} from "../../constants/HardCodedData";
import {useState} from "react";
import {ICity, IUserAnswer} from "../../types/types";
import Endpoints from "../../constants/EndPoinds";
import TextConstants from "../../constants/TextConstants";
import ResultBox from "../resultBox";
import AnswersList from "../answersList";
import GuessForm from "../guessForm";
import './styles.scss'

const Game = () => {
    const shuffledCities = initialCities.sort(() => Math.random() - 0.5).slice(0, 5);
    const [cities, setCities] = useState<ICity[]>(shuffledCities);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);

    const handleGuess = async (guess: number, cityId: string) => {
        if (userAnswers.length < 5) {
            await fetchCityData(cities.find(city => city.id === cityId)!.name, guess, cityId);
        }
    };

    const fetchCityData = async (cityName: string, guess: number, cityId: string) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Endpoints.API_KEY}`
            );
            if (response.ok) {
                const data = await response.json();
                setCities((prevCities) =>
                    prevCities.map((city) =>
                        city.id === cityId ? { ...city, actualTemp: data.main.temp } : city
                    )
                );

                setUserAnswers((prevAnswers: any) => [
                    ...prevAnswers,
                    { id: cityId, userGuess: guess, actualTemp: data.main.temp },
                ]);
            } else {
                console.error(TextConstants.ERRORS.FETCHING_ERROR);
            }
        } catch (error) {
            console.error(TextConstants.ERRORS.ERROR, error);
        }
    };

    return (
        <div className={userAnswers.length === 5 ? 'resultContainer' : 'gameContainer'}>
            {userAnswers.length === 5 ? (
                <ResultBox userAnswers={userAnswers} />
            ) : (
                <div>
                    <div className="guessFormContainer">
                        <h2>{TextConstants.GUESS_FORM.GUESS_TITLE}</h2>
                        {cities.map((city) => (
                            <div key={city.id}>
                                <h3>{city.name}</h3>
                                <GuessForm
                                    onGuess={(guess: number) =>
                                        handleGuess(guess, city.id)
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
