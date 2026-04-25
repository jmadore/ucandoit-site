// ── Timeline Render Engine ──────────────────────────────────────────────────
// Shared by canada-, ontario-, and quebec-history-timeline.html.
//
// Expects on the page before this script loads:
//   const EVENTS = [{ year, label, desc }, ...]   — timeline data
//   <div id="timeline-spine">                       — mount point
//
// year: numeric (BCE years as negative integers, e.g. -14000 = 14,000 BCE)

(function () {
    'use strict';

    const currentYear = new Date().getFullYear();
    const spine = document.getElementById('timeline-spine');

    function yearsAgoText(year) {
        const diff = year < 0 ? currentYear + Math.abs(year) : currentYear - year;
        return diff.toLocaleString('en-CA') + ' years ago';
    }

    EVENTS.forEach(function (ev, i) {
        const isLeft   = i % 2 === 0;
        const fromClass = isLeft ? 'from-left' : 'from-right';
        const ago      = yearsAgoText(ev.year);

        const card = `
        <div class="timeline-card group/card relative bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-surface-container hover:border-emerald-200 cursor-default">
            <span class="years-ago-pill absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-on-primary text-xs font-semibold font-headline px-3 py-1 rounded-full shadow-md">${ago}</span>
            <div class="flex items-start gap-3 mb-2">
                <span class="inline-block bg-tertiary text-on-tertiary text-xs font-bold font-headline px-2.5 py-0.5 rounded-full shrink-0 mt-0.5">${ev.label}</span>
            </div>
            <p class="text-sm text-on-surface-variant leading-relaxed">${ev.desc}</p>
        </div>`;

        const dot = `<div class="flex flex-col items-center shrink-0"><div class="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-surface border-2 border-white shadow-sm z-10"></div></div>`;

        const row = isLeft
            ? `<div class="timeline-item ${fromClass} mb-10 md:mb-14 md:grid md:grid-cols-[1fr_2rem_1fr] md:gap-6 md:items-center">
            <div class="md:text-right relative pb-2 md:pb-0">${card}</div>
            <div class="hidden md:flex justify-center">${dot}</div>
            <div class="hidden md:block"></div>
        </div>`
            : `<div class="timeline-item ${fromClass} mb-10 md:mb-14 md:grid md:grid-cols-[1fr_2rem_1fr] md:gap-6 md:items-center">
            <div class="hidden md:block"></div>
            <div class="hidden md:flex justify-center">${dot}</div>
            <div class="relative pb-2 md:pb-0">${card}</div>
        </div>`;

        spine.insertAdjacentHTML('beforeend', row);
    });

    // Scroll-reveal
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.timeline-item').forEach(function (el) {
        observer.observe(el);
    });
}());
