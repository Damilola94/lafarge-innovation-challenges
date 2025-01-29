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
        Lafarge Innovation Challenge
      </h1>
      <Card className="max-w-4xl mx-auto border-[#00A651]">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600 font-bold">Background</p>
              <p className="text-gray-700 text-justify mb-4">
                {scenario.background}
              </p>
              <br />

              <p className="text-gray-600 font-bold">Strategic Objectives</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.objective}
              </p>
              <ul className="text-gray-700 text-justify mb-3">
                <li>
                  ● Be the Lowest-Cost Producer – Optimize material sourcing,
                  manufacturing efficiency, and supply chain processes to
                  deliver high-quality solutions at the most competitive cost.
                </li>
                <br />
                <li>
                  ● Leader in Sustainability & Decarbonization – Develop
                  low-carbon solutions and circular economy initiatives to
                  significantly reduce CO₂ emissions.
                </li>
                <br />
                <li>
                  ● Achieve Accelerated Growth & Profitability Through
                  Innovation – Leverage cutting-edge materials and digital
                  transformation to introduce innovative solutions for modern
                  construction needs.
                </li>
              </ul>
              <br />

              <p className="text-gray-600 font-bold">
                The Challenge: Flood-Resilient Housing
              </p>
              <ul className="text-gray-700 text-justify mb-3">
                <li>
                  ● <span className="font-bold">Cost Efficiency:</span> The
                  solution must not exceed $45 per ton.
                </li>
                <br />
                <li>
                  ● <span className="font-bold">Sustainability:</span> CO₂
                  emissions must be ≤ 550kg per ton.
                </li>
                <br />

                <li>
                  ● <span className="font-bold">Structural Resilience:</span>{" "}
                  The mix must provide high strength and waterproofing
                  properties to resist flood damage.
                </li>
                <br />
              </ul>

              <br />

              <p className="text-gray-600 font-bold">Innovation Elements</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.innovationElement}
              </p>
              <ul className="text-gray-700 text-justify mb-3">
                <li>
                  ●
                  <span className="font-bold"> Waterproofing Agent (+$5/ton):
                  </span> Enhances flood resistance by reducing water
                </li>
                <br />
                <li>
                  ● 
                  <span className="font-bold"> Eco-Boost Admixture (+$3/ton):
                  </span> Cuts CO₂ emissions by 5%.
                </li>
                <br />

                <li>
                  ● 
                  <span className="font-bold"> Durability Surge (+$6/ton):</span> Combine waterproofing and extra strength.
                </li>
                <br />
              </ul>

              <p className="text-gray-600 font-bold">Pricing</p>
              <p className="text-gray-700 text-justify mb-3">
                {scenario.pricing}
              </p>
            <br/>
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
