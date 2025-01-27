"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BASE_URL = "https://lafarge-quiz.onrender.com";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/leaderboard`);
        const data = await response.json();
        console.log(data, "leaderboard");

        const sortedLeaderboard = data.leaderboard.sort((a, b) => parseInt(b.score) - parseInt(a.score));
        setLeaderboard(sortedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <img src="/logo.png" alt="Lafarge Logo" className="mx-auto mb-4" width="100" height="70" />
        <h1 className="text-2xl font-bold">Pushing Boundaries with Innovation & Excellence</h1>
      </header>

      <div>
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Initials</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard?.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.initials}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
