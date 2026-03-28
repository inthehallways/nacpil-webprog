import Button from '../components/Button';
import intuition from '../assets/images/intuition.png';
import sensing from '../assets/images/sensing.png';
import thinking from '../assets/images/thinking.png';
import feeling from '../assets/images/feeling.png';
import heroImage1 from '../assets/images/posahuh.png';
import heroImage2 from '../assets/images/posawow.png';

{/* 
    Enhancement 2: Revise and expand the content of the three pages [Home, About, and Articles]. 
        Use: 
        • Image 
        • Content-writeups 
*/}

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    <div className="flex items-left justify-center p-6">
                        <img 
                            src={heroImage2} 
                            className="h-full max-h-77 w-full object-contain" 
                        />
                        <img 
                            src={heroImage1} 
                            className="h-full max-h-72 w-full object-contain" 
                        />
                    </div>
                    
                    <div>
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Decoding the 16 personalities, one braincell at a time.
                        </p>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            What is the Myers-Briggs Type Indicator (MBTI)?
                        </h1>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                                Created by Katharine Cook Briggs and Isabel Briggs Myers using the theories of psychologist Carl Jung, the MBTI is a self-report questionnaire that sorts people into 16 distinct types. While it is not a clinical diagnosis, it serves as an insightful tool to help you explore your strengths, understand your decision-making preferences, and learn how you interact with the world.
                            </p>
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back Home
                            </Button>
                            <Button to="/articles">Open Articles</Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        The Four Scales
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">How your letters are chosen...</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">1. Energy</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Extroversion (E) vs. Introversion (I)
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Do you gain energy by socializing and focusing on the external world, or do you recharge through solitude and your rich inner world?
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">2. Perception</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Sensing (S) vs. Intuition (N)
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Do you prefer gathering facts, details, and reality through your senses, or do you rely on instincts, patterns, and the "big picture"?
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">3. Decisions</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Thinking (T) vs. Feeling (F)
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            When making a choice, do you rely on objective logic, facts, and consistency, or do you prioritize emotions, people, and harmony?
                        </p>
                    </div>
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">4. Orientation</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Judging (J) vs. Perceiving (P)
                        </p>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Do you prefer structure, order, and firm decisions, or are you highly adaptable, open-ended, and flexible in how you live?
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            The Four Temperaments
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">The core personality groups</h2>

                        <div className="mt-6 space-y-9.5">
                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-bold text-zinc-900">The Analysts</h3>
                                <p className="mt-1 text-sm leading-6 italic text-zinc-800">
                                    INTJ, INTP, ENTJ, ENTP
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Strategic and logical problem-solvers who navigate life using intellect and objective analysis.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-bold text-zinc-900">The Diplomats</h3>
                                <p className="mt-1 text-sm leading-6 italic text-zinc-800">
                                    INFJ, INFP, ENFJ, ENFP
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Empathetic and idealistic visionaries driven by a deep desire for harmony and human connection.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-bold text-zinc-900">The Sentinels</h3>
                                <p className="mt-1 text-sm leading-6 italic text-zinc-800">
                                    ISTJ, ISFJ, ESTJ, ESFJ
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Practical, organized, and reliable protectors who highly value order, stability, and tradition.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-bold text-zinc-900">The Explorers</h3>
                                <p className="mt-1 text-sm leading-6 italic text-zinc-800">
                                    ISTP, ISFP, ESTP, ESFP
                                </p>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Adaptable, spontaneous, and hands-on individuals who thrive on action in the present moment.
                                </p>
                            </article>
                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            The Eight Cognitive Functions: Information and Decision-Making
                        </p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={intuition} className="h-full w-full rounded-[1.25rem] object-contain"/>
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={sensing} className="h-full w-full rounded-[1.25rem] object-contain"/>
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={thinking} className="h-full w-full rounded-[1.25rem] object-contain"/>
                            </div>
                            <div className="flex aspect-square items-center justify-center rounded-[1.25rem] bg-zinc-200">
                                <img src={feeling} className="h-full w-full rounded-[1.25rem] object-contain"/>
                            </div>
                        </div>
                        <Button className="mt-5">Find Your Archetype</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;