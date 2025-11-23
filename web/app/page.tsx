import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight">
            Cr?er une application avec IA
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Un guide moderne pour d?marrer rapidement avec Next.js, d?ployer sur Vercel
            et int?grer une d?mo IA 100% c?t? navigateur.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              Voir la d?mo IA
            </Link>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Docs Next.js
            </a>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-medium">1. Choisir l?architecture</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Utilisez Next.js (App Router) pour une base robuste, SEO-friendly et pr?te
              pour le d?ploiement serverless sur Vercel.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-medium">2. UX claire et responsive</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Concevez un parcours simple avec un design accessible. Tailwind CSS aide ?
              rester coh?rent et rapide.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-medium">3. Int?grer l?IA</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Commencez par une IA c?t? client (TensorFlow.js) pour ?viter la gestion de
              secrets. Passez ensuite ? une API si n?cessaire.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-xl font-medium">4. D?ployer sur Vercel</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              D?ploiement en un clic avec CI/CD int?gr?, previews et observabilit?.
            </p>
          </div>
        </section>

        <footer className="mt-16 text-sm text-zinc-500 dark:text-zinc-500">
          <p>
            Besoin d?un exemple concret ? Essayez la{" "}
            <Link href="/demo" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
              d?mo IA
            </Link>{" "}
            qui fonctionne sans cl? API.
          </p>
        </footer>
      </main>
    </div>
  );
}
