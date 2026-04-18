import { Outlet } from 'react-router-dom';
import CATBLACK from '../assets/images/CATBLACK.gif';
import darkver from '../assets/images/typed-darkver.png';

const AuthLayout = () => {
    return (
        <section className='min-h-screen bg-zinc-100 text-zinc-900'>
            <div className='grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]'>
                <div className='flex items-center justify-center border-b-2 border-zinc-300 bg-black p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16'>
                    <div className='flex flex-col items-center gap-6'>
                        <img src={darkver} alt='Typed logo' className='w-60' />
                        <img src={CATBLACK} alt='Black cat' className='-mt-35'/>
                    </div>
                </div>

                <main className='flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16'>
                    <div className='mx-auto w-full max-w-md'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </section>
    );
};

export default AuthLayout;
