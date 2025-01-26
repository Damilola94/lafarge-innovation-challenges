"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Timer } from "../ui/timer";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Challenge() {
  const [values, setValues] = useState({
    clinker: 65,
    limestone: 31,
    gypsum: 4,
  });
  const [metrics, setMetrics] = useState({
    budget: 36.05,
    co2Emissions: 325,
  });
  const [innovations, setInnovations] = useState({
    "Eco-Boost: Reduces CO₂ emissions by 5% (+$3/ton)": {
      selected: false,
      points: 3,
    },
    "Durability Surge: Adds crack resistance (+$6/ton))": {
      selected: false,
      points: 6,
    },
    "Green Blend: Promotes eco-friendly CDM or Calcined Clay (+$4/ton)": {
      selected: false,
      points: 4,
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [belowThreshold, setBelowThreshold] = useState({
    clinker: false,
    limestone: false,
  });
  const [prevClinkerValue, setPrevClinkerValue] = useState(65);
  const [showExceedAlert, setShowExceedAlert] = useState(false);

  const UNIT_PRICES = {
    clinker: 50,
    limestone: 5,
    gypsum: 50,
  };
  const CLINKER_CO2_PER_PERCENT = 10;
  const MAX_BUDGET = 47;
  const MAX_CO2 = 350;

  useEffect(() => {
    calculateMetrics();
  }, [values, innovations]);

  const calculateMetrics = () => {
    let newBudget = 0;

    let newCO2 = 325;

    if (values.clinker > prevClinkerValue) {
      newCO2 += 10;
    } else if (values.clinker < prevClinkerValue) {
      newCO2 -= 10;
    }
    setPrevClinkerValue(values.clinker);

    newCO2 += values.clinker * CLINKER_CO2_PER_PERCENT;

    newBudget += (values.clinker / 100) * UNIT_PRICES.clinker;
    newBudget += (values.limestone / 100) * UNIT_PRICES.limestone;
    newBudget += (values.gypsum / 100) * UNIT_PRICES.gypsum;

    Object.entries(innovations).forEach(([key, { selected, points }]) => {
      if (selected) {
        newBudget += points;
      }
    });

    const exceededBudget = newBudget > MAX_BUDGET;
    const exceededCO2 = newCO2 > MAX_CO2;

    if (exceededBudget) {
      setAlertMessage(
        `Warning: You are exceeding the recommended limits.\n${
          exceededBudget
            ? `Budget: $${newBudget.toFixed(2)} > $${MAX_BUDGET}\n`
            : ""
        }${exceededCO2 ? `CO2: ${newCO2.toFixed(0)}kg > ${MAX_CO2}kg.` : ""}`
      );
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }

    setMetrics({
      budget: newBudget,
      co2Emissions: newCO2,
    });
  };

  const calculatePoints = () => {
    let points = 0;

    points += values.clinker + values.limestone + values.gypsum;

    console.log(values.clinker, values.limestone, values.gypsum);

    Object.entries(innovations).forEach(
      ([key, { selected, points: innovationPoints }]) => {
        console.log(key, selected, innovationPoints);
        if (selected) points += innovationPoints;
      }
    );

    return points;
  };

  const handleNextClick = () => {
    const points = calculatePoints();
    setTotalPoints(points);
    setIsModalOpen(true);
  };

  const handleSliderChange = (key, newValue) => {
    const totalAvailable = 96;
    const threshold = key === "clinker" ? 64 : 30;

    if (newValue < threshold) {
      setShowExceedAlert(!showExceedAlert);
      setBelowThreshold((prev) => ({ ...prev, [key]: true }));
    } else if (newValue >= threshold && belowThreshold[key]) {
      setBelowThreshold((prev) => ({ ...prev, [key]: false }));
    }

    if (key === "clinker") {
      setValues((prev) => ({
        ...prev,
        clinker: newValue,
        limestone: totalAvailable - newValue,
      }));
    } else if (key === "limestone") {
      setValues((prev) => ({
        ...prev,
        limestone: newValue,
        clinker: totalAvailable - newValue,
      }));
    }
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Timer />
      <div className="w-full grid md:grid-cols-[0.7fr_0.3fr] gap-8 p-16">
        <div className="w-full md:col-span-1">
          <Card className="p-6">
            <div className="w-full space-y-8">
              <div>
                <div className="p-1 px-2 rounded-2xl w-fit bg-[#7D7CD61A]">
                  <span className="text-xs text-[#7D7CD6]">
                    Dynamic Scenario 2: Green Urban Development
                  </span>
                </div>
                <h1 className="text-3xl font-bold mt-2">
                  Develop a sustainable solution for urban housing with a strong
                  focus on reducing CO₂ emissions and eco-friendly materials.
                </h1>
              </div>

              <div className="space-y-6">
                {Object.entries(values).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="capitalize flex items-center space-x-2">
                        <Image
                          src={`/${key}.png`}
                          alt={`${key} icon`}
                          width={30}
                          height={30}
                          className="inline-block"
                        />
                        <span>{key}</span>
                      </span>
                      <span>{value}%</span>
                    </div>
                    {key === "gypsum" ? (
                      <div className="bg-green-600 rounded h-2"></div>
                    ) : (
                      <Slider
                        value={[value]}
                        onValueChange={(newValue) =>
                          handleSliderChange(key, newValue[0])
                        }
                        max={key === "clinker" ? 96 : 96}
                        min={0}
                        step={1}
                        className={
                          belowThreshold[key]
                            ? "bg-red-500 rounded"
                            : "bg-green-600 rounded"
                        }
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
                {Object.entries(innovations).map(([key, { selected }]) => (
                  <div key={key} className="flex items-center space-x-4">
                    <Checkbox
                      id={key}
                      checked={selected}
                      onCheckedChange={(checked) =>
                        setInnovations((prev) => ({
                          ...prev,
                          [key]: {
                            ...prev[key],
                            selected: checked,
                          },
                        }))
                      }
                    />
                    <label htmlFor={key} className="flex flex-col">
                      <span>
                        <span className="font-bold">{key.split(":")[0]}</span>
                        {key.includes(":") &&
                          `:${key.split(":").slice(1).join(":")}`}
                      </span>
                    </label>
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
                <p className="text-sm text-gray-600">≤ ${MAX_BUDGET}/ton</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Constraints</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CO₂ emissions ≤ {MAX_CO2}kg/ton</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">Key Focus Areas</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>● Sustainability</li>
                  <li>● Innovation </li>
                  <li>● Cost Efficiency</li>
                </ul>
              </div>
            </div>
          </Card>
          <Card className="p-6 mt-4">
            <h3 className="font-bold text-xl mb-4 border-b pb-3">
              Input Metrics
            </h3>
            <div className="space-x-6 flex justify-between items-center">
              <div className="border-r pr-14">
                <h4 className="text-xs font-bold mb-2">Budget</h4>
                <p
                  className={`text-lg font-bold ${
                    metrics.budget > MAX_BUDGET ? "text-red-600" : "text-black"
                  }`}
                >
                  ${metrics.budget.toFixed(2)}/ton
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold mb-2">CO₂ Emissions</h4>
                <p
                  className={`text-lg font-bold ${
                    metrics.co2Emissions > MAX_CO2
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  {Math.round(metrics.co2Emissions)}Kg
                </p>
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

        {showAlert && (
          <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 white-space-pre-line">
            <Alert className="w-96 bg-white mt-10">
              <AlertTitle className="text-lg font-bold mb-5">
                Warning
              </AlertTitle>
              <AlertDescription className="white-space-pre-line">
                {alertMessage ||
                  "You are going below the recommended threshold."}
                Would you like to continue?
                <Button
                  onClick={handleAlertConfirm}
                  className="w-full bg-green-600 mt-5"
                >
                  OK
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {showExceedAlert && (
          <div className="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 white-space-pre-line">
            <Alert className="w-96 bg-white mt-10">
              <AlertTitle className="text-lg font-bold mb-5">
                Warning
              </AlertTitle>
              <AlertDescription className="white-space-pre-line">
                {"You are going below the recommended threshold."}
                Would you like to continue?
                <Button
                  onClick={() => {
                    setShowExceedAlert(!showExceedAlert);
                  }}
                  className="w-full bg-green-600 mt-5"
                >
                  OK
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
}
