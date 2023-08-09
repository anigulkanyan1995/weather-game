import React from 'react';
import TextConstants from "../../constants/TextConstants";

const GuessForm = () => {

    return (
        <form>
            <input
                type="number"
                placeholder={TextConstants.GUESS_FORM.ENTER_YOUR_GUESS}
            />
            <button type="submit" >
                {TextConstants.GUESS_FORM.SUBMIT_GUESS}
            </button>
        </form>
    );
};

export default GuessForm;
