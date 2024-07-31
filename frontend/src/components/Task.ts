export interface Task{
    _id:string;
    title:string;
    description:string;
    priority:string;
    done:boolean;
}

export const taskPriority = ['low', 'medium', 'high'] ;
