
interface TopPerformingHabitsCardProps {
    habits: { name: string; completionRate: number }[];
}
export default function TopPerformingHabitsCard ({ habits }: TopPerformingHabitsCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Top Performing Habits</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index} className="mb-2">
            <span className="font-semibold">{habit.name}</span>: {habit.completionRate}%
          </li>
        ))}
      </ul>
    </div>
  );
};
