// To avoid polluting the global scope, we'll attach our data and functions to a single object.
window.GKApp = window.GKApp || {};

// The search data for the entire website.
window.GKApp.searchData = [
  {
    title:
      "Unit Conversion: Definition and Importance in Daily Life and Science",
    url: "/conversion.html",
    paragraph:
      "Unit conversion is the process of converting a quantity expressed in one unit to another. It helps in standardizing measurements and makes calculations simpler.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.unit-text{font:bold 12px sans-serif;fill:#2c3e50;}.arrow{fill:#3498db;animation:move-arrow 2s ease-in-out infinite alternate;}@keyframes move-arrow{to{transform:translateX(40px)}}</style>
        <text x="10" y="30" class="unit-text">Meters</text>
        <path class="arrow" d="M 30 50 L 50 50 L 45 45 M 50 50 L 45 55" />
        <text x="70" y="70" class="unit-text">Feet</text>
    </svg>`,
    date: "October 26, 2023",
    author: "GK Learn Study",
    category: "Unit Conversion",
  },
  {
    title: "Angle Conversion: Definition, Types, and Practical Applications",
    url: "/conversion/angle-unit-conversion",
    paragraph:
      "Angle conversion is the process of converting angles between different units like degrees, radians, and gradians. Types: 1. Degree to Radian 2. Radian to Degree.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.protractor-base{fill:#3498db;opacity:0.2;}.protractor-lines{stroke:#3498db;stroke-width:1;}.needle{stroke:#e74c3c;stroke-width:3;transform-origin:50px 90px;animation:sweep-angle 4s ease-in-out infinite alternate;}@keyframes sweep-angle{from{transform:rotate(-60deg)}to{transform:rotate(60deg)}}</style>
        <path class="protractor-base" d="M10 90 A 40 40 0 0 1 90 90 Z" />
        <path class="protractor-lines" d="M10 90 A 40 40 0 0 1 90 90" />
        <line class="needle" x1="50" y1="90" x2="50" y2="30" />
    </svg>`,
    date: "October 22, 2023",
    author: "Himanshu Tyagi",
    category: "Angle Conversion",
  },
  {
    title:
      "Understanding Different Systems of Measurement: Metric vs. Imperial",
    url: "/conversion/measurement-systems",
    paragraph:
      "Explore the Metric and Imperial systems, their history, and where they are used today. Learn the fundamental units for length, mass, and volume in each system.",
    image: "/images/measurement-systems.webp",
    date: "October 18, 2023",
    author: "GK Learn Study",
    category: "Measurements",
  },
  {
    title: "Why is the Sky Blue? A Simple Explanation for a Curious Mind",
    url: "/gk/why-is-sky-blue",
    paragraph:
      "Discover the science of Rayleigh scattering and how sunlight interacts with Earth's atmosphere to create the blue hue we see on a clear day.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.sun{fill:#FFC107;animation:pulse-sun 2s infinite}.ray{stroke:#FFF;stroke-width:2;transform-origin:center;animation:scatter 1.5s ease-out infinite}.blue-dot{fill:#3498db;r:2;opacity:0;animation:fade-in-out 1.5s infinite}@keyframes pulse-sun{50%{transform:scale(1.1)}}@keyframes scatter{to{transform:scale(1.5);opacity:0}}@keyframes fade-in-out{50%{opacity:1}}</style>
        <circle class="sun" cx="20" cy="20" r="15"/>
        <line class="ray" x1="20" y1="20" x2="80" y2="80"/>
        <circle class="blue-dot" cx="60" cy="40" style="animation-delay:-0.2s"/><circle class="blue-dot" cx="40" cy="60" style="animation-delay:-0.4s"/><circle class="blue-dot" cx="70" cy="50" style="animation-delay:-0.6s"/>
    </svg>`,
    date: "October 15, 2023",
    author: "Science Explorer",
    category: "General Knowledge",
  },
  {
    title:
      "What is an Algorithm? A Beginner's Guide to Problem Solving in Computer Science",
    url: "/computer/what-is-algorithm",
    paragraph:
      "An algorithm is a set of step-by-step instructions for solving a problem. Learn their role in computer science, from simple sorting to complex AI models.",
    image: "/images/algorithm-guide.webp",
    date: "October 11, 2023",
    author: "Tech Simplified",
    category: "Science & Tech",
  },
  {
    title: "Common Temperature Conversions: Celsius, Fahrenheit, and Kelvin",
    url: "/conversion/temperature-conversion",
    paragraph:
      "A practical guide to converting temperatures between Celsius, Fahrenheit, and Kelvin. Includes formulas and examples for everyday and scientific use.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.thermo-glass{fill:#ecf0f1;stroke:#bdc3c7;stroke-width:2}.thermo-liquid{fill:#e74c3c;animation:temp-change 4s infinite alternate}@keyframes temp-change{0%{transform:translateY(0);fill:#3498db}100%{transform:translateY(-30px);fill:#e74c3c}}</style>
        <rect x="40" y="10" width="20" height="80" rx="10" class="thermo-glass" /><circle cx="50" cy="80" r="15" class="thermo-glass" />
        <rect x="45" y="50" width="10" height="30" class="thermo-liquid" /><circle cx="50" cy="80" r="10" class="thermo-liquid" />
    </svg>`,
    date: "October 07, 2023",
    author: "GK Learn Study",
    category: "Unit Conversion",
  },
  {
    title: "How to Measure Area and Volume Accurately for Any Shape",
    url: "/conversion/area-volume-measurement",
    paragraph:
      "Learn the basic formulas for calculating the area of common shapes like squares and circles, and the volume of cubes and spheres. Essential for home projects.",
    image: "/images/area-volume.webp",
    date: "October 03, 2023",
    author: "Himanshu Tyagi",
    category: "Measurements",
  },
  {
    title: "The Seven Wonders of the Ancient World: A Journey Through History",
    url: "/gk/ancient-wonders",
    paragraph:
      "A journey back in time to explore magnificent structures. From the Great Pyramid of Giza to the Hanging Gardens of Babylon, discover their legends.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.pyramid-base{fill:#f1c40f;}.pyramid-layer{fill:#f39c12;stroke:#c0392b;stroke-width:1;opacity:0;animation:build-pyramid 5s linear infinite;}@keyframes build-pyramid{0%{opacity:0;transform:translateY(30px)}20%{opacity:1;transform:translateY(0)}100%{opacity:1}}</style>
        <polygon class="pyramid-base" points="10,90 90,90 50,30" />
        <rect class="pyramid-layer" x="20" y="70" width="60" height="20" style="animation-delay:0s" />
        <rect class="pyramid-layer" x="30" y="50" width="40" height="20" style="animation-delay:1.5s" />
        <rect class="pyramid-layer" x="40" y="30" width="20" height="20" style="animation-delay:3s" />
    </svg>`,
    date: "September 29, 2023",
    author: "History Buff",
    category: "General Knowledge",
  },
  {
    title:
      "What is Cloud Computing? A Beginner's Guide to IaaS, PaaS, and SaaS",
    url: "/computer/what-is-cloud-computing",
    paragraph:
      "Cloud computing is the delivery of services through the Internet, including data storage, servers, databases, networking, and software. Learn the basics.",
    image: "/images/cloud-computing.webp",
    date: "September 25, 2023",
    author: "Tech Simplified",
    category: "Science & Tech",
  },
  {
    title: "A Grand Tour of Our Solar System and Its Many Wonders",
    url: "/gk/solar-system-tour",
    paragraph:
      "Embark on a virtual journey through our solar system. Learn fascinating facts about the Sun, the eight planets, and other celestial bodies like asteroids and comets.",
    svg: `<svg viewBox="0 0 100 100">
        <style>.sun{fill:#f1c40f;}.orbit{stroke:#7f8c8d;stroke-width:0.5;fill:none}.planet{animation:orbit-planet 8s linear infinite}@keyframes orbit-planet{to{transform:rotate(360deg)}}</style>
        <circle class="sun" cx="50" cy="50" r="15"/>
        <g style="transform-origin:center">
            <circle class="orbit" cx="50" cy="50" r="30"/>
            <circle class="planet" cx="80" cy="50" r="5" fill="#e74c3c" style="animation-duration:5s"/>
            <circle class="orbit" cx="50" cy="50" r="45"/>
            <circle class="planet" cx="95" cy="50" r="8" fill="#3498db" style="animation-duration:12s"/>
        </g>
    </svg>`,
    date: "September 21, 2023",
    author: "Science Explorer",
    category: "General Knowledge",
  },
];

/**
 * Performs a fuzzy search on an array of items based on a query.
 * It scores matches based on where they are found (title, paragraph, author)
 * and sorts the results by the highest score.
 *
 * @param {string} query - The search query from the user.
 * @param {Array<Object>} items - The array of post objects to search through.
 * @returns {Array<Object>} - The filtered and sorted array of post objects.
 */
window.GKApp.fuzzySearch = function (query, items) {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) {
    return [];
  }

  const queryWords = lowerCaseQuery.split(" ").filter((w) => w.length > 1);

  const results = items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const paragraph = item.paragraph.toLowerCase();
      const author = item.author.toLowerCase();

      // Direct full-phrase matches get high scores
      if (title.includes(lowerCaseQuery)) score += 20;
      if (paragraph.includes(lowerCaseQuery)) score += 5;

      // Word-based scoring for fuzzy matching
      queryWords.forEach((qWord) => {
        // High score for words in title
        if (title.includes(qWord)) score += 10;
        // Medium score for words in paragraph
        if (paragraph.includes(qWord)) score += 2;
        // Low score for words in author
        if (author.includes(qWord)) score += 1;
      });

      return { item: item, score: score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.item);

  // Remove potential duplicates if an item matches multiple criteria
  // This ensures each post appears only once in the results.
  return [...new Map(results.map((item) => [item.url, item])).values()];
};
