// Updated LessonForm with quiz metadata fields inside each lesson quiz section.
// --- Full component below ---

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, PlusCircle } from "lucide-react";
import { CardContent, CardHeader } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type QuizType = "mcq" | "written";

interface LessonFormProps {
  onLessonsChange?: (lessons: Lesson[]) => void;
  type?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoFile?: File | null;
  videoUrl?: string;
  quiz?: Quiz;
}

export interface Quiz {
  title: string;
  description: string;
  total_marks: number;
  passing_marks: number;
  duration_minutes: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  type: QuizType;
  question: string;
  mark: number; // NEW FIELD
  options?: string[];
  answer: string;
}

export default function LessonForm({ onLessonsChange, type }: LessonFormProps) {

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);

  // quiz dialog open tracks which lesson's "create quiz" dialog is open
  const [openCreateQuizFor, setOpenCreateQuizFor] = useState<string | null>(null);
  // question dialog tracks which lesson's "add question" modal is open
  const [openQuestionFor, setOpenQuestionFor] = useState<string | null>(null);

  const [newLesson, setNewLesson] = useState({ title: "", description: "" });

  // quizMeta is reused as the "create quiz" form values; it's reset after save
  const [quizMeta, setQuizMeta] = useState({
    title: "",
    description: "",
    total_marks: 0,
    passing_marks: 0,
    duration_minutes: 0,
  });

  const [newQuestion, setNewQuestion] = useState<QuizQuestion>({
    type: "mcq",
    question: "",
    options: [""],
    answer: "",
    mark: 0,
  });

  useEffect(() => {
    if (onLessonsChange) onLessonsChange(lessons);
  }, [lessons, onLessonsChange]);

  const addLesson = () => {
    if (!newLesson.title.trim()) return;
    setLessons((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: newLesson.title,
        description: newLesson.description,
        quiz: undefined,
        videoFile: null,
        videoUrl: "",
      },
    ]);
    setNewLesson({ title: "", description: "" });
    setOpenLessonDialog(false);
  };

  const removeLesson = (id: string) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  const updateLessonVideo = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, videoFile: file, videoUrl: url } : l))
    );
  };

  const saveQuizToLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    if (lesson.quiz) {
      alert("This lesson already has a quiz.");
      return;
    }

    // basic validation
    if (!quizMeta.title.trim()) {
      alert("Quiz title is required.");
      return;
    }

    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? {
              ...l,
              quiz: {
                title: quizMeta.title,
                description: quizMeta.description,
                total_marks: Number(quizMeta.total_marks) || 0,
                passing_marks: Number(quizMeta.passing_marks) || 0,
                duration_minutes: Number(quizMeta.duration_minutes) || 0,
                questions: [],
              },
            }
          : l
      )
    );

    // reset quizMeta and close create quiz dialog
    setQuizMeta({ title: "", description: "", total_marks: 0, passing_marks: 0, duration_minutes: 0 });
    setOpenCreateQuizFor(null);
  };

  const addQuestion = (lessonId: string) => {
    if (!newQuestion.question.trim()) return;
    if (newQuestion.type === "mcq") {
      // ensure at least 2 options and an answer selected
      const ops = newQuestion.options || [];
      if (ops.length < 2) {
        alert("Add at least two options for MCQ.");
        return;
      }
      if (!newQuestion.answer) {
        alert("Select correct answer for MCQ.");
        return;
      }
    }

    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              quiz: {
                ...lesson.quiz!,
                questions: [...lesson.quiz!.questions, newQuestion],
              },
            }
          : lesson
      )
    );

    // reset newQuestion and close dialog
    setNewQuestion({ type: "mcq", question: "", options: [""], answer: "", mark: 0 });
    setOpenQuestionFor(null);
  };

  const removeQuestion = (lessonId: string, index: number) => {
    setLessons((prev) =>
      prev.map((l) =>
        l.id === lessonId
          ? {
              ...l,
              quiz: {
                ...l.quiz!,
                questions: l.quiz!.questions.filter((_, i) => i !== index),
              },
            }
          : l
      )
    );
  };

  const updateOption = (idx: number, value: string) => {
    setNewQuestion((prev) => {
      const ops = [...(prev.options || [])];
      ops[idx] = value;
      return { ...prev, options: ops };
    });
  };

  const addOption = () => {
    setNewQuestion((prev) => ({ ...prev, options: [...(prev.options || []), ""] }));
  };

  const removeOption = (idx: number) => {
    setNewQuestion((prev) => ({ ...prev, options: prev.options?.filter((_, i) => i !== idx) }));
  };

  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Lesson Builder</h1>

        <Dialog open={openLessonDialog} onOpenChange={setOpenLessonDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" /> Add Lesson
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Lesson</DialogTitle>
            </DialogHeader>

            <Label>Lesson Title</Label>
            <Input value={newLesson.title} onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })} />

            <Label>Description</Label>
            <Textarea value={newLesson.description} onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })} />

            <DialogFooter>
              <Button onClick={addLesson}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <Accordion type="multiple" className="w-full">
          {lessons.map((lesson) => (
            <AccordionItem key={lesson.id} value={lesson.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4">
                  <p className="font-bold">{lesson.title}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 border rounded space-y-3 mt-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">{lesson.title}</p>
                      <p className="text-sm text-gray-600">{lesson.description}</p>
                    </div>

                    <Button variant="destructive" size="icon" onClick={() => removeLesson(lesson.id)}>
                      <Trash2 />
                    </Button>
                  </div>

                  {type === "recorded" && (
                    <>
                      <Input type="file" accept="video/*" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) updateLessonVideo(lesson.id, f);
                      }} />
                      {lesson.videoUrl && <video src={lesson.videoUrl} controls className="rounded w-full max-h-64" />}
                    </>
                  )}

                  {/* Quiz creation section */}
                  {!lesson.quiz ? (
                    <>
                      <Button variant="outline" type="button" onClick={() => setOpenCreateQuizFor(lesson.id)}>Add Quiz</Button>

                      <Dialog open={openCreateQuizFor === lesson.id} onOpenChange={(o) => setOpenCreateQuizFor(o ? lesson.id : null)}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Quiz</DialogTitle>
                          </DialogHeader>

                          <Label>Quiz Title</Label>
                          <Input value={quizMeta.title} onChange={(e) => setQuizMeta({ ...quizMeta, title: e.target.value })} />

                          <Label>Description</Label>
                          <Textarea value={quizMeta.description} onChange={(e) => setQuizMeta({ ...quizMeta, description: e.target.value })} />

                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <Label className="mb-3">Total Marks</Label>
                              <Input type="number" value={quizMeta.total_marks} onChange={(e) => setQuizMeta({ ...quizMeta, total_marks: Number(e.target.value) })} />
                            </div>
                            <div>
                              <Label className="mb-3">Passing Marks</Label>
                              <Input type="number" value={quizMeta.passing_marks} onChange={(e) => setQuizMeta({ ...quizMeta, passing_marks: Number(e.target.value) })} />
                            </div>
                            <div>
                              <Label className="mb-3">Duration (Minutes)</Label>
                              <Input type="number" value={quizMeta.duration_minutes} onChange={(e) => setQuizMeta({ ...quizMeta, duration_minutes: Number(e.target.value) })} />
                            </div>
                          </div>

                          <DialogFooter>
                            <Button type="button" onClick={() => saveQuizToLesson(lesson.id)}>Save Quiz</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-lg">{lesson.quiz.title}</p>
                      <p className="text-sm">{lesson.quiz.description}</p>
                      <p>Total Marks: {lesson.quiz.total_marks}</p>
                      <p>Passing Marks: {lesson.quiz.passing_marks}</p>
                      <p>Duration: {lesson.quiz.duration_minutes} minutes</p>

                      {lesson.quiz.questions.length === 0 ? (
                        <p className="italic text-gray-500">No questions added.</p>
                      ) : (
                        lesson.quiz.questions.map((q, i) => (
                          <div key={i} className="border p-2 rounded flex justify-between">
                            <div>
                              <p>{q.type.toUpperCase()}: {q.question}</p>
                              <p className="font-bold">Marks: {q.mark}</p>
                              {q.type === "mcq" ? (
                                <>
                                  <ul className="list-disc pl-5 text-sm">{q.options?.map((o, z) => (<li key={z}>{o}</li>))}</ul>
                                  <p className="font-bold text-green-700">Answer: {q.answer}</p>
                                </>
                              ) : (
                                <p className="italic">Expected: {q.answer}</p>
                              )}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeQuestion(lesson.id, i)}>
                              <Trash2 className="text-red-500" />
                            </Button>
                          </div>
                        ))
                      )}

                      <div className="mt-2">
                        <Button type="button" variant="outline" onClick={() => setOpenQuestionFor(lesson.id)}>
                          <PlusCircle className="mr-2" /> Add Question
                        </Button>

                        <Dialog open={openQuestionFor === lesson.id} onOpenChange={(o) => setOpenQuestionFor(o ? lesson.id : null)}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Question</DialogTitle>
                            </DialogHeader>

                            <Label>Type</Label>
                            <Select value={newQuestion.type} onValueChange={(v) => setNewQuestion({ ...newQuestion, type: v as QuizType, options: v === "mcq" ? ["",""] : undefined, answer: "" })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mcq">MCQ</SelectItem>
                                {type === 'live' && <SelectItem value="written">Written</SelectItem>}
                              </SelectContent>
                            </Select>

                            <Label>Question</Label>
                            <Input value={newQuestion.question} onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })} />

                            <Label>Marks</Label>
                            <Input type="number" value={newQuestion.mark} onChange={(e) => setNewQuestion({ ...newQuestion, mark: Number(e.target.value) })} />

                            {newQuestion.type === "mcq" && (
                              <>
                                <div className="space-y-2">
                                  {newQuestion.options?.map((op, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                      <Input value={op} onChange={(e) => updateOption(idx, e.target.value)} placeholder={`Option ${idx + 1}`} />
                                      <Button variant="ghost" size="icon" onClick={() => removeOption(idx)}>
                                        <Trash2 className="text-red-500" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>

                                <div className="grid grid-cols-1 gap-2 mt-2">
                                  <Button type="button" variant="outline" onClick={addOption}>+ Add Option</Button>

                                  <div className="grid grid-cols-1 mt-3">
                                    <Label className="mb-3">Correct Answer</Label>
                                    <Select value={(() => {
                                      const idx = newQuestion.options ? newQuestion.options.indexOf(newQuestion.answer) : -1;
                                      return idx >= 0 ? String(idx) : "";
                                    })()} onValueChange={(index) => {
                                      const i = Number(index);
                                      setNewQuestion((prev) => ({ ...prev, answer: prev.options ? prev.options[i] : "" }));
                                    }}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select answer" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {newQuestion.options?.map((opt, i) => (
                                          <SelectItem key={i} value={String(i)}>{opt || `Option ${i + 1}`}</SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </>
                            )}

                            {newQuestion.type === "written" && (
                              <>
                                <Label>Expected Answer</Label>
                                <Textarea value={newQuestion.answer} onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })} />
                              </>
                            )}

                            <DialogFooter>
                              <Button onClick={() => addQuestion(lesson.id)}>Save Question</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </>
  );
}
