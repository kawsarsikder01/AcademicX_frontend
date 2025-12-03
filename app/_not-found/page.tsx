export const dynamic = "force-dynamic";

const NotFoundPage = async () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;
