"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/data";

export default function Scenario() {
  const params = useParams();
  const scenarioId = parseInt(params.dashboard, 10);

  const scenario = mockData.find((item) => item.id === scenarioId);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center my-10">
        Lafarge Innovation Challenge - Scenario {scenarioId}
      </h1>
        <Card className="max-w-md mx-auto border-[#00A651]">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-gray-600 font-bold">Scenario Overview</p>
                <p className="text-gray-700 text-justify">{scenario.overview}</p>
              </div>
              <div className="pt-4">
                <Link
                  href={`/challenges-${scenarioId}`}
                  passHref
                  className="w-full"
                >
                  <Button className="w-full bg-[#00A651] hover:bg-[#008c44] text-white py-6 text-lg rounded-md">
                    Begin Challenge
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
    
    </main>
  );
}
