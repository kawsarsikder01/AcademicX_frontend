
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User } from "lucide-react";
import Link from "next/link";
import { Providers } from "@/components/Provider";
import { BlogSearch } from "./components/search";

const Blog = () => {

    const posts = [
        {
            id: "1",
            title: "10 Tips for Learning Web Development in 2024",
            excerpt: "Discover the most effective strategies for mastering web development this year, from choosing the right resources to building a portfolio...",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
            author: "Sarah Johnson",
            date: "Jan 15, 2024",
            category: "Development",
        },
        {
            id: "2",
            title: "The Future of Online Learning: Trends to Watch",
            excerpt: "Explore emerging trends in online education, including AI-powered personalization, microlearning, and immersive technologies...",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
            author: "Michael Chen",
            date: "Jan 12, 2024",
            category: "Education",
        },
        {
            id: "3",
            title: "How to Build a Successful Career in Data Science",
            excerpt: "A comprehensive guide to breaking into data science, from learning the fundamentals to landing your first job in the field...",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            author: "Emily Rodriguez",
            date: "Jan 10, 2024",
            category: "Career",
        },
        {
            id: "4",
            title: "UI/UX Design Principles Every Developer Should Know",
            excerpt: "Learn essential design principles that will help you create better user experiences and collaborate more effectively with designers...",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
            author: "James Wilson",
            date: "Jan 8, 2024",
            category: "Design",
        },
        {
            id: "5",
            title: "Mastering Remote Learning: Best Practices",
            excerpt: "Practical tips and strategies for staying focused, motivated, and productive while learning online from home...",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
            author: "Sarah Johnson",
            date: "Jan 5, 2024",
            category: "Education",
        },
        {
            id: "6",
            title: "Top Programming Languages to Learn in 2024",
            excerpt: "An analysis of the most in-demand programming languages and which ones you should focus on based on your career goals...",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop",
            author: "Michael Chen",
            date: "Jan 3, 2024",
            category: "Development",
        },
    ];

    const categories = ["All", "Development", "Design", "Business", "Career", "Education"];
    const recentPosts = posts.slice(0, 3);
    const popularTags = ["Web Development", "Data Science", "UX Design", "Career Tips", "Python", "JavaScript", "Remote Learning"];

    return (
        <Providers>
            <div className="min-h-screen flex flex-col">
                <Navigation />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-gradient-hero py-16">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Our Blog
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Insights, tutorials, and stories from our community of learners and instructors
                            </p>
                        </div>
                    </section>

                    {/* Blog Content */}
                    <section className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2">
                                    {/* Search */}
                                    <BlogSearch  />

                                    {/* Blog Posts */}
                                    <div className="space-y-8">
                                        {posts.map((post) => (
                                            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                                <div className="grid md:grid-cols-5 gap-0">
                                                    <div className="md:col-span-2">
                                                        <img
                                                            src={post.image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover min-h-[200px]"
                                                        />
                                                    </div>
                                                    <CardContent className="md:col-span-3 p-6">
                                                        <Badge className="mb-3">{post.category}</Badge>
                                                        <Link href={`/blog/${post.id}`}>
                                                            <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                                                                {post.title}
                                                            </h2>
                                                        </Link>
                                                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-1">
                                                                <User className="h-4 w-4" />
                                                                <span>{post.author}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>{post.date}</span>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="sticky top-4 space-y-6">
                                        {/* Categories */}
                                        <Card>
                                            <CardContent className="p-6">
                                                <h3 className="font-semibold text-lg text-foreground mb-4">Categories</h3>
                                                <div className="space-y-2">
                                                    {categories.map((category) => (
                                                        <button
                                                            key={category}
                                                            className="block w-full text-left px-3 py-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                        >
                                                            {category}
                                                        </button>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Recent Posts */}
                                        <Card>
                                            <CardContent className="p-6">
                                                <h3 className="font-semibold text-lg text-foreground mb-4">Recent Posts</h3>
                                                <div className="space-y-4">
                                                    {recentPosts.map((post) => (
                                                        <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                                                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                                                                {post.title}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground">{post.date}</p>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Popular Tags */}
                                        <Card>
                                            <CardContent className="p-6">
                                                <h3 className="font-semibold text-lg text-foreground mb-4">Popular Tags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {popularTags.map((tag) => (
                                                        <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </Providers>
    );
};

export default Blog;