import React from 'react';
import {IResultBoxProps} from '../../types/types';
import TextConstants from '../../constants/TextConstants';

const ResultBox: React.FC<IResultBoxProps> = ({ userAnswers }) => {
    const correctGuesses = userAnswers.filter(
        (answer) =>
            answer.actualTemp !== null &&
            Math.abs(answer.actualTemp - answer.userGuess) <= 5
    );

    const guessedCount = correctGuesses.length;
    const resultMessage =
        guessedCount >= 3
            ? TextConstants.WIN.CONGRATULATIONS
            : TextConstants.GAME_OVER.GAME_OVER;

    return (
        <div className="resultBox">
            <h2>Result</h2>
            <p>{resultMessage}</p>
            <div className="answerList">
                <h3>Your Answers:</h3>
                <ul>
                    {userAnswers.map((answer, index) => (
                        <li key={index}>
                            Your Guess: {answer.userGuess}°C&nbsp;&nbsp;
                            Actual Temperature:{' '}
                            {answer.actualTemp !== null
                                ? `${answer.actualTemp}°C`
                                : '---'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResultBox;
