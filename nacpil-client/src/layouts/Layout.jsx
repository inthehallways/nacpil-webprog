import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
return (
    <div className="relative min-h-screen bg-zinc-100 text-zinc-900 selection:bg-zinc-900 selection:text-zinc-50">           
        <div 
            className="pointer-events-none fixed inset-0 z-50 opacity-[0.27] mix-blend-multiply"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
        />
        <div className="relative z-10">
            <NavBar />
            <main className="pb-16 pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    </div>
    );
};

export default Layout;
