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
      <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
      <Table className="px-32">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24"></TableHead>
            <TableHead>TEAM NAME</TableHead>
            <TableHead>SCORE</TableHead>
            <TableHead>SCENARIOS SOLVED</TableHead>
            <TableHead>BADGE EARNED</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry) => (
            <TableRow key={entry.position}>
              <TableCell>{entry.position}</TableCell>
              <TableCell>{entry.team}</TableCell>
              <TableCell>{entry.score}</TableCell>
              <TableCell>{entry.scenarios}</TableCell>
              <TableCell>{entry.badge}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
