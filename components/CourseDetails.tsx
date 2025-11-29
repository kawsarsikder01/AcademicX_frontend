'use client';

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"; 
import { Course} from "./sections/CourseSection";
import CourseHero from "./course-hero";
import CourseContent from "./course-content";

 

export const CourseDetails = ({ slug }: { slug: string }) => {
    
   
    const [course, setCourse] = useState<Course | null>(null);


    useEffect(() => {
        if (!slug) return;

        const loadCourse = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${slug}`);
                const data = await res.json();
                console.log(data)
                setCourse(data);
            } catch (err) {
                console.error(err);
            }
        };

        loadCourse();
    }, [slug]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />

            <main className="flex-1">
                {/* Course Hero */}
                <CourseHero course={course}/>

                {/* Course Content */}
                <CourseContent course={course} />

                {/* Related Courses */}
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto px-4">
                        {/* <h2 className="text-2xl font-bold text-foreground mb-6">Related Courses</h2> */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Placeholder related courses */}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CourseDetails;


