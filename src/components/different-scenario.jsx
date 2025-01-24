import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ScenariosPage() {
  const scenarios = [
    { id: 1, title: "Flood-Resilient Housing", description: "Design a cement solution for flood-prone regions..." },
    { id: 2, title: "Green Urban Development", description: "Develop a sustainable solution for urban housing with a strong focus on reducing CO₂..." },
    { id: 3, title: "High-Strength Industrial Project", description: "Develop a product that prioritize high strength for..." },
    { id: 4, title: "Low-Cost Affordable Housing", description: "Create a cost-effective solution for affordable housing..." },
    { id: 5, title: "Extreme Climate Durability", description: "Develop a durable cement solution for extreme climate conditions..." },
  ]

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lafarge Innovation Scenarios</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Scenario {scenario.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-medium mb-2">{scenario.title}</h3>
                <p className="text-gray-600">{scenario.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={`/dashboard/${scenario.id}`} passHref className="w-full">
                  <Button className="w-full bg-[#00A651] hover:bg-[#008c44] text-white">Start Scenario -  {scenario.id}</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

