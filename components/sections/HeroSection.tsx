'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay"
const heroSlides = [
    {
        type: "image",
        src: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&h=500&fit=crop",
        title: "Transform Your Career with Expert-Led Courses",
        subtitle: "Join thousands of students learning from industry professionals",
    },
    {
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        title: "Learn By Doing",
        subtitle: "Interactive video lessons and hands-on projects",
    },
    {
        type: "image",
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=500&fit=crop",
        title: "Study at Your Own Pace",
        subtitle: "Flexible learning schedules that fit your lifestyle",
    },
    {
        type: "image",
        src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=500&fit=crop",
        title: "Get Certified",
        subtitle: "Earn certificates recognized by top companies worldwide",
    },
];


export default function HeroSection() {
    return (
        <section className="relative w-full bg-background">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                                {slide.type === "video" ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    >
                                        <source src={slide.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={slide.src}
                                        alt={slide.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
                                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl animate-fade-in">
                                        {slide.subtitle}
                                    </p>
                                    <Button size="lg" className="mt-8 animate-fade-in">
                                        Explore Courses
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </section>

    )
}