import Link from "next/link";

export default function Group() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Link href="/challenges-1">
        <div className="border-2 border-green-500 rounded-lg p-4 max-w-lg w-full text-center shadow-2xl shadow-green-200 cursor-pointer">
          <p className="text-gray-700 text-xl mb-4">
            You&apos;ve been drafted to
          </p>
          <h1 className="text-[#00A651] text-8xl font-bold">Group 2</h1>
        </div>
      </Link>
    </div>
  );
}
