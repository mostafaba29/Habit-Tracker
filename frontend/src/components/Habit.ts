export interface Habit {
    name:string;
    description:string;
    done:string[];
    duration:number;
    startTime:Date;
    freqency: {
        type: string,
        value: number,
    };
    user: string;
}


export const HabitCategories = [
    "Art",
    "Meditation",
    "sports",
    "study",
    "entertainment",
    "other",
    "social",
    "finance",
    "health",
    "work",
    "nutrition",
    "other",
]

export const HabitTypes = [
    "timed",
    "numeric",
    "yes or no"
]