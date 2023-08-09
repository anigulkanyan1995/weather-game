import React from 'react';

const GuessForm = () => {

    return (
        <form>
            <input
                type="number"
                placeholder="Enter your guess"
            />
            <button type="submit" >
                Submit Guess
            </button>
        </form>
    );
};

export default GuessForm;
