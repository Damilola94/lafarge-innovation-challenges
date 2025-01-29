"use client";

import { useEffect, useState } from "react";
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
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/v1/leaderboard/989`);
        const data = await response.json();

        const sortedLeaderboard = data.data.sort(
          (a, b) => parseInt(b.position) - parseInt(a.position)
        );
        setLeaderboard(sortedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  console.log(leaderboard, "leaderboard");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-center text-black">Leaderboard</h1>
      <Table className="px-32">
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className="w-24 text-black font-bold"></TableHead>
            <TableHead className="text-black font-bold">TEAM NAME</TableHead>
            <TableHead className="text-black font-bold">TEAM NO.</TableHead>
            <TableHead className="text-black font-bold">MARGIN</TableHead>
            <TableHead className="text-black font-bold">
              CO2 EMISSIONS
            </TableHead>
            <TableHead className="text-black font-bold">COST</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((entry, index) => (
            <TableRow key={index}>
              <TableCell className="text-black">
                {`${entry.position}th` || `${index + 1}th`}
              </TableCell>
              <TableCell className="text-black">{entry.teamName.toUpperCase()}</TableCell>
              <TableCell className="text-black">{entry.teamNo}</TableCell>
              <TableCell className="text-black">{entry.margin}</TableCell>
              <TableCell className="text-black">{entry.constraint}</TableCell>
              <TableCell className="text-black">{entry.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
