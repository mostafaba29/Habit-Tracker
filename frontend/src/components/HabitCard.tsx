import {Habit} from './Habit';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';

interface mediaCardProps {
    habit:Habit;
}
export default function HabitCard({habit}:mediaCardProps){
    return (
        <Card className=" flex flex-col items-start justify-between w-[250px] h-[200px] m-5">
            <CardHeader>
                <CardTitle>{habit.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{habit.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Badge>{habit.duration}</Badge>
                <p>{habit.freqency.value} per {habit.freqency.type}</p>
            </CardFooter>
        </Card>
    )
}