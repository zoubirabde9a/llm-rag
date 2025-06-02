import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-3xl font-bold mb-4">Dynamic Table Demo</h1>
      <div className="flex gap-4">
        <Link href="/users" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Users Table</Link>
        <Link href="/products" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">Products Table</Link>
      </div>
    </main>
  );
}
