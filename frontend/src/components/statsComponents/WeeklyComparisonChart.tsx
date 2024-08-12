import { Bar } from 'react-chartjs-2';

interface WeeklyComparisonChartProps {
    data: { thisWeek: number[]; lastWeek: number[] };
}
export default function  WeeklyComparisonChart ({ data }: WeeklyComparisonChartProps) {
  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'This Week',
        data: data.thisWeek,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Last Week',
        data: data.lastWeek,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Weekly Comparison</h2>
      <Bar data={chartData} />
    </div>
  );
};

