{/* 
    Lab Act 3 Enhancement 1: Create and make a design for the Footer. 
*/}

import { NavLink } from 'react-router-dom';

const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
];

const exploreLinks = [
    { label: '16 Personalities Test', href: 'https://www.16personalities.com/free-personality-test' },
    { label: 'Why MBTI?', to: '/about' },
    { label: 'Read the Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors',
        isActive ? 'text-zinc-900' : 'text-stone-600 hover:text-zinc-900',
    ].join(' ');

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative z-10 border-t-2 border-zinc-900 bg-stone-200 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.25fr_0.8fr_0.95fr]">
                <div className="max-w-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600">
                        Typed.
                    </p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-900">
                        Personality talk for curious cats and overthinkers.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-stone-700">
                        Explore MBTI basics, compare the 16 personalities, and keep digging until your inner cat
                        finds the right box.
                    </p>
                </div>

                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600">
                        Quick Links
                    </p>
                    <nav className="mt-4 flex flex-col gap-3">
                        {quickLinks.map((link) => (
                            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-600">
                        Keep Exploring
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                        {exploreLinks.map((link) =>
                            link.href ? (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-600 transition-colors hover:text-zinc-900"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                                    {link.label}
                                </NavLink>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t-2 border-zinc-900 pt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-600 sm:flex-row sm:items-center sm:justify-between">
                <p>&copy; {year} Typed. All rights reserved.</p>
                <p>CURIOSITY TYPED THE CAT.</p>
            </div>
        </footer>
    );
};

export default Footer;
