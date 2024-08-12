export interface Task{
    _id?:string;
    title:string;
    description?:string;
    priority?:string;
    time?:string;
    createdAt?:Date;
    completedDates?:{
        date:Date;
        isCompleted:boolean;
    }[];
}


