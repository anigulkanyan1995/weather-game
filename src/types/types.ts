export interface ICity {
    name: string;
    actualTemp: number | null;
}

export interface IUserAnswer {
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