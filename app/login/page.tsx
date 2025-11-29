import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import UserLoginForm from "@/components/login-form";
import { Providers } from "@/components/Provider";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Providers>
                <Navigation />
                <main className="flex-1 flex items-center justify-center py-12 px-4 from-background via-background to-primary/5">
                    <div className="w-full max-w-md">
                        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                            <UserLoginForm />
                        </div>
                    </div>
                </main>
                <Footer />
            </Providers>
        </div>
    )
}