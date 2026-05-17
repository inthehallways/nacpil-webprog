import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import ArticleList from '../../components/ArticleList.jsx';
import staticArticles from '../../data/article-content.js';
import { fetchArticles } from '../../services/ArticleService.js';

const ArticleListPage = () => {
    const [articles, setArticles] = useState(staticArticles);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const { data } = await fetchArticles();
                const publishedArticles = data.filter((article) => article.isPublished !== false);
                if (publishedArticles.length) {
                    setArticles(publishedArticles);
                }
            } catch {
                setArticles(staticArticles);
            } finally {
                setIsLoading(false);
            }
        };

        loadArticles();
    }, []);

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-b-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
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
                
                {isLoading ? (
                    <p className="text-sm font-medium text-zinc-600">Loading articles...</p>
                ) : (
                    <ArticleList articles={articles}/>
                )}
            </section>
        </div>
    );
}

export default ArticleListPage;
