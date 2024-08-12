export interface Habit {
    _id?:string;
    title:string;
    description?:string;
    icon?:string;
    frequency?:string;
    occurrencesPerDay:number;
    habitDates?: string[];
    duration?:number;
    streak?:number;
    createdAt?:Date;
    completedDates:{
        date:Date;
        isCompleted:boolean;
    }[];
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
