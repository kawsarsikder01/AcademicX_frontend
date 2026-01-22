
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./components/contact-form";
import { Providers } from "@/components/Provider";

const Contact = () => {

    return (
        <Providers>
            <div className="min-h-screen flex flex-col">
                <Navigation />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-gradient-hero py-16">
                        <div className="container mx-auto px-4 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Get in Touch
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="grid md:grid-cols-3 gap-8 mb-12">
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                                        <h3 className="font-semibold text-lg text-foreground mb-2">Email Us</h3>
                                        <p className="text-muted-foreground">academicx@gmail.com</p>
                                        <p className="text-muted-foreground">support@academicx.com</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
                                        <h3 className="font-semibold text-lg text-foreground mb-2">Call Us</h3>
                                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                        <p className="text-muted-foreground">Mon-Fri 9am-6pm PST</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                                        <h3 className="font-semibold text-lg text-foreground mb-2">Visit Us</h3>
                                        <p className="text-muted-foreground">123 Learning Street</p>
                                        <p className="text-muted-foreground">San Francisco, CA 94102</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                                {/* Contact Form */}

                                <ContactForm />
                                {/* Map Placeholder */}
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-6">Our Location</h2>
                                    <Card className="h-[500px] overflow-hidden py-0">
                                        <CardContent className="p-0 h-full">
                                            <div className="w-full h-full bg-muted flex items-center justify-center">
                                                <div className="text-center text-muted-foreground">
                                                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                                                    <p>Map integration would go here</p>
                                                    <p className="text-sm mt-2">123 Learning Street, San Francisco, CA 94102</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
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

export default Contact;