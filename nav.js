(function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navSections = [
        {
                label: "Word Tools",
                items: [
                        [ "anagram-finder.html", "Anagram Finder"],
                        [ "word-unscrambler.html", "Word Unscrambler"],
                        [ "word-counter.html", "Word Counter"],
                        [ "ai-text-humanizer.html", "AI Text Humanizer"]
                ]
        },
        {
                label: "Calculators",
                items: [
                        [ "loan-calculator.html", "Mortgage Calculator"],
                        [ "board-foot-calculator.html", "Board Foot Calculator"],
                        [ "salary-calculator.html", "Salary Calculator"]
                ]
        },
        {
                label: "Games",
                items: [
                        [ "countdown-letters-game.html", "Countdown Letters"],
                        [ "countdown-conundrum.html", "Countdown Conundrum"],
                        [ "countdown-numbers-game.html", "Countdown Numbers"],
                        [ "newfoundland-phrase-match.html", "Newfoundland Phrase Match"],
                        [ "canadian-tictactoe.html", "Canadian Tic Tac Toe"],
                        [ "canadian-goose-game.html", "Canadian Goose Game"]
                ]
        },
        {
                label: "History",
                items: [
                        [ "canada-history-timeline.html", "Canada History"],
                        [ "ontario-history-timeline.html", "Ontario History"],
                        [ "quebec-history-timeline.html", "Quebec History"]
                ]
        }
];

    // ── Desktop nav ────────────────────────────────────────────────────────────
    const inactiveButtonClass = "text-emerald-800/70 dark:text-emerald-200/70 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all duration-300 flex items-center gap-1";
    const activeButtonClass   = "text-emerald-950 dark:text-emerald-50 border-b-2 border-emerald-900 dark:border-emerald-400 pb-1 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all duration-300 flex items-center gap-1";
    const inactiveLinkClass   = "px-4 py-2 text-emerald-800/70 dark:text-emerald-200/70 hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 transition-colors";
    const activeLinkClass     = "px-4 py-2 text-emerald-950 dark:text-emerald-50 font-semibold hover:text-emerald-600 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 transition-colors";

    function renderDesktopSection(section) {
        const isSectionActive = section.items.some(([href]) => href === currentPage);
        const links = section.items.map(([href, label]) => {
            const cls = href === currentPage ? activeLinkClass : inactiveLinkClass;
            return `<a class="${cls}" href="${href}">${label}</a>`;
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

    // ── Mobile drawer ──────────────────────────────────────────────────────────
    function renderMobileSection(section) {
        const links = section.items.map(([href, label]) => {
            const isActive = href === currentPage;
            const cls = isActive
                ? "block px-4 py-3 text-emerald-950 font-semibold border-l-2 border-emerald-800 bg-emerald-50"
                : "block px-4 py-3 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors";
            return `<a class="${cls}" href="${href}">${label}</a>`;
        }).join("");

        return `
            <div class="mb-2">
                <p class="px-4 py-2 text-xs font-bold tracking-widest uppercase text-emerald-500">${section.label}</p>
                <div class="flex flex-col">${links}</div>
            </div>
        `;
    }

    // ── Full nav HTML ──────────────────────────────────────────────────────────
    const navHtml = `
        <header class="fixed top-0 w-full z-50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl border-b border-surface-container">
            <nav class="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
                <a class="flex items-center" href="index.html" aria-label="ucandoit.ca home">
                    <img class="h-10 w-auto" src="assets/logo.png?v=20260425" alt="ucandoit.ca"/>
                </a>
                <div class="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
                    ${navSections.map(renderDesktopSection).join("")}
                    <a href="about.html" class="${currentPage === 'about.html' ? activeButtonClass : inactiveButtonClass}">About</a>
                </div>
                <button id="nav-hamburger" class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-emerald-50 transition-colors" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-drawer">
                    <span class="block w-6 h-0.5 bg-emerald-900 transition-all duration-300" id="ham-top"></span>
                    <span class="block w-6 h-0.5 bg-emerald-900 transition-all duration-300" id="ham-mid"></span>
                    <span class="block w-6 h-0.5 bg-emerald-900 transition-all duration-300" id="ham-bot"></span>
                </button>
            </nav>
        </header>

        <!-- Mobile drawer backdrop -->
        <div id="nav-backdrop" class="fixed inset-0 z-40 bg-black/40 hidden md:hidden" aria-hidden="true"></div>

        <!-- Mobile drawer -->
        <aside id="nav-drawer" class="fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out md:hidden overflow-y-auto" aria-label="Navigation menu" aria-hidden="true">
            <div class="flex items-center justify-between px-5 py-4 border-b border-emerald-100">
                <a href="index.html" class="flex items-center" aria-label="ucandoit.ca home">
                    <img class="h-8 w-auto" src="assets/logo.png?v=20260425" alt="ucandoit.ca"/>
                </a>
                <button id="nav-drawer-close" class="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-emerald-50 transition-colors" aria-label="Close navigation menu">
                    <span class="material-symbols-outlined text-emerald-800">close</span>
                </button>
            </div>
            <nav class="py-4">
                ${navSections.map(renderMobileSection).join("")}
                <div class="mb-2">
                    <p class="px-4 py-2 text-xs font-bold tracking-widest uppercase text-emerald-500">Site</p>
                    <div class="flex flex-col">
                        <a href="about.html" class="${currentPage === 'about.html' ? 'block px-4 py-3 text-emerald-950 font-semibold border-l-2 border-emerald-800 bg-emerald-50' : 'block px-4 py-3 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors'}">About</a>
                    </div>
                </div>
            </nav>
            <div class="px-4 pb-6 mt-2 border-t border-emerald-100 pt-4">
                <a href="index.html" class="block text-center py-3 px-4 bg-emerald-900 text-white font-headline font-bold rounded-lg hover:bg-emerald-800 transition-colors">
                    Home
                </a>
            </div>
        </aside>
    `;

    const mount = document.getElementById("site-nav");
    if (mount) {
        mount.outerHTML = navHtml;
    } else {
        document.body.insertAdjacentHTML("afterbegin", navHtml);
    }

    // ── Hamburger toggle logic ─────────────────────────────────────────────────
    const hamburger = document.getElementById("nav-hamburger");
    const drawer    = document.getElementById("nav-drawer");
    const backdrop  = document.getElementById("nav-backdrop");
    const hamTop    = document.getElementById("ham-top");
    const hamMid    = document.getElementById("ham-mid");
    const hamBot    = document.getElementById("ham-bot");

    let drawerOpen = false;

    function openDrawer() {
        drawerOpen = true;
        drawer.classList.remove("translate-x-full");
        backdrop.classList.remove("hidden");
        hamburger.setAttribute("aria-expanded", "true");
        drawer.setAttribute("aria-hidden", "false");
        backdrop.setAttribute("aria-hidden", "false");
        // Animate hamburger → X
        hamTop.style.transform = "translateY(8px) rotate(45deg)";
        hamMid.style.opacity   = "0";
        hamBot.style.transform = "translateY(-8px) rotate(-45deg)";
        // Trap focus inside drawer
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        drawerOpen = false;
        drawer.classList.add("translate-x-full");
        backdrop.classList.add("hidden");
        hamburger.setAttribute("aria-expanded", "false");
        drawer.setAttribute("aria-hidden", "true");
        backdrop.setAttribute("aria-hidden", "true");
        // Restore hamburger
        hamTop.style.transform = "";
        hamMid.style.opacity   = "1";
        hamBot.style.transform = "";
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => drawerOpen ? closeDrawer() : openDrawer());
    backdrop.addEventListener("click", closeDrawer);
    document.getElementById("nav-drawer-close").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && drawerOpen) closeDrawer(); });
}());
