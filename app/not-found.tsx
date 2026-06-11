import type { Metadata } from "next";
import Link from "next/link";
import Slashed from "@/components/Slashed";

export const metadata: Metadata = {
  title: "Page Not Found | JP Fitness Kalapatti",
};

export default function NotFound() {
  return (
    <section className="container-jp flex min-h-svh flex-col items-start justify-center py-32">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Error 404</p>
      <h1 className="display-heading mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-white">
        PAGE NOT <Slashed>FOUND</Slashed>
      </h1>
      <p className="mt-4 max-w-md text-base leading-[1.7] text-muted">
        That page does not exist. Head back to the gym.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-brand">
          Back to home
        </Link>
        <Link href="/pricing" className="btn-outline">
          View membership plans
        </Link>
      </div>
    </section>
  );
}
