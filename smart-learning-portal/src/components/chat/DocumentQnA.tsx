import React, { useState } from "react";

export default function DocumentQnA({ summary }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, question }),
      });
      const data = await res.json();
      if (data.answer) setAnswer(data.answer);
      else setError(data.error || "No answer returned.");
    } catch (err) {
      setError("Failed to get answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-4 rounded-lg border bg-white dark:bg-black dark:text-blue-200">
      <h2 className="text-lg font-semibold mb-2">Ask a question about this document</h2>
      <form onSubmit={handleAsk} className="flex flex-col gap-2">
        <textarea
          className="border rounded p-2 min-h-[60px] dark:bg-black dark:text-blue-200"
          placeholder="Type your question..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn-primary px-4 py-2 rounded disabled:opacity-60"
          disabled={loading || !question.trim()}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="mt-4 p-3 rounded bg-blue-50 dark:bg-blue-900">
          <div className="font-semibold mb-1">Answer:</div>
          <div>{answer}</div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
    </div>
  );
}
