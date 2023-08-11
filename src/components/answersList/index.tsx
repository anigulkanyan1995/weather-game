import React from 'react';
import TextConstants from "../../constants/TextConstants";
import {IAnswersListProps} from "../../types/types";
import './styles.scss';

const AnswersList: React.FC<IAnswersListProps> = ({ userAnswers, cities }) => {
    return (
        <div className='answerList'>
            <h2>{TextConstants.ANSWERS_LIST.YOUR_ANSWERS}</h2>
            {cities.map((city, index) => (
                <div key={index}>
                    <h3>{city.name}</h3>
                    <p>Actual Temperature: {city.actualTemp !== null ? `${city.actualTemp}°C` : '---'}</p>
                    {userAnswers[index] && (
                        <p>{TextConstants.GUESS_FORM.YOUR_GUESS} {userAnswers[index].userGuess}°C</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnswersList;
