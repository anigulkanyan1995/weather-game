import React, { useState } from 'react';
import TextConstants from "../../constants/TextConstants";
import {IGuessFormProps} from "../../types/types";

const GuessForm: React.FC<IGuessFormProps> = ({ onGuess }) => {
    const [guess, setGuess] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (guess !== '' && typeof guess === 'number') {
            onGuess(guess);
            setGuess('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder={TextConstants.GUESS_FORM.ENTER_YOUR_GUESS}
                value={guess}
                onChange={(e) => setGuess(Number(e.target.value))}
            />
            <button type="submit">
                {TextConstants.GUESS_FORM.SUBMIT_GUESS}
            </button>
        </form>
    );
};

export default GuessForm;
