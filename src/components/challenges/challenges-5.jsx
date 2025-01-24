"use client";
import Link from "next/link";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Challenge() {
  const [values, setValues] = useState({
    clinker: 55,
    limestone: 31,
    gypsum: 4,
  });
  const [innovations, setInnovations] = useState({
    "Climate Resilience": false,
    Durability: false,
    Sustainability: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const calculatePoints = () => {
    let points = 0;
    points += values.clinker + values.limestone + values.gypsum;
    Object.values(innovations).forEach((value) => {
      if (value) points += 50;
    });
    return points;
  };

  const handleNextClick = () => {
    const points = calculatePoints();
    setTotalPoints(points);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full grid md:grid-cols-[0.7fr_0.3fr] gap-8 p-16">
      <div className="w-full md:col-span-1">
        <Card className="p-6">
          <div className=" w-full space-y-8">
            <div>
              <div className="p-1 px-2 rounded-2xl w-fit bg-[#7D7CD61A]">
                <span className="text-xs text-[#7D7CD6]">
                  {" "}
                  Dynamic Scenario 5: Extreme Climate Durability
                </span>
              </div>
              <h1 className="text-3xl font-bold mt-2">
                Develop a durable cement solution for extreme climate conditions
                while minimizing environmental impact.
              </h1>
            </div>

            <div className="space-y-6">
              {Object.entries(values).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    <span>{value}%</span>
                  </div>
                  {key === "gypsum" ? (
                    <div className="bg-green-600 rounded h-2"></div>
                  ) : (
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) =>
                        setValues((prev) => ({ ...prev, [key]: newValue[0] }))
                      }
                      max={100}
                      min={65}
                      step={1}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 mt-4">
          <div>
            <h3 className="font-bold mb-4">Innovation</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(innovations).map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={item}
                    checked={innovations[item]}
                    onCheckedChange={(checked) =>
                      setInnovations((prev) => ({
                        ...prev,
                        [item]: checked === true,
                      }))
                    }
                  />
                  <label htmlFor={item}>{item}</label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleNextClick}
          >
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="md:col-span-1">
        <Card className="p-6">
          <h3 className="font-bold text-xl mb-4">Considerations</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-2">Budget</h4>
              <p className="text-sm text-gray-600">≤ $45/ton</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Constraints</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Include waterproofing</li>
                <li>• CO₂ emissions ≤ 550kg/ton</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Key Focus Areas</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>
                  ● Smart-Blend: Required for extreme durability (+$3/ton).
                </li>
                <li>● Eco-Boost: Reduces CO₂ emissions by 5% (+$3/ton).</li>
                <li>
                  ● Extreme Weather Shield: Adds resilience to temperature
                  extremes (+$6/ton).
                </li>
              </ul>
            </div>
          </div>
        </Card>
        <Card className="p-6 mt-4">
          <h3 className="font-bold text-xl mb-4">Input</h3>
          <div className="space-x-6 flex justify-between">
            <div>
              <h4 className="font-bold mb-2">Budget</h4>
              <p className="text-sm text-gray-600">≤ $45/ton</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Constraints</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="max-w-32">• Include waterproofing</li>
                <li className="max-w-32">• CO₂ emissions ≤ 550kg/ton</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your solution?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-lg font-semibold">
              Total Points Generated: {totalPoints}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Link href="/congratulations">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Confirm Submission
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
