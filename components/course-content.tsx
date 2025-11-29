'use client';

import { Course } from "./sections/CourseSection";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Overview from "./overview";
import Curriculum from "./curriculum";



export default function CourseContent({ course }: { course: Course | null }) {

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>

                    <Overview course={course} />

                    <Curriculum course={course} />

                    <TabsContent value="reviews" className="mt-8">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Student Reviews</h2>
                                <div className="space-y-6">
                                    {[
                                        { name: "John Doe", rating: 5, date: "2 weeks ago", comment: "Excellent course! Very comprehensive and well-structured. I learned so much!" },
                                        { name: "Jane Smith", rating: 5, date: "1 month ago", comment: "Best web development course I've taken. The instructor explains everything clearly." },
                                        { name: "Mike Johnson", rating: 4, date: "2 months ago", comment: "Great content and projects. Would recommend to anyone starting web development." },
                                    ].map((review, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-3">
                                                    <img
                                                        src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=50&h=50&fit=crop`}
                                                        alt={review.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h3 className="font-semibold text-foreground">{review.name}</h3>
                                                            <span className="text-sm text-muted-foreground">{review.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 mb-2">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                            ))}
                                                        </div>
                                                        <p className="text-muted-foreground">{review.comment}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}