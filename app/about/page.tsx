import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users, BookOpen, Globe } from "lucide-react";
import { Providers } from "@/components/Provider";

const About = () => {
    const values = [
        { icon: Target, title: "Excellence", description: "We strive for excellence in everything we do, from course content to student support." },
        { icon: Users, title: "Community", description: "Building a global community of learners who support and inspire each other." },
        { icon: BookOpen, title: "Accessibility", description: "Making quality education accessible to everyone, everywhere." },
        { icon: Globe, title: "Innovation", description: "Continuously innovating our platform to enhance the learning experience." },
    ];

    const team = [
        { name: "Sarah Johnson", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop" },
        { name: "Michael Chen", role: "CTO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" },
        { name: "Emily Rodriguez", role: "Head of Content", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop" },
        { name: "James Wilson", role: "Head of Marketing", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop" },
    ];

    return (
        <Providers>
            <div className="min-h-screen flex flex-col">
                <Navigation />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-gradient-hero py-20">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                About LearnHub
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Empowering learners worldwide with quality education from expert instructors
                            </p>
                        </div>
                    </section>

                    {/* Our Story */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        LearnHub was founded in 2020 with a simple yet powerful vision: to make high-quality education accessible to everyone, everywhere. We believe that learning should have no boundaries and that everyone deserves the opportunity to develop new skills and advance their careers.
                                    </p>
                                    <p>
                                        What started as a small platform with just a handful of courses has grown into a global learning community with thousands of courses, millions of students, and instructors from around the world. Our platform enables expert instructors to share their knowledge and passion while helping learners achieve their goals.
                                    </p>
                                    <p>
                                        Today, we're proud to be one of the leading online learning platforms, continuously innovating to provide the best learning experience possible. From interactive courses to live sessions, from certification programs to career services, we're committed to supporting our learners every step of the way.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision */}
                    <section className="py-16 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <Card>
                                    <CardContent className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Eye className="h-8 w-8 text-primary" />
                                            <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                                        </div>
                                        <p className="text-muted-foreground">
                                            To create a world where anyone, anywhere can transform their life through learning. We envision a future where quality education is accessible to all, regardless of location, background, or financial situation.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Target className="h-8 w-8 text-primary" />
                                            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                                        </div>
                                        <p className="text-muted-foreground">
                                            To empower individuals and organizations with the knowledge and skills they need to succeed in a rapidly changing world. We connect learners with expert instructors and cutting-edge content to drive personal and professional growth.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* Our Values */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {values.map((value) => {
                                    const Icon = value.icon;
                                    return (
                                        <Card key={value.title}>
                                            <CardContent className="p-6 text-center">
                                                <Icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                                                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                                                <p className="text-muted-foreground text-sm">{value.description}</p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="py-16 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-foreground mb-2">10,000+</div>
                                    <div className="text-muted-foreground">Courses</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-foreground mb-2">500K+</div>
                                    <div className="text-muted-foreground">Students</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-foreground mb-2">1,200+</div>
                                    <div className="text-muted-foreground">Instructors</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-foreground mb-2">150+</div>
                                    <div className="text-muted-foreground">Countries</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Team */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Meet Our Team</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                                {team.map((member) => (
                                    <Card key={member.name}>
                                        <CardContent className="p-6 text-center">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                            />
                                            <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                                            <p className="text-muted-foreground text-sm">{member.role}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </Providers>
    );
};

export default About;