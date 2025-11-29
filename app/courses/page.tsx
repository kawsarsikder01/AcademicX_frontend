import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Provider";
import { Button } from "@/components/ui/button";

import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import FilterSection from "@/components/sections/FilterSection";
import HeroSection from "@/components/sections/HeroSection";
import CourseSection from "@/components/sections/CourseSection";


const courses = [
    {
        id: "1",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        title: "Complete Web Development Bootcamp 2024",
        instructor: "Dr. Sarah Johnson",
        price: 89.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviews: 12453,
        students: 45678,
        duration: "42 hours",
        category: "Development",
    },
    {
        id: "2",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        title: "Data Science & Machine Learning A-Z",
        instructor: "Prof. Michael Chen",
        price: 94.99,
        originalPrice: 179.99,
        rating: 4.9,
        reviews: 8932,
        students: 32145,
        duration: "38 hours",
        category: "Data Science",
    },
    {
        id: "3",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
        title: "UI/UX Design Masterclass",
        instructor: "Emily Rodriguez",
        price: 79.99,
        originalPrice: 149.99,
        rating: 4.7,
        reviews: 6721,
        students: 28934,
        duration: "28 hours",
        category: "Design",
    },
    {
        id: "4",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        title: "Digital Marketing Strategy 2024",
        instructor: "James Wilson",
        price: 69.99,
        originalPrice: 139.99,
        rating: 4.6,
        reviews: 5432,
        students: 21567,
        duration: "25 hours",
        category: "Marketing",
    },
    {
        id: "5",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
        title: "Python Programming for Beginners",
        instructor: "Dr. Robert Brown",
        price: 59.99,
        originalPrice: 129.99,
        rating: 4.7,
        reviews: 9876,
        students: 38421,
        duration: "30 hours",
        category: "Development",
    },
    {
        id: "6",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
        title: "Financial Analysis & Modeling",
        instructor: "Jennifer Davis",
        price: 84.99,
        originalPrice: 169.99,
        rating: 4.8,
        reviews: 4321,
        students: 16789,
        duration: "35 hours",
        category: "Business",
    },
    {
        id: "7",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
        title: "Project Management Professional (PMP)",
        instructor: "Mark Anderson",
        price: 99.99,
        originalPrice: 199.99,
        rating: 4.9,
        reviews: 6543,
        students: 24567,
        duration: "45 hours",
        category: "Business",
    },
    {
        id: "8",
        image: "https://images.unsplash.com/photo-1550063873-ab792950096b?w=400&h=300&fit=crop",
        title: "Graphic Design & Adobe Creative Suite",
        instructor: "Lisa Martinez",
        price: 74.99,
        originalPrice: 154.99,
        rating: 4.6,
        reviews: 5678,
        students: 19876,
        duration: "32 hours",
        category: "Design",
    },
];

export default function Page() {
    
    
    return (
        <Providers>
            <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1">
                    <HeroSection/>
                    <FilterSection/>

                    {/* Course Grid */}
                    <CourseSection/>
                </main>
            </div>
            <Footer />
        </Providers>
    )
}