import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center p-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 w-80 h-80 sm:h-120 sm:w-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb5a7]/25 blur-3xl" />
      </div>

      <section className="relative flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="mb-4 font-clash text-9xl font-semibold text-black/80">
          404
        </h1>

        <p className="mb-12 text-2xl font-light">Page not found</p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm text-black/60 hover:border-black/20 hover:text-black active:scale-95 transition duration-300"
        >
          Go back home
        </Link>
      </section>
    </main>
  );
}
