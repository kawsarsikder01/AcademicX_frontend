'use client';

import { Course } from "./sections/CourseSection";
import { Badge } from "@/components/ui/badge";
import { Clock, Globe, Award, ShoppingCart, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calculateDiscountedPrice, getFile } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function CourseHero({ course }: { course: Course | null }) {
    const { addToCart } = useCart();
    const [playVideo, setPlayVideo] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fix YouTube URLs (handles youtu.be)
    const cleanUrl = (url: string) => {
        if (!url) return "";

        // Convert short URLs
        if (url.includes("youtu.be")) {
            const id = url.split("/").pop()?.split("?")[0];
            return `https://www.youtube.com/watch?v=${id}`;
        }

        // Remove incomplete &t
        if (url.endsWith("&t")) {
            return url.replace("&t", "");
        }

        return url;
    };

    const handlePlay = () => {
        setPlayVideo(true);
        setLoading(true);
    };

    const handleAddToCart = () => {
        if (course) {
            addToCart({
                id: course.id.toString(),
                title: course.title,
                instructor: course.vendor?.ownername,
                price: calculateDiscountedPrice(course?.price ?? 0, course?.discount ?? 0),
                image: getFile(course?.thumbnail?.file_path || "") || "",
            });
            toast.success("Course added to cart!");
        }
    };

    return (
        <section className="bg-gradient-hero py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Thumbnail with Play Button */}
                        {!playVideo ? (
                            <div
                                className="relative w-full h-[450px] cursor-pointer"
                                onClick={handlePlay}
                            >
                                <img
                                    src={getFile(course?.thumbnail?.file_path || "") || ""}
                                    alt="Course Thumbnail"
                                    className="w-full h-full object-cover rounded-xl"
                                />

                                {/* Play Icon */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black bg-opacity-40 rounded-full p-4">
                                        <PlayCircle className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-[450px]">
                                {/* Loader */}
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                )}

                                <ReactPlayer
                                    src={cleanUrl(course?.introVideoUrl || "")}
                                    playing
                                    controls
                                    width="100%"
                                    height="450px"
                                    className="rounded-xl overflow-hidden"
                                    onReady={() => setLoading(false)}
                                />
                            </div>
                        )}

                        {/* Title + Description */}
                        <div>
                            <Badge className="mb-3">{course?.category?.name}</Badge>

                            <h1 className="text-2xl md:text-2xl font-bold text-foreground mb-4">
                                {course?.title}
                            </h1>

                            <p className="text-lg text-muted-foreground mb-6">
                                {course?.description}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>
                        <Card className="sticky top-4">
                            <CardContent className="p-6">

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-3xl font-bold text-foreground">
                                        ${calculateDiscountedPrice(course?.price ?? 0, course?.discount ?? 0)}
                                    </span>

                                    {course?.discount && (
                                        <span className="text-xl text-muted-foreground line-through">
                                            ${course?.price}
                                        </span>
                                    )}
                                </div>

                                {/* Buttons */}
                                <Button className="w-full mb-3" size="lg" onClick={handleAddToCart}>
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                </Button>

                                <Button variant="outline" className="w-full" size="lg">
                                    Add to Wishlist
                                </Button>

                                {/* Details */}
                                <div className="mt-6 space-y-3 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="h-5 w-5" />
                                        <span>{course?.total_hour} hours on-demand video</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Globe className="h-5 w-5" />
                                        <span>Full lifetime access</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Award className="h-5 w-5" />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
