import { Doughnut } from 'react-chartjs-2';

interface TimeInvestedChartProps {
    data: { habit: string; timeInvested: number }[]
}
export default function TimeInvestedChart ({ data }: TimeInvestedChartProps){
  const chartData = {
    labels: data.map(item => item.habit),
    datasets: [
      {
        data: data.map(item => item.timeInvested),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Time Invested</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

