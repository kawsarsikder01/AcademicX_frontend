import Navigation from "@/components/Navigation";
import { Providers } from "@/components/Provider";
import Dashboard from "@/components/student/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export const dynamic = "force-dynamic";
export default function StudentPortal() {

    
    return (
        <Providers>
            <Navigation />
            <div className="min-h-screen bg-background pt-20">
                <div className="container mx-auto px-4 py-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2">Student Portal</h1>
                        <p className="text-muted-foreground">Track your learning journey and achievements</p>
                    </div>
                    <Dashboard/>
                </div>
            </div>
        </Providers>
    );
}