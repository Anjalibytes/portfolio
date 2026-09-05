/* ==========================================================================
   PORTFOLIO SCRIPT
   Each section below is a separate, self-contained feature.
   Read them one at a time — they don't depend on each other.
   ========================================================================== */


/* ==========================================================================
  

/* ==========================================================================
   2. QUOTE ROTATOR
   Needs a button in your #quote section, e.g.:
     <button id="new-thought">New thought</button>
   And your blockquote/author/note wrapped with ids:
     <blockquote id="quote-text">...</blockquote>
     <p id="quote-author">...</p>
     <p id="quote-note">...</p>
   ========================================================================== */

// An array of objects — each object holds one quote's full info.
// Add as many as you like; the code below doesn't need to change.

 const quotes = [
  {
    text: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott",
    note: "i am afraid of not able to sail through!"
  },
  {
    text: "Not everything I build needs to stay. Some days, the best progress is what I remove.",
    author: "Anjali",
    note: "felt true today — cut dark mode and notes, kept it simple"
  },
  {
    text: "I am free and that is why I am lost.",
    author: "Franz Kafka",
    note: "I am lost."
  },
  {
    text: "A writer doesn't wait for the perfect day—they write until today becomes worth remembering.",
    author: "Anjali",
    note: "just a thought"
  },
  {
    text: "I love deadlines. I love the whooshing noise they make as they go by.",
    author: "Douglas Adams",
    note: "felt this while coding today"
  },
  {
    text: "Always remember that you are absolutely unique. Just like everyone else.",
    author: "Margaret Mead",
    note: "felt weirdly comforting today"
  }
];


const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const quoteNoteEl = document.getElementById('quote-note');
const newThoughtBtn = document.getElementById('new-thought');

// A function so we can reuse this logic (called on button click).
function showRandomQuote() {
  // Math.random() gives a decimal between 0 and 1.
  // Multiplying by array length and flooring gives a valid random index.
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const chosen = quotes[randomIndex];

  if (quoteTextEl) quoteTextEl.textContent = `"${chosen.text}"`;
  if (quoteAuthorEl) quoteAuthorEl.textContent = `— ${chosen.author}`;
  if (quoteNoteEl) quoteNoteEl.textContent = chosen.note;
}

if (newThoughtBtn) {
  newThoughtBtn.addEventListener('click', showRandomQuote);
}


/* ==========================================================================
   3. ACTIVE NAV LINK ON SCROLL
   Highlights the nav link for whichever section is currently in view.
   Works automatically with your existing <section id="..."> elements
   and nav <a href="#..."> links — no extra HTML needed.
   ========================================================================== */

// Get every section that has an id, and every nav link.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', function () {
  let currentSectionId = '';

  sections.forEach(function (section) {
    // getBoundingClientRect() tells us the section's position
    // relative to the top of the visible browser window.
    const sectionTop = section.getBoundingClientRect().top;

    // If the section's top has scrolled above roughly 120px from
    // the top of the screen, treat it as the "current" section.
    if (sectionTop < 120) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active-link');

    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active-link');
    }
  });
});


/* ==========================================================================
   4. "DAY X OF JOURNALING" COUNTER
   Needs an element to display it, e.g. in your hero:
     <p id="day-counter"></p>
   Change startDate below to whenever you actually started this project.
   ========================================================================== */

const dayCounterEl = document.getElementById('day-counter');

if (dayCounterEl) {
  const startDate = new Date('2026-07-08'); // <-- change to your Day 1 date
  const today = new Date();

  // Subtracting two Date objects gives milliseconds; convert to days.
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysSoFar = Math.floor((today - startDate) / msPerDay) + 1;

  dayCounterEl.textContent = `Day ${daysSoFar} of this journal.`;
}
/* ==========================================================================
   5. SCROLL REVEAL
   Sections fade/slide in as you scroll to them, using IntersectionObserver —
   a "watcher" that tells us when an element enters the visible screen.
   ========================================================================== */

const revealTargets = document.querySelectorAll('main section, footer #quote');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Stop watching once revealed — no need to keep checking.
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15 // fires when 15% of the section is visible
});

revealTargets.forEach(function (target) {
  target.classList.add('reveal');
  revealObserver.observe(target);
});