import React, { useState } from 'react';
import TextConstants from '../../constants/TextConstants';
import { IGuessFormProps } from '../../types/types';
import './styles.scss'

const GuessForm: React.FC<IGuessFormProps> = ({ onGuess }) => {
    const [guess, setGuess] = useState<number | ''>('');
    const [submittedGuess, setSubmittedGuess] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (guess !== '' && typeof guess === 'number') {
            onGuess(guess);
            setSubmittedGuess(guess);
            setGuess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder={TextConstants.GUESS_FORM.ENTER_YOUR_GUESS}
                value={submittedGuess !== '' ? submittedGuess : guess}
                onChange={(e) => setGuess(Number(e.target.value))}
                disabled={submittedGuess !== ''}
                className='formInput'
            />
            <button type="submit" disabled={submittedGuess !== ''}
                    className='submitButton'
            >
                {TextConstants.GUESS_FORM.SUBMIT_GUESS}
            </button>
        </form>
    );
};

export default GuessForm;
