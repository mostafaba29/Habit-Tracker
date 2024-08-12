import { Pie } from 'react-chartjs-2';

interface HabitCategoryBreakdownProps {
    data: { category: string; count: number }[];
}
export default function HabitCategoryBreakdown ({ data }: HabitCategoryBreakdownProps){
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        data: data.map(item => item.count),
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
      <h2 className="text-xl font-bold mb-4">Habit Category Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
};
