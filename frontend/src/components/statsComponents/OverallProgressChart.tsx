import { Line } from 'react-chartjs-2';

interface OverallProgressChartProps {
    data: { labels: string[]; values: number[] };
}
export default function OverallProgressChart ({ data }: OverallProgressChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Overall Progress',
        data: data.values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Overall Progress</h2>
      <Line data={chartData} />
    </div>
  );
};
