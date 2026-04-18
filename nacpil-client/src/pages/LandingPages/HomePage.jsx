import Button from '../../components/Button';
import blackPosa from '../../assets/images/posa.png';
import claws from '../../assets/images/claws.png';
import posas from '../../assets/images/posas.png';
import posahaha from '../../assets/images/posahaha.png';

/* 
    Lab Act 2 Enhancement 2: Revise and expand the content of the three pages [Home, About, and Articles]. 
        Use: 
        • Image 
        • Content-writeups 
*/

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-1 lg:grid-cols-2 lg:items-center">
                    <div className="lg:pl-30">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Welcome to Typed
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Curiosity Typed the Cat! Which box do you belong in?
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            Find your personality box and learn about the Myers-Briggs Type Indicator (MBTI) types to answer life's most important question—are you fueled by chaotic orange cat energy or calculated black cat energy?                        
                        </p>
                        <div className="mt-6">
                            <Button to="/about" variant='primary'>
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6">
                        <img 
                            src={blackPosa} 
                            className="w-full max-w-md object-contain"
                        />                        
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        The Myers-Briggs® Personality Type Framework
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">MBTI at a glance...</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">1940s</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Decade Created
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">16</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Distinct Personalities
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">08</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Cognitive Functions
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">04</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Temperaments
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Choose Your Path
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Ready to jump out of the box?</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={posahaha} className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">Get to Know the 16 Personalities</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Dive into the detailed profiles of all 16 personalities. From the mastermind INTJ to the chaotic ENTP, meet the whole litter.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={posas} className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">MBTI Compatibility</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Who is your golden pair? Discover which personality types naturally purr together and which ones might hiss at each other.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={claws} className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">When the Claws Come Out</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Learn how each personality reacts to extreme stress. Discover the infamous "grip" state and how to get back to your healthy, purring self.
                        </p>
                        <Button className="mt-4" variant="primary">View More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
