export const dynamic = "force-dynamic";
import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Provider";
import Footer from "@/components/Footer";
import FilterSection from "@/components/sections/FilterSection";
import HeroSection from "@/components/sections/HeroSection";
import CourseSection from "@/components/sections/CourseSection";


 

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