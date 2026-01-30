"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Task {
  text: string;
  done: boolean;
}

export default function SecondBrainLLM() {
  // Explicitly type the state arrays
  const [notes, setNotes] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");

  const handleCommand = () => {
    if (input.toLowerCase().startsWith("note:")) {
      setNotes([...notes, input.replace("note:", "").trim()]);
    } else if (input.toLowerCase().startsWith("task:")) {
      setTasks([
        ...tasks,
        { text: input.replace("task:", "").trim(), done: false },
      ]);
    }
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 grid gap-6">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold"
      >
        SecondBrainLLM — AI Second Brain
      </motion.h1>

      <Card className="bg-zinc-900">
        <CardContent className="p-4 grid gap-2">
          <p className="text-sm text-zinc-400">Commands: note: , task:</p>
          <Textarea
            placeholder="SecondBrainLLM, remember this…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleCommand}>Execute</Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-zinc-900">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Notes</h2>
            {notes.map((n, i) => (
              <p key={i} className="text-sm text-zinc-300">
                • {n}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Tasks</h2>
            {tasks.map((t, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>{t.text}</span>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() =>
                    setTasks(
                      tasks.map((x, idx) =>
                        idx === i ? { ...x, done: !x.done } : x,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
