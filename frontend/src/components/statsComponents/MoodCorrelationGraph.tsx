import { Scatter } from 'react-chartjs-2';

interface MoodCorrelationGraphProps {
    data: { x: number; y: number }[];
}
export default function MoodCorrelationGraph ({ data }: MoodCorrelationGraphProps){
  const chartData = {
    datasets: [
      {
        label: 'Habit Completion vs Mood',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Habit Completion Rate',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Mood Score',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Mood Correlation</h2>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

