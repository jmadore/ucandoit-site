// ── Countdown Game Engine ───────────────────────────────────────────────────
// Shared utilities for all countdown-style games on ucandoit.ca.
//
// Provides three things:
//   CountdownTimer  — SVG ring timer with urgency colouring
//   CountdownMusic  — synced audio playback with sound-toggle support
//   renderTiles()   — filled / empty letter-or-number tile grid
//   setResultCard() — standardised result banner

// ---------------------------------------------------------------------------
// CountdownTimer
// ---------------------------------------------------------------------------
// Usage:
//   const timer = new CountdownTimer({
//     max:      30,
//     onTick:   (timeLeft) => { /* optional per-tick hook */ },
//     onExpire: (timeLeft) => showResult('timeout', ...),
//   });
//   timer.start();   // begins countdown from max
//   timer.stop();    // pauses (does not reset)
//   timer.reset();   // stops + restores UI to max
//   timer.timeLeft   // read current value

class CountdownTimer {
    static CIRCUMFERENCE = 263.89;

    constructor({ max = 30, onTick = null, onExpire = null } = {}) {
        this.max      = max;
        this.onTick   = onTick;
        this.onExpire = onExpire;
        this._timeLeft = max;
        this._id       = null;

        this._countEl  = document.getElementById('timer-count');
        this._circleEl = document.getElementById('timer-circle');
    }

    get timeLeft() { return this._timeLeft; }

    start() {
        this._timeLeft = this.max;
        this._updateUI();
        clearInterval(this._id);
        this._id = setInterval(() => {
            this._timeLeft--;
            this._updateUI();
            if (this.onTick) this.onTick(this._timeLeft);
            if (this._timeLeft <= 0) {
                clearInterval(this._id);
                if (this.onExpire) this.onExpire();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this._id);
    }

    reset() {
        clearInterval(this._id);
        this._timeLeft = this.max;
        this._updateUI();
    }

    _updateUI() {
        const t = this._timeLeft;
        const urgent = t <= 10;
        this._countEl.textContent = t;
        this._circleEl.style.strokeDashoffset =
            CountdownTimer.CIRCUMFERENCE * (1 - t / this.max);
        this._countEl.classList.toggle('text-primary',   !urgent);
        this._countEl.classList.toggle('text-red-500',    urgent);
        this._circleEl.classList.toggle('text-tertiary', !urgent);
        this._circleEl.classList.toggle('text-red-500',   urgent);
    }
}

// ---------------------------------------------------------------------------
// CountdownMusic
// ---------------------------------------------------------------------------
// Usage:
//   const music = new CountdownMusic({ timerMax: 30 });
//   music.play(timeLeft);       // syncs playback position to current time left
//   music.stop();               // pause + rewind
//   music.handleToggle(phase);  // call from sound-toggle change event

class CountdownMusic {
    constructor({ timerMax = 30, musicId = 'countdown-music', toggleId = 'sound-toggle' } = {}) {
        this.timerMax  = timerMax;
        this._musicEl  = document.getElementById(musicId);
        this._toggleEl = document.getElementById(toggleId);
    }

    play(timeLeft) {
        if (!this._toggleEl.checked) return;
        this._musicEl.currentTime = Math.min(this.timerMax - timeLeft, this.timerMax);
        this._musicEl.play().catch(() => {
            this._toggleEl.checked = false;
        });
    }

    stop() {
        this._musicEl.pause();
        this._musicEl.currentTime = 0;
    }

    handleToggle(phase) {
        if (this._toggleEl.checked && phase === 'playing') {
            // Caller must pass current timeLeft — use play() directly instead
        } else {
            this.stop();
        }
    }
}

// ---------------------------------------------------------------------------
// renderTiles(containerId, values, totalSlots)
// ---------------------------------------------------------------------------
// Renders a row of letter/number tiles.
//   containerId  — id of the container element
//   values       — array of strings/numbers currently drawn (can be empty)
//   totalSlots   — total tile count (9 for letters/conundrum, 6 for numbers)

function renderTiles(containerId, values, totalSlots) {
    const container = document.getElementById(containerId);
    while (container.firstChild) container.removeChild(container.firstChild);

    for (let i = 0; i < totalSlots; i++) {
        const el = document.createElement('div');
        if (i < values.length) {
            el.className = 'aspect-[4/5] min-w-0 bg-surface-container-lowest rounded-lg flex items-center justify-center border-b-4 border-outline-variant tile-shadow';
            const span = document.createElement('span');
            span.className = 'text-2xl sm:text-3xl md:text-4xl font-black font-headline text-primary';
            span.textContent = values[i];
            el.appendChild(span);
        } else {
            el.className = 'aspect-[4/5] min-w-0 bg-surface-container-highest/30 rounded-lg flex items-center justify-center border-2 border-dashed border-outline-variant/50';
            const icon = document.createElement('span');
            icon.className = 'material-symbols-outlined text-outline-variant text-xl sm:text-2xl';
            icon.textContent = 'question_mark';
            el.appendChild(icon);
        }
        container.appendChild(el);
    }
}

// ---------------------------------------------------------------------------
// setResultCard(containerId, { theme, title, subtitle, extra })
// ---------------------------------------------------------------------------
// Renders the result banner beneath the game board.
//   containerId  — id of the result element (typically 'game-result')
//   theme        — 'success' | 'error' | 'neutral'
//   title        — bold headline string
//   subtitle     — smaller muted string (optional)
//   extra        — a DOM node to append after subtitle (optional)

const RESULT_THEMES = {
    success: 'bg-secondary-container border-secondary',
    error:   'bg-error-container border-error',
    neutral: 'bg-surface-container-low border-outline-variant',
};

function setResultCard(containerId, { theme = 'neutral', title = '', subtitle = '', extra = null } = {}) {
    const el = document.getElementById(containerId);
    el.className = 'mt-4 p-6 rounded-xl border-l-4 ' + (RESULT_THEMES[theme] ?? RESULT_THEMES.neutral);
    el.classList.remove('hidden');
    while (el.firstChild) el.removeChild(el.firstChild);

    const titleEl = document.createElement('p');
    titleEl.className = 'font-headline font-bold text-xl';
    titleEl.textContent = title;
    el.appendChild(titleEl);

    if (subtitle) {
        const subEl = document.createElement('p');
        subEl.className = 'text-sm text-on-surface-variant mt-1';
        subEl.textContent = subtitle;
        el.appendChild(subEl);
    }

    if (extra) el.appendChild(extra);
}
