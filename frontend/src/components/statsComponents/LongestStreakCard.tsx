
interface LongestStreakCardProps {
    habit: string;
    streak: number
}
export default function LongestStreakCard ({ habit, streak }: LongestStreakCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Longest Streak</h2>
      <p className="text-lg">{habit}</p>
      <p className="text-3xl font-bold text-green-600">{streak} days</p>
    </div>
  );
};

