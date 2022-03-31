import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-100 p-4 border-t-4 border-slate-300">
      <Link href="/">
        <span className="text-lg font-bold">Stationsmonitor</span>
      </Link>
    </nav>
  );
}
