"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BASE_URL = "https://lafarge-challenge.onrender.com";

export function Leaderboard() {
  const params = useParams();
  const sessionId = parseInt(params.id);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/v1/leaderboard/${sessionId}`);
        const data = await response.json();
        const sortedLeaderboard = data.data.sort(
          (a, b) => parseInt(a.position) - parseInt(b.position)
        );
        setLeaderboard(sortedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const getOrdinalSuffix = (num) => {
    if (num === 11 || num === 12 || num === 13) return `${num}th`;
    const lastDigit = num % 10;
    switch (lastDigit) {
      case 1:
        return `${num}st`;
      case 2:
        return `${num}nd`;
      case 3:
        return `${num}rd`;
      default:
        return `${num}th`;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-black">Leaderboard</h1>
      <Table className="px-32">
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="w-24 text-black font-bold">POSITION</TableHead>
            <TableHead className="text-black font-bold">TEAM NAME</TableHead>
            <TableHead className="text-black font-bold">TEAM NO.</TableHead>
            <TableHead className="text-black font-bold">MARGIN</TableHead>
            <TableHead className="text-black font-bold">
              CO2 EMISSIONS
            </TableHead>
            <TableHead className="text-black font-bold">COST</TableHead>
            <TableHead className="text-black font-bold">TOTAL SCORE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="text-black">
                {getOrdinalSuffix(entry.position || index + 1)}
              </TableCell>
              <TableCell className="text-black">
                {entry.teamName.toUpperCase()}
              </TableCell>
              <TableCell className="text-black">{entry.teamNo}</TableCell>
              <TableCell className="text-black">{entry.margin}</TableCell>
              <TableCell className="text-black">{entry.constraint}</TableCell>
              <TableCell className="text-black">{entry.cost}</TableCell>
              <TableCell className="text-black">{entry.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
