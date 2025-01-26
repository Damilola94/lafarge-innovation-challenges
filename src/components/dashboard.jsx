"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockData } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Timer } from "./ui/timer";

export default function Scenario() {
  const params = useParams();
  const scenarioId = parseInt(params.dashboard, 10);

  const scenario = mockData.find((item) => item.id === scenarioId);

  return (
    <main className="container mx-auto px-4 py-8">
      <Timer />
      <h1 className="text-4xl font-bold text-center my-10 text-black">
        Lafarge Innovation Challenge - Scenario {scenarioId}
      </h1>
      <Card className="max-w-4xl mx-auto border-[#00A651]">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600 font-bold">Scenario Overview</p>
              <p className="text-gray-700 text-justify mb-4">
                {scenario.overview}
              </p>
              <p className="text-gray-600 font-bold">Objective</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.objective}
              </p>
              <p className="text-gray-600 font-bold">Key Constraints</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.keyConstraints}
              </p>
              <p className="text-gray-600 font-bold">Key Focus Areas</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.keyFocus}
              </p>
              <p className="text-gray-600 font-bold">Call-to-Action</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.callToAction}
              </p>
            </div>
            <div className="pt-4">
              <Link
                href={`/challenges-${scenarioId}`}
                passHref
                className="w-full"
              >
                <Button className="w-full bg-[#00A651] hover:bg-[#008c44] text-white py-6 text-lg rounded-md">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
