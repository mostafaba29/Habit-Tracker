
interface CompletionRateCardProps {
    rate: number;
}
export default function CompletionRateCard ({ rate }: CompletionRateCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Completion Rate</h2>
      <div className="text-4xl font-bold text-blue-600">{rate}%</div>
    </div>
  );
};

