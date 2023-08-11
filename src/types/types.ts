export interface ICity {
    id: string;
    name: string;
    actualTemp: number | null;
}

export interface IUserAnswer {
    id: string;
    userGuess: number;
    actualTemp: number | null;
}

export interface IUserAnswer {
    userGuess: number;
    actualTemp: number | null;
}

export interface IAnswersListProps {
    userAnswers: IUserAnswer[];
    cities: ICity[];
}

export interface IGuessFormProps {
    onGuess: (guess: number) => void;
}

export interface IResultBoxProps {
    userAnswers: IUserAnswer[];
}