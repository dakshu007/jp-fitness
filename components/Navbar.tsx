"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { business, navLinks } from "@/lib/data";

function normalise(path: string): string {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the menu is open: lock body scroll, move focus in, trap Tab, close on Escape
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      overlayRef.current
        ? Array.from(
            overlayRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled])'
            )
          )
        : [];
    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = overlayRef.current?.contains(active) ?? false;
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) => normalise(pathname ?? "/") === href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-jp flex h-16 items-center justify-between md:h-20" aria-label="Main">
        <Link href="/" className="flex min-h-[44px] items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand font-display text-lg leading-none text-white"
            aria-hidden="true"
          >
            JP
          </span>
          <span className="display-heading text-xl tracking-[0.05em]">JP FITNESS</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`py-2 text-sm font-semibold transition-colors ${
                isActive(link.href) ? "text-brand" : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href={business.whatsappHref} target="_blank" rel="noopener" className="btn-brand h-11">
            Join now
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex h-dvh flex-col bg-ink lg:hidden"
          >
            <div className="container-jp flex h-16 shrink-0 items-center justify-between">
              <span className="flex items-center gap-2.5">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-brand font-display text-lg leading-none text-white"
                  aria-hidden="true"
                >
                  JP
                </span>
                <span className="display-heading text-xl tracking-[0.05em]">JP FITNESS</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-md text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <m.nav
              aria-label="Mobile"
              className="container-jp flex flex-1 flex-col justify-center gap-1 pb-20"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              {navLinks.map((link) => (
                <m.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`display-heading block py-3 text-4xl ${
                      isActive(link.href) ? "text-brand" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                }}
                className="pt-8"
              >
                <a
                  href={business.whatsappHref}
                  target="_blank"
                  rel="noopener"
                  className="btn-brand w-full sm:w-auto"
                >
                  Join now on WhatsApp
                </a>
              </m.div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
