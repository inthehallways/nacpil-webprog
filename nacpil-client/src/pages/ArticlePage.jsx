import Button from '../components/Button';
import { useParams, Navigate } from 'react-router-dom';
import articles from '../assets/article-content.js';

function ArticlePage() {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);

    if (!article) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="max-w-3xl">
                    <div className="mb-4">
                        <Button to="/articles">← Back to Articles</Button>
                    </div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Article
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                        {article.title}
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="h-full w-full object-cover mix-blend-multiply"
                        />
                    </div>

                    <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
                        {article.content.map((paragraph, index) => (
                            <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-8 border-t-2 border-zinc-900 pt-6">
                        <Button to="/articles">← Back to Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ArticlePage;