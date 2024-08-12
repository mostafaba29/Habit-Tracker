import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

interface DailyActivityHeatmapProps {
    data: { date: string; count: number }[];
}
export default function DailyActivityHeatmap ({ data }: DailyActivityHeatmapProps) {
  return (
    <></>
    // <div className="bg-white p-4 rounded-lg shadow">
    //   <h2 className="text-xl font-bold mb-4">Daily Activity Heatmap</h2>
    //   <CalendarHeatmap
    //     startDate={new Date(data[0].date)}
    //     endDate={new Date(data[data.length - 1].date)}
    //     values={data}
    //     classForValue={(value) => {
    //       if (!value) {
    //         return 'color-empty';
    //       }
    //       return `color-scale-${value.count}`;
    //     }}
    //   />
    // </div>
  );
};

