export const dynamic = "force-dynamic";

export default function FailedPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center py-12 px-4 from-background via-background to-primary/5">
                <div className="w-full max-w-md text-center">
                    <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-bold mb-4">Failed!</h1>
                        <p className="text-base text-muted-foreground">Your operation was not completed successfully.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}