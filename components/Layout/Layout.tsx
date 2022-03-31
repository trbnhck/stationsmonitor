import Navbar from 'components/Layout/Navbar';
import Footer from 'components/Layout/Footer';

export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
