export interface Habit {
    name:string;
    description:string;
    done:boolean;
    duration:number;
    startTime:Date;
    freqency: {
        type: string,
        value: number,
    };
    user: string;
}