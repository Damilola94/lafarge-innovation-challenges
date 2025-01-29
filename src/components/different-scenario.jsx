import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScenariosPage() {
  const scenarios = [
    {
      id: 1,
      title: "Square Cement ",
      description:
        "Square Cement had an outstanding 2024, setting new industry records in the cement and building solutions sector. By leveraging operational efficiency, sustainability, and innovation, the company solidified its market position...",
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Lafarge Innovation Challenge
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="flex flex-col">
              <CardHeader>
                <CardContent>
                  <h3 className="text-lg font-bold mb-2 text-black">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-600">{scenario.description}</p>
                </CardContent>
              </CardHeader>

              <CardFooter className="mt-auto">
                <Link
                  href={`/dashboard/${scenario.id}`}
                  passHref
                  className="w-full"
                >
                  <Button className="w-full bg-[#00A651] hover:bg-[#008c44] text-white">
                    Start Challenge
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
