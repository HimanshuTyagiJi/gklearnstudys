// To avoid polluting the global scope, we'll attach our data and functions to a single object.
window.GKApp = window.GKApp || {};

// The search data for the entire website.
window.GKApp.searchData = [
  {
    "title": "Unit Conversion: Definition and Importance in Daily Life and Science",
    "url": "/conversion.html",
    "paragraph": "Unit conversion is the process of converting a quantity expressed in one unit to another. It helps in standardizing measurements and makes calculations simpler.",
    "image": "/images/conversion.webp",
    "date": "October 26, 2023",
    "author": "GK Learn Study",
    "category": "Unit Conversion"
  },
  {
    "title": "Angle Conversion: Definition, Types, and Practical Applications",
    "url": "/conversion/angle-unit-conversion",
    "paragraph": "Angle conversion is the process of converting angles between different units like degrees, radians, and gradians. Types: 1. Degree to Radian 2. Radian to Degree.",
    "image": "/images/angle-unit-conversion.webp",
    "date": "October 22, 2023",
    "author": "Himanshu Tyagi",
    "category": "Angle Conversion"
  },
  {
    "title": "Understanding Different Systems of Measurement: Metric vs. Imperial",
    "url": "/conversion/measurement-systems",
    "paragraph": "Explore the Metric and Imperial systems, their history, and where they are used today. Learn the fundamental units for length, mass, and volume in each system.",
    "image": "/images/measurement-systems.webp",
    "date": "October 18, 2023",
    "author": "GK Learn Study",
    "category": "Measurements"
  },
  {
    "title": "Why is the Sky Blue? A Simple Explanation for a Curious Mind",
    "url": "/gk/why-is-sky-blue",
    "paragraph": "Discover the science of Rayleigh scattering and how sunlight interacts with Earth's atmosphere to create the blue hue we see on a clear day.",
    "image": "/images/sky-blue.webp",
    "date": "October 15, 2023",
    "author": "Science Explorer",
    "category": "General Knowledge"
  },
  {
    "title": "What is an Algorithm? A Beginner's Guide to Problem Solving in Computer Science",
    "url": "/computer/what-is-algorithm",
    "paragraph": "An algorithm is a set of step-by-step instructions for solving a problem. Learn their role in computer science, from simple sorting to complex AI models.",
    "image": "/images/algorithm-concept.webp",
    "date": "October 11, 2023",
    "author": "Tech Simplified",
    "category": "Science & Tech"
  },
  {
    "title": "Common Temperature Conversions: Celsius, Fahrenheit, and Kelvin",
    "url": "/conversion/temperature-conversion",
    "paragraph": "A practical guide to converting temperatures between Celsius, Fahrenheit, and Kelvin. Includes formulas and examples for everyday and scientific use.",
    "image": "/images/temperature-conversion.webp",
    "date": "October 07, 2023",
    "author": "GK Learn Study",
    "category": "Unit Conversion"
  },
  {
    "title": "How to Measure Area and Volume Accurately for Any Shape",
    "url": "/conversion/area-volume-measurement",
    "paragraph": "Learn the basic formulas for calculating the area of common shapes like squares and circles, and the volume of cubes and spheres. Essential for home projects.",
    "image": "/images/area-volume.webp",
    "date": "October 03, 2023",
    "author": "Himanshu Tyagi",
    "category": "Measurements"
  },
  {
    "title": "The Seven Wonders of the Ancient World: A Journey Through History",
    "url": "/gk/ancient-wonders",
    "paragraph": "A journey back in time to explore magnificent structures. From the Great Pyramid of Giza to the Hanging Gardens of Babylon, discover their legends.",
    "image": "/images/ancient-wonders.webp",
    "date": "September 29, 2023",
    "author": "History Buff",
    "category": "General Knowledge"
  },
  {
    "title": "What is Cloud Computing? A Beginner's Guide to IaaS, PaaS, and SaaS",
    "url": "/computer/what-is-cloud-computing",
    "paragraph": "Cloud computing is the delivery of services through the Internet, including data storage, servers, databases, networking, and software. Learn the basics.",
    "image": "/images/cloud-computing.webp",
    "date": "September 25, 2023",
    "author": "Tech Simplified",
    "category": "Science & Tech"
  },
  {
    "title": "A Grand Tour of Our Solar System and Its Many Wonders",
    "url": "/gk/solar-system-tour",
    "paragraph": "Embark on a virtual journey through our solar system. Learn fascinating facts about the Sun, the eight planets, and other celestial bodies like asteroids and comets.",
    "image": "/images/solar-system.webp",
    "date": "September 21, 2023",
    "author": "Science Explorer",
    "category": "General Knowledge"
  }
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
window.GKApp.fuzzySearch = function(query, items) {
  const lowerCaseQuery = query.toLowerCase().trim();
  if (!lowerCaseQuery) {
    return [];
  }

  const queryWords = lowerCaseQuery.split(' ').filter(w => w.length > 1);

  const results = items.map(item => {
    let score = 0;
    const title = item.title.toLowerCase();
    const paragraph = item.paragraph.toLowerCase();
    const author = item.author.toLowerCase();
    
    // Direct full-phrase matches get high scores
    if (title.includes(lowerCaseQuery)) score += 20;
    if (paragraph.includes(lowerCaseQuery)) score += 5;

    // Word-based scoring for fuzzy matching
    queryWords.forEach(qWord => {
      // High score for words in title
      if (title.includes(qWord)) score += 10;
      // Medium score for words in paragraph
      if (paragraph.includes(qWord)) score += 2;
       // Low score for words in author
      if (author.includes(qWord)) score += 1;
    });

    return { item: item, score: score };
  })
  .filter(result => result.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(result => result.item);

  // Remove potential duplicates if an item matches multiple criteria
  // This ensures each post appears only once in the results.
  return [...new Map(results.map(item => [item.url, item])).values()];
};