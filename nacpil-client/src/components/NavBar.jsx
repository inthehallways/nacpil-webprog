import { NavLink } from 'react-router-dom';
import logo from '../assets/typed.png';
import Button from '../components/Button';

/* Enhancement 1: Make a design for the navigation bar*/
const leftLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
];

const rightLinks = [
    { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'pb-1 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200',
        isActive 
            ? 'border-b-3 border-zinc-900 text-zinc-900' 
            : 'border-b-3 border-transparent text-zinc-500 hover:border-zinc-900 hover:text-zinc-900',
    ].join(' ');

const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:grid md:grid-cols-3 sm:px-6 lg:px-8">
                <nav className="hidden items-center justify-end gap-6 pr-2 md:flex">
                    {leftLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Enhancement 3: Create your own logo */}
                <NavLink to="/" className="flex items-center justify-center">
                    <img src={logo} alt="Typed Logo" className="h-15 w-auto" />
                </NavLink>

                <nav className="hidden items-center justify-start gap-6 pl-2 md:flex">
                    {rightLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                            {link.label}
                        </NavLink>
                    ))}
                    
                    <div className="ml-2 border-l-2 border-zinc-300 pl-6">
                        <Button to="/auth/signin" variant="primary" className="py-2 text-[11px]">
                            Sign In
                        </Button>
                    </div>
                    

                </nav>
            </div>
        </header>
    );
};

export default NavBar;