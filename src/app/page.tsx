'use client';

import { ConnectButton } from '@mysten/dapp-kit';

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to My Website</h1>
          <ConnectButton />
        </header>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">
            Welcome to my website. This is where you can add your main content.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
            <p className="text-gray-600">Description of your first feature.</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
            <p className="text-gray-600">Description of your second feature.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
