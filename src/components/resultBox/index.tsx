import React from 'react';
import { IResultBoxProps } from '../../types/types';
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
            <p className={guessedCount >= 3 ? 'resultBoxCongratulations' : 'resultBoxGameOver'}>
                {resultMessage}
            </p>
            <div className="answerList">
                <h3>Your Answers:</h3>
                {userAnswers.map((answer, index) => (
                    <div key={index}>
                        <p>Your Guess: {answer.userGuess}°C</p>
                        <p className={answer.actualTemp !== null ? guessedCount >= 3 ? 'resultBoxCongratulations' : 'resultBoxGameOver' : ''}>
                            Actual Temperature:{' '}
                            {answer.actualTemp !== null
                                ? `${answer.actualTemp}°C`
                                : '---'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultBox;
