import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UserInitials({ onStart }) {
  const [initials, setInitials] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initials.trim()) {
      onStart(initials.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto text-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter your initials to start the quiz
      </h2>
      <Input
        type="text"
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        placeholder="Your initials"
        maxLength={3}
        className="mb-4"
        required
      />
      <Button type="submit" className="w-fit text-white bg-green-600 text-center mx-auto">
        Start Quiz
      </Button>
    </form>
  );
}
