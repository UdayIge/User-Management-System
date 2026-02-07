import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-800 text-white py-4 px-4 md:px-6 text-center">
        <Link to="/" className="text-lg font-semibold hover:text-gray-200 transition-colors">
          MERN stack developer practical task
        </Link>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white py-3 px-4 md:px-6 text-center text-sm">
        MERN stack developer practical task
      </footer>
    </div>
  );
}
