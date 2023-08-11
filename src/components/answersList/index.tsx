import React from 'react';
import TextConstants from "../../constants/TextConstants";
import {IAnswersListProps} from "../../types/types";
import './styles.scss';

const AnswersList: React.FC<IAnswersListProps> = ({ userAnswers, cities }) => {

    return (
        <div className='answerList'>
            <h2>{TextConstants.ANSWERS_LIST.YOUR_ANSWERS}</h2>
            {cities.map((city) => {
                const userAnswer = userAnswers.find((answer) => answer.id === city.id);
                return (
                    <div key={city.id}>
                        <h3 style={{marginTop: '3px'}}>{city.name}</h3>
                        <p>Actual Temperature: {city.actualTemp !== null ? `${city.actualTemp}°C` : '---'}</p>
                        {userAnswer && (
                            <p>{TextConstants.GUESS_FORM.YOUR_GUESS} {userAnswer.userGuess}°C</p>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default AnswersList;
