import Button from '../components/Button';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.webp';
import card3 from '../assets/images/card3.jpg';
import card4 from '../assets/images/card4.jpg';

{/* 
    Enhancement 2: Revise and expand the content of the three pages [Home, About, and Articles]. 
        Use: 
        • Image 
        • Content-writeups 
*/}

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Resources & Readings
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Fuel for your hyperfixation.
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                    Whether you are trying to type yourself accurately or just want to psychoanalyze your friends, here are the resources to back it up.
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Articles
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Still want to learn more about MBTI? Read them here.</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={card1} className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Assessment
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">What is your actual Myers-Briggs® Personality type?</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Stop guessing your letters based on internet stereotypes. Take this comprehensive test to finally discover your true personality type.
                        </p>
                        <Button to="https://www.16personalities.com/free-personality-test"className="mt-4">Take the Test!</Button>
                    </article>
                    
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={card2} className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Psychology
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Who was Carl Jung? The 8 Cognitive Functions, Explained.</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Dive deep into the origins of the cognitive functions and explore the theories of Carl Jung, the Swiss psychiatrist who started it all.
                        </p>
                        <Button to="https://www.masterclass.com/articles/cognitive-functions" className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={card3} className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Pet Psychology
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Pet Temperament Assessment Tool (PTAT): The MBTI for Cats?</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Discover the Pet Temperament Assessment Tool (PTAT) and see how analyzing feline behavior compares to human cognitive functions.
                        </p>
                        <Button to="https://www.16tests.com/en/blog/ptat-the-mbti-for-cats" className="mt-4">Read More</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <div className="flex aspect-[4/3] items-center justify-center rounded-[1.25rem] bg-zinc-200 overflow-hidden">
                            <img src={card4} className="h-full w-full object-cover" />
                        </div>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Just For Fun
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">Which Cat Breed Fits Your Myers-Briggs® Personality Type</h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Are you an independent Russian Blue (INTJ) or a chaotic Orange Tabby (ESTP)? Discover your feline soulmate based on your cognitive functions.
                        </p>
                        <Button to="https://www.psychologyjunkie.com/cat-breed-fits-myers-briggs-personality-type/" className="mt-4">Read More</Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;