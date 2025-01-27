import Image from "next/image";
import { Layout } from "@/components/layout";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
        <h1 className="text-6xl font-bold text-gray-900">
          Lafarge Innovation Challenge
        </h1>
        <p className="text-gray-600">Scan QR Code to participate</p>
        <div className="p-4 border-2 border-green-500 rounded-lg shadow-2xl shadow-green-200 cursor-pointer">
            <Image
              alt="QR Code"
              src="/barcode.png"
              width={150}
              height={150}
              className="w-48 h-48"
            />
        </div>
      </div>
    </Layout>
  );
}
