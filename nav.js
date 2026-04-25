(function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navSections = [
        {
            label: "Word Tools",
            items: [
                ["anagram-finder.html", "Anagram Finder"],
                ["word-unscrambler.html", "Word Unscrambler"],
            ],
        },
        {
            label: "Calculators",
            items: [
                ["loan-calculator.html", "Mortgage Calculator"],
                ["board-foot-calculator.html", "Board Foot Calculator"],
                ["hourly-to-yearly-salary.html", "Hourly to Yearly Salary"],
                ["yearly-to-hourly-salary.html", "Yearly to Hourly Salary"],
            ],
        },
        {
            label: "Games",
            items: [
                ["countdown-letters-game.html", "Countdown Letters"],
                ["countdown-conundrum.html", "Countdown Conundrum"],
                ["countdown-numbers-game.html", "Countdown Numbers"],
                ["canadian-tictactoe.html", "Canadian Tic Tac Toe"],
                ["canadian-goose-game.html", "Canadian Goose Game"],
            ],
        },
        {
            label: "History",
            items: [
                ["canada-history-timeline.html", "Canada History"],
                ["ontario-history-timeline.html", "Ontario History"],
                ["quebec-history-timeline.html", "Quebec History"],
            ],
        },
    ];

    const inactiveButtonClass = "text-emerald-800/70 dark:text-emerald-200/70 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all duration-300 flex items-center gap-1";
    const activeButtonClass = "text-emerald-950 dark:text-emerald-50 border-b-2 border-emerald-900 dark:border-emerald-400 pb-1 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all duration-300 flex items-center gap-1";
    const inactiveLinkClass = "px-4 py-2 text-emerald-800/70 dark:text-emerald-200/70 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 transition-colors";
    const activeLinkClass = "px-4 py-2 text-emerald-950 dark:text-emerald-50 font-semibold hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 transition-colors";

    function renderSection(section) {
        const isSectionActive = section.items.some(([href]) => href === currentPage);
        const links = section.items.map(([href, label]) => {
            const linkClass = href === currentPage ? activeLinkClass : inactiveLinkClass;
            return `<a class="${linkClass}" href="${href}">${label}</a>`;
        }).join("");

        return `
            <div class="relative group">
                <button class="${isSectionActive ? activeButtonClass : inactiveButtonClass}" type="button">
                    ${section.label} <span class="material-symbols-outlined text-base">expand_more</span>
                </button>
                <div class="absolute left-0 top-full hidden group-hover:flex group-focus-within:flex flex-col min-w-52 rounded-lg bg-white dark:bg-emerald-950 shadow-xl border border-emerald-100 dark:border-emerald-900 py-2 z-50">
                    ${links}
                </div>
            </div>
        `;
    }

    const navHtml = `
        <header class="fixed top-0 w-full z-50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl border-b border-surface-container">
            <nav class="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <a class="text-2xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter font-headline" href="index.html">u<span class="text-tertiary">can</span>doit.<span class="text-tertiary">ca</span></a>
                <div class="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
                    ${navSections.map(renderSection).join("")}
                </div>
            </nav>
        </header>
    `;

    const mount = document.getElementById("site-nav");
    if (mount) {
        mount.outerHTML = navHtml;
    } else {
        document.body.insertAdjacentHTML("afterbegin", navHtml);
    }
}());
