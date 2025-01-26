import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Congratulations({ points = 1226, correct = 4, total = 5 }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <h1 className="text-5xl font-bold">Congratulations!</h1>
      <p className="text-gray-600">
        You've completed the Lafarge Innovation Challenge
      </p>

      <div className="border-2 border-green-500 rounded-lg p-8 text-center shadow-2xl shadow-green-200 ">
        <div className="text-sm text-gray-600 mb-2">Your Points</div>
        <div className="text-6xl font-bold text-green-600">{points}</div>
        <div className="mt-4 text-gray-600">
          You got {correct} out of {total} questions correct
        </div>
      </div>

      {/* <Link href="/leaderboard">
        <Button variant="outline" className="mt-4 text-green-400">
          View Leaderboard
        </Button>
      </Link> */}
    </div>
  );
}
