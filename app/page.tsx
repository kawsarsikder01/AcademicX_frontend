import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Provider";
import CourseCard from "@/components/sections/course-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";


const featuredCourses = [
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
];

const instructors = [
  { name: "Dr. Sarah Johnson", specialty: "Web Development", students: 45000, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
  { name: "Prof. Michael Chen", specialty: "Data Science", students: 38000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
  { name: "Emily Rodriguez", specialty: "UI/UX Design", students: 32000, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop" },
  { name: "James Wilson", specialty: "Marketing", students: 28000, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
];

const testimonials = [
  { name: "Alex Thompson", role: "Software Developer", content: "This platform transformed my career. The instructors are world-class!", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
  { name: "Maria Garcia", role: "Data Analyst", content: "Best investment I've made in my education. Highly recommend!", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
  { name: "David Lee", role: "UI Designer", content: "The course quality and support are exceptional. Worth every penny!", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop" },
];



export default function Home() {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1">
          <section className="relative bg-gradient-hero py-20 md:py-32">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                  Learn Without Limits
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Start, switch, or advance your career with thousands of courses from expert instructors
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto">
                      Explore Courses
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Join for Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground">10,000+</div>
                  <div className="text-muted-foreground">Courses</div>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground">500K+</div>
                  <div className="text-muted-foreground">Students</div>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground">1,200+</div>
                  <div className="text-muted-foreground">Instructors</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground">95%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Courses */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Popular Courses</h2>
                  <p className="text-muted-foreground">Start learning with our most popular courses</p>
                </div>
                <Link href="/courses">
                  <Button variant="outline">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </div>
          </section>

          {/* Top Instructors */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-2">Meet Our Expert Instructors</h2>
                <p className="text-muted-foreground">Learn from industry leaders with years of experience</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {instructors.map((instructor) => (
                  <Card key={instructor.name} className="text-center">
                    <CardContent className="pt-6">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="font-semibold text-lg text-foreground mb-1">{instructor.name}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{instructor.specialty}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{instructor.students.toLocaleString()} students</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>


          {/* Testimonials */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-2">What Our Students Say</h2>
                <p className="text-muted-foreground">Join thousands of satisfied learners</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.name}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">&quot;{testimonial.content}&quot;</p>
                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-foreground">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>


        </div>
      </div>
      <Footer />
    </Providers>
  );
}
