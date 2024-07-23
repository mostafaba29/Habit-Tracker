import { Separator } from "@/components/ui/separator";
import {stat} from './Stat';
interface StatsProps{
    stats:stat[]
}
export default function Stats({stats}:StatsProps){
     // Logic for fetching user-specific stats from the database
    // const fetchStats = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/api/stats', { params: { userId: props.userId } });
    //         // Process and set the stats state
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchStats();
    // }, []);

    return (
        <div className="h-[700px] w-[700px] rounded-lg border-4 border-lime-600 bg-gray-50 m-8 p-4">
            <h4 className="mb-4 text-sm font-medium leading-none text-zinc-900">Habit Stats</h4>
            {stats.map((stat) => (
                <div key={stat.id}>
                    <div className="text-sm text-zinc-900">
                        {stat.label}: {stat.value}
                    </div>
                    <Separator className="my-2"/>
                </div>
            ))}
        </div>
    )
}