import React from 'react';
import TextConstants from "../../constants/TextConstants";

interface ICity {
    name: string;
    actualTemp: number | null;
}

interface IUserAnswer {
    userGuess: number;
    actualTemp: number | null;
}

interface AnswersListProps {
    userAnswers: IUserAnswer[];
    cities: ICity[];
}

const AnswersList: React.FC<AnswersListProps> = ({ userAnswers, cities }) => {
    return (
        <div>
            <h2>{TextConstants.ANSWERS_LIST.YOUR_ANSWERS}</h2>
            {cities.map((city, index) => (
                <div key={index}>
                    <h3>{city.name}</h3>
                    <p>Actual Temperature: {city.actualTemp !== null ? `${city.actualTemp}°C` : '---'}</p>
                    {userAnswers[index] && (
                        <p>Your Guess: {userAnswers[index].userGuess}°C</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnswersList;
