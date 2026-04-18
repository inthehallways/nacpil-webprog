/* Lab Act 2 Enhancement 3: Make a design for the Not Found Page. */

import Button from '../components/Button';
import lostCatPic from '../assets/images/lost_poosay.png';

const NotFoundPage = () => {
    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="mb-8 flex w-64 items-center justify-center sm:w-80">
                <img 
                    src={lostCatPic} 
                    alt="Cat with a paper bag on its head" 
                    className="h-auto w-full object-contain mix-blend-multiply" 
                />
            </div>

            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Error 404
            </p>
            <h1 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
                Missing Feline.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                The link you clicked has wandered off. Let's get you back to familiar territory.
            </p>
            
            <div className="mt-8">
                <Button to="/" variant="primary" className="px-8">
                    Return Home
                </Button>
            </div>
            
        </div>
    );
};

export default NotFoundPage;