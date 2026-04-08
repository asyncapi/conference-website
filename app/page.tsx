/**
 * This is the root page for the Next.js App Router at the '/' path.
 * It serves as a starting point for migrating your existing home page content.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to AsyncAPI Conference!
      </h1>
      <p className="text-lg text-center max-w-2xl">
        This page demonstrates the new App Router structure. Begin migrating your existing
        homepage components and content into this file.
      </p>
      <div className="mt-8">
        <a 
          href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 hover:underline"
        >
          Learn more about App Router
        </a>
      </div>
    </main>
  );
}
