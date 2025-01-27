import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function QuizQuestions({ onSubmit, questions }) {
  const [answers, setAnswers] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(answers)
  }

  const allQuestionsAnswered = questions.every((question) => answers[question.id])

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((q) => (
        <div key={q.id} className="space-y-4">
          <h3 className="text-lg font-semibold">{q.question}</h3>
          <RadioGroup
            onValueChange={(value) => setAnswers((prev) => ({ ...prev, [q.id]: value }))}
            value={answers[q.id]}
          >
            {q.options.map((option, index) => (
              <div key={index} className="flex items-center space-y-4 space-x-2">
                <RadioGroupItem value={String(index + 1)} id={`q${q.id}-${index}`} />
                <Label htmlFor={`q${q.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
      <Button type="submit" className="w-full bg-green-600 text-white" disabled={!allQuestionsAnswered}>
        Submit Quiz
      </Button>
    </form>
  )
}

