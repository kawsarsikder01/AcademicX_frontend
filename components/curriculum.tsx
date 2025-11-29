'use client';

import { useState, Fragment } from "react";
import { toast } from "sonner";
import { PlayCircle, ChevronDown, Lock } from "lucide-react";

import { AdvancedLessonVideo } from "@/components/video-player";
import { getFile } from "@/lib/utils";
import QuizModal from "@/components/quiz-modal";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import { Course, quiz } from "./sections/CourseSection";

// ----------------------
// API Call for completing lesson
// ----------------------
async function completeLessonApi(payload: {
    lesson_id: string;
    total_marks: number;
    correct_questions: number[];
    answers: Record<number, any>;
}) {
    try {
        const res = await fetch("/api/lessons/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Failed to complete lesson");
        return res.json();
    } catch (err) {
        console.error(err);
        toast.error("Failed to submit lesson progress");
    }
}

// ----------------------
// Main Curriculum Component
// ----------------------
export default function Curriculum({ course }: { course: Course | null }) {

    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
    const [openQuizLesson, setOpenQuizLesson] = useState<string | null>(null);
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // ----------------------
    // Handle video completion
    // ----------------------
    const markLessonCompleted = async (lessonId: string, lessonQuiz?: quiz) => {
        if (!lessonQuiz) {
            // No quiz, complete immediately
            await completeLessonApi({
                lesson_id: lessonId,
                total_marks: 0,
                correct_questions: [],
                answers: {}
            });
            toast.success("Lesson completed!");
            setCompletedLessons(prev => prev.includes(lessonId) ? prev : [...prev, lessonId]);
        }
    };

    // ----------------------
    // Handle quiz submit
    // ----------------------
    const handleQuizSubmit = async (lessonId: string, lessonQuiz?: quiz) => {
        if (!lessonQuiz?.questions) return;

        const answers = selectedAnswers[lessonId] || {};
        let totalMarks = 0;
        const correctQuestions: number[] = [];

        // Ensure all questions answered
        const allAnswered = lessonQuiz.questions.every(q => answers[q.id] !== undefined && answers[q.id] !== "");
        if (!allAnswered) {
            toast.error("Please answer all questions before submitting!");
            return;
        }

        // Validate answers
        lessonQuiz.questions.forEach(q => {
            const studentAnswer = answers[q.id];
            const isCorrect = q.question_type === "mcq"
                ? studentAnswer === q.correct_answer
                : studentAnswer?.trim().toLowerCase() === q.correct_answer?.trim().toLowerCase();

            if (isCorrect) {
                totalMarks += q.marks ?? 1;
                correctQuestions.push(q.id);
            }
        });

        toast.success(`Quiz completed! Score: ${totalMarks}/${lessonQuiz.total_marks}`);

        // Complete lesson API
        await completeLessonApi({
            lesson_id: lessonId,
            total_marks: totalMarks,
            correct_questions: correctQuestions,
            answers
        });

        setCompletedLessons(prev => prev.includes(lessonId) ? prev : [...prev, lessonId]);
        setOpenQuizLesson(null);
    };

    // ----------------------
    // Render
    // ----------------------
    return (
        <TabsContent value="curriculum" className="mt-8">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>

                    <div className="space-y-4">
                        {course?.lessions?.map((lesson, index) => {
                            const lessonId = lesson.id.toString();
                            const videoSrc = getFile(lesson.files[0]?.file_path);

                            return (
                                <Fragment key={lesson.id}>
                                    <Collapsible className="border rounded-lg shadow-sm">

                                        {/* Lesson Header */}
                                        <CollapsibleTrigger className="w-full p-4 flex justify-between items-center hover:bg-muted/20 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <PlayCircle className="h-5 w-5 text-primary" />
                                                <span className="font-medium text-lg">
                                                    {index + 1}. {lesson.title}
                                                </span>
                                            </div>
                                            <ChevronDown className="h-4 w-4" />
                                        </CollapsibleTrigger>

                                        {/* Lesson Content */}
                                        <CollapsibleContent>
                                            <div className="p-5 bg-muted/10 space-y-5 rounded-b-lg">

                                                <p className="text-sm text-muted-foreground">{lesson.description}</p>

                                                {/* Video */}
                                                {/* {videoSrc && !openQuizLesson && (
                                                    <AdvancedLessonVideo
                                                        src={videoSrc}
                                                        lessonId={lessonId}
                                                        title={lesson.title}
                                                        onComplete={() => markLessonCompleted(lessonId, lesson.quiz)}
                                                        playingVideo={playingVideo}
                                                        setPlayingVideo={setPlayingVideo}
                                                    />
                                                )} */}

                                                <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                                <div className="text-center px-4">
                                                  <Lock className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                                                  <p className="text-foreground font-semibold mb-1 text-white">Lesson locked</p>
                                                  <p className="text-sm text-muted-foreground">
                                                    After purchasing the course, you will gain access to all lessons and materials.
                                                  </p>
                                                </div>
                                              </div>

                                                {/* Quiz Button */}
                                                {/* {lesson.quiz && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full flex justify-between"
                                                        onClick={() => setOpenQuizLesson(lessonId)}
                                                    >
                                                        <span>Open Quiz</span>
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                )} */}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>

                                    {/* Quiz Modal */}
                                    <QuizModal
                                        lessonId={lessonId}
                                        quiz={lesson.quiz}
                                        opened={openQuizLesson === lessonId}
                                        onClose={() => setOpenQuizLesson(null)}
                                        selectedAnswers={selectedAnswers}
                                        setSelectedAnswers={setSelectedAnswers}
                                        onSubmit={() => handleQuizSubmit(lessonId, lesson.quiz)}
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
