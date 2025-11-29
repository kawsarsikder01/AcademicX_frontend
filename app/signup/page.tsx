import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Provider";
import UserSignUpForm from "@/components/signup-form";

export default function SignUpPage() {
    return (
        <Providers>
            <div className="min-h-screen flex flex-col">
                <Navigation />
                <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gradient-to-br from-background via-background to-primary/5">
                    <div className="w-full max-w-md">
                        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                            <UserSignUpForm />
                        </div>
                    </div>
                </main>
            </div>
        </Providers>
    )
}