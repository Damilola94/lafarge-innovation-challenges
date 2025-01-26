import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const leaderboardData = [
  {
    position: "1st",
    team: "Team EcoBuilders",
    score: "90,100",
    scenarios: "5/5",
    badge: "Sustainability Champion",
  },
  {
    position: "2nd",
    team: "Team EcoBuilders",
    score: "90,100",
    scenarios: "5/5",
    badge: "Sustainability Champion",
  },
  {
    position: "3rd",
    team: "Team EcoBuilders",
    score: "90,100",
    scenarios: "5/5",
    badge: "Sustainability Champion",
  },
  {
    position: "4th",
    team: "Team EcoBuilders",
    score: "90,100",
    scenarios: "5/5",
    badge: "Sustainability Champion",
  },
];

export function Leaderboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-black">Leaderboard</h1>
      <Table className="px-32">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-black"></TableHead>
            <TableHead className="text-black">TEAM NAME</TableHead>
            <TableHead className="text-black">SCORE</TableHead>
            <TableHead className="text-black">SCENARIOS SOLVED</TableHead>
            <TableHead className="text-black">BADGE EARNED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.position}>
              <TableCell className="text-black">{entry.position}</TableCell>
              <TableCell className="text-black">{entry.team}</TableCell>
              <TableCell className="text-black">{entry.score}</TableCell>
              <TableCell className="text-black">{entry.scenarios}</TableCell>
              <TableCell className="text-black">{entry.badge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
