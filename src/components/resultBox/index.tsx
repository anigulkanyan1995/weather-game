import React from 'react';
import { IResultBoxProps } from '../../types/types';
import TextConstants from '../../constants/TextConstants';
import './styles.scss'

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
            <h2>{TextConstants.RESULT.RESULT}</h2>
            <p className={guessedCount >= 3 ? 'resultBoxCongratulations' : 'resultBoxGameOver'}>
                {resultMessage}
            </p>
            <div className="answerList">
                <h3>{TextConstants.ANSWERS_LIST.YOUR_ANSWERS}</h3>
                {userAnswers.map((answer, index) => (
                    <div key={index}>
                        <p>{TextConstants.GUESS_FORM.YOUR_GUESS} {answer.userGuess}°C</p>
                        <p className={answer.actualTemp !== null ? guessedCount >= 3 ?
                            'resultBoxCongratulations' :
                            'resultBoxGameOver' : ''}
                        >
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
