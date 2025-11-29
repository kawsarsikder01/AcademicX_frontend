import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { quiz } from "./sections/CourseSection";
import { Button } from "@/components/ui/button";
import { parseOptions } from "@/lib/utils";

// ----------------------
// Quiz Renderer Component
// ----------------------
export default function QuizModal({
    lessonId,
    quiz,
    opened,
    onClose,
    selectedAnswers,
    setSelectedAnswers,
    onSubmit
}: {
    lessonId: string;
    quiz?: quiz;
    opened: boolean;
    onClose: () => void;
    selectedAnswers: Record<string, any>;
    setSelectedAnswers: any;
    onSubmit: () => void;
}) {
    if (!quiz) return null;

    const updateAnswer = (qId: number, value: any) => {
        setSelectedAnswers((prev: any) => ({
            ...prev,
            [lessonId]: { ...prev[lessonId], [qId]: value }
        }));
    };

    return (
        <Dialog open={opened} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{quiz.title}</DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                    {quiz.questions?.map((q, idx) => (
                        <div key={q.id} className="space-y-3">
                            <p className="font-medium">
                                {idx + 1}. {q.question_text}
                            </p>

                            {/* MCQ */}
                            {q.question_type === "mcq" && (
                                <RadioGroup
                                    value={selectedAnswers[lessonId]?.[q.id] || ""}
                                    onValueChange={(val) => updateAnswer(q.id, val)}
                                >
                                    {parseOptions(q.options).map((opt: string, optIdx: number) => (
                                        <div key={optIdx} className="flex items-center space-x-2">
                                            <RadioGroupItem id={`${q.id}-${optIdx}`} value={opt} />
                                            <Label htmlFor={`${q.id}-${optIdx}`}>{opt}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}

                            {/* Written */}
                            {q.question_type === "short_answer" && (
                                <Textarea
                                    className="min-h-[120px]"
                                    placeholder="Write your answer..."
                                    value={selectedAnswers[lessonId]?.[q.id] || ""}
                                    onChange={(e) => updateAnswer(q.id, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    <Button className="w-full" onClick={onSubmit}>
                        Submit Answers
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}