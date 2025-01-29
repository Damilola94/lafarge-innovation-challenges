"use client";

import { useState, useEffect } from "react";
import { UserInitials } from "./UserInitials";
import { QuizQuestions } from "./QuizQuestions";
import { toast } from "react-hot-toast";
import { questions } from "@/lib/quiz-data";
import { Loader } from "@/components/ui/loader";

const BASE_URL = "https://lafarge-quiz.onrender.com";

export default function Quiz() {
  const [userInitials, setUserInitials] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  const startQuiz = (initials) => {
    setUserInitials(initials);
    setQuizStarted(true);
  };

  const submitQuiz = async (answers) => {
    const allQuestionsAnswered = questions.every(
      (question) => answers[question.id]
    );
    if (!allQuestionsAnswered) {
      toast.error("Please answer all questions before submitting.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    try {
      const calculatedScore = questions.reduce((acc, question) => {
        return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
      }, 0);

      console.log(calculatedScore, "calculatedScore");

      const payload = {
        initials: userInitials,
        ipAddress: `${ipAddress} ${navigator.userAgent}`,
        score: calculatedScore,
        answers,
      };

      const response = await fetch(`${BASE_URL}/api/v1/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setScore(calculatedScore);
      setQuizCompleted(true);
      toast.success("Quiz submitted successfully!", {
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.", {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && <Loader />}
      <header className="text-center mb-8">
        <img
          src="/logo.png"
          alt="Lafarge Logo"
          className="mx-auto mb-4"
          width="100"
          height="70"
        />
        <h1 className="text-2xl font-bold">
          Pushing Boundaries with Innovation & Excellence
        </h1>
      </header>

      {!quizStarted && <UserInitials onStart={startQuiz} />}
      {quizStarted && !quizCompleted && (
        <QuizQuestions onSubmit={submitQuiz} questions={questions} />
      )}
      {quizCompleted && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Your Score</h2>
            <p className="text-4xl font-bold text-green-600">{score}</p>
          </div>
        </div>
      )}
    </div>
  );
}
