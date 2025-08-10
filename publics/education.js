
document.addEventListener('DOMContentLoaded', () => {

    const allFormulasChapters = [
        {
            title: 'Mathematics Formulas',
            url: '/math-formulas.html',
            description: 'Key formulas for algebra, geometry, trigonometry, and calculus. Your essential math reference.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .formula-text { font-family: 'Times New Roman', serif; fill: #34495e; opacity: 0; animation: fadeIn 1s ease forwards; }
                        .text-e { font-size: 24px; animation-delay: 0.5s; }
                        .text-eq { font-size: 24px; animation-delay: 1s; }
                        .text-mc { font-size: 24px; animation-delay: 1.5s; }
                        .text-2 { font-size: 16px; animation-delay: 2s; }
                        .glow { fill: #f1c40f; filter: url(#glow-effect); opacity: 0; animation: flash-glow 1.5s ease-out 2.5s forwards; }
                        @keyframes fadeIn { to { opacity: 1; } }
                        @keyframes flash-glow { 0% { opacity: 0; } 50% { opacity: 0.8; } 100% { opacity: 0; } }
                    </style>
                    <defs>
                        <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <text x="15" y="60" class="formula-text text-e">E</text>
                    <text x="35" y="60" class="formula-text text-eq">=</text>
                    <text x="50" y="60" class="formula-text text-mc">mc</text>
                    <text x="80" y="52" class="formula-text text-2">2</text>
                    <text x="15" y="60" class="glow text-e">E</text>
                    <text x="35" y="60" class="glow text-eq">=</text>
                    <text x="50" y="60" class="glow text-mc">mc</text>
                    <text x="80" y="52" class="glow text-2">2</text>
                </svg>
            `
        },
        {
            title: 'Physics Formulas',
            url: '/physics-formulas.html',
            description: 'Essential equations for mechanics, electromagnetism, and thermodynamics. Unlock the laws of the universe.',
            svg: `
                <svg viewBox="0 0 100 100">
                     <style>
                        .fma-text { font: bold 22px sans-serif; fill: #2c3e50; }
                        .block { fill: #c0392b; stroke: #2c3e50; stroke-width: 1; }
                        .arrow { fill: #2980b9; }
                        .force-arrow, .accel-arrow { opacity: 0; animation: draw-arrow 1s forwards 1s; }
                        .block { animation: move-block 1s forwards 2s; }
                        @keyframes draw-arrow { to { opacity: 1; } }
                        @keyframes move-block { to { transform: translateX(20px); } }
                    </style>
                    <text x="5" y="25" class="fma-text">F = m</text>
                    <text x="75" y="25" class="fma-text">a</text>
                    <rect class="block" x="30" y="50" width="40" height="30" />
                    <g class="force-arrow">
                        <path class="arrow" d="M 5 65 H 25 L 20 60 M 25 65 L 20 70" />
                    </g>
                     <g class="accel-arrow" transform="translate(20, 0)">
                        <path class="arrow" d="M 75 65 H 95 L 90 60 M 95 65 L 90 70" />
                    </g>
                </svg>
            `
        },
        {
            title: 'Chemistry Formulas',
            url: '/chemistry-formulas.html',
            description: 'From molecular structures to reaction equations, find the formulas that explain the world of chemistry.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .benzene-ring {
                            stroke: #34495e; stroke-width: 4; fill: none;
                            transform-origin: center; animation: rotate-ring 12s linear infinite;
                        }
                        .double-bond {
                            stroke: #34495e; stroke-width: 4; fill: none;
                            transform-origin: center; animation: rotate-ring 12s linear infinite, blink-bond 2s infinite alternate;
                        }
                        @keyframes rotate-ring { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                        @keyframes blink-bond {
                           from { opacity: 1; }
                           to { opacity: 0.4; }
                        }
                    </style>
                    <polygon class="benzene-ring" points="50,10 85,30 85,70 50,90 15,70 15,30" />
                    <line class="double-bond" x1="85" y1="30" x2="85" y2="70" style="animation-delay: -0.5s;"/>
                    <line class="double-bond" x1="50" y1="90" x2="15" y2="70" style="animation-delay: -1s;"/>
                    <line class="double-bond" x1="15" y1="30" x2="50" y2="10" style="animation-delay: -1.5s;"/>
                </svg>
            `
        }
    ];

    const conversionChapters = [
        {
            title: 'Angle Conversion',
            description: 'Convert between degrees, radians, and gradians. Essential for geometry and physics calculations.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .protractor-base { fill: #3498db; opacity: 0.2; }
                        .protractor-lines { stroke: #3498db; stroke-width: 1; }
                        .needle { stroke: #e74c3c; stroke-width: 3; transform-origin: 50px 90px; animation: sweep-angle 4s ease-in-out infinite alternate; }
                        @keyframes sweep-angle { from { transform: rotate(-60deg); } to { transform: rotate(60deg); } }
                    </style>
                    <path class="protractor-base" d="M10 90 A 40 40 0 0 1 90 90 Z" />
                    <path class="protractor-lines" d="M10 90 A 40 40 0 0 1 90 90" />
                    <line class="protractor-lines" x1="50" y1="90" x2="50" y2="50" />
                    <line class="protractor-lines" x1="10" y1="90" x2="90" y2="90" />
                    <line class="needle" x1="50" y1="90" x2="50" y2="30" />
                </svg>
            `
        },
        {
            title: 'Area Conversion',
            description: 'Switch between square meters, feet, acres, and more. Perfect for real estate and projects.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .grid-bg { fill: #ecf0f1; }
                        .grid-cell { fill: #2ecc71; opacity: 0; animation: fill-grid 3s linear infinite; }
                        @keyframes fill-grid {
                            0% { opacity: 0; }
                            20% { opacity: 1; }
                            100% { opacity: 1; }
                        }
                    </style>
                    <rect class="grid-bg" width="100" height="100"/>
                    <g>
                        <rect class="grid-cell" x="10" y="10" width="20" height="20" style="animation-delay: 0s" />
                        <rect class="grid-cell" x="40" y="10" width="20" height="20" style="animation-delay: 0.3s" />
                        <rect class="grid-cell" x="70" y="10" width="20" height="20" style="animation-delay: 0.6s" />
                        <rect class="grid-cell" x="10" y="40" width="20" height="20" style="animation-delay: 0.9s" />
                        <rect class="grid-cell" x="40" y="40" width="20" height="20" style="animation-delay: 1.2s" />
                        <rect class="grid-cell" x="70" y="40" width="20" height="20" style="animation-delay: 1.5s" />
                        <rect class="grid-cell" x="10" y="70" width="20" height="20" style="animation-delay: 1.8s" />
                        <rect class="grid-cell" x="40" y="70" width="20" height="20" style="animation-delay: 2.1s" />
                        <rect class="grid-cell" x="70" y="70" width="20" height="20" style="animation-delay: 2.4s" />
                    </g>
                </svg>
            `
        },
        {
            title: 'Length Conversion',
            description: 'Easily convert between meters, feet, inches, miles, and kilometers for any measurement need.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .ruler-body { fill: #f1c40f; }
                        .ruler-mark { stroke: #34495e; stroke-width: 1.5; }
                        .measure-line { stroke: #e74c3c; stroke-width: 3; stroke-dasharray: 80; stroke-dashoffset: 80; animation: draw-measure 3s ease-out infinite; }
                        @keyframes draw-measure {
                            0% { stroke-dashoffset: 80; }
                            50% { stroke-dashoffset: 0; }
                            100% { stroke-dashoffset: 80; }
                        }
                    </style>
                    <rect class="ruler-body" y="40" width="100" height="20" rx="5" />
                    <line class="ruler-mark" x1="10" y1="40" x2="10" y2="60" />
                    <line class="ruler-mark" x1="30" y1="40" x2="30" y2="60" />
                    <line class="ruler-mark" x1="50" y1="40" x2="50" y2="60" />
                    <line class="ruler-mark" x1="70" y1="40" x2="70" y2="60" />
                    <line class="ruler-mark" x1="90" y1="40" x2="90" y2="60" />
                    <line class="measure-line" x1="10" y1="75" x2="90" y2="75" />
                </svg>
            `
        },
        {
            title: 'Temperature Conv.',
            description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin for weather, cooking, or science.',
            svg: `
                 <svg viewBox="0 0 100 100">
                    <style>
                        .thermo-glass { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 2; }
                        .thermo-liquid { fill: #e74c3c; animation: temp-change 4s infinite alternate; }
                        .celsius, .fahrenheit { font: 10px sans-serif; fill: #2c3e50; }
                        @keyframes temp-change { 
                            0% { transform: translateY(0); fill: #3498db; } 
                            100% { transform: translateY(-30px); fill: #e74c3c; } 
                        }
                    </style>
                    <rect x="40" y="10" width="20" height="80" rx="10" class="thermo-glass" />
                    <circle cx="50" cy="80" r="15" class="thermo-glass" />
                    <rect x="45" y="50" width="10" height="30" class="thermo-liquid" />
                    <circle cx="50" cy="80" r="10" class="thermo-liquid" />
                    <text class="celsius" x="20" y="80">0°C</text>
                    <text class="celsius" x="20" y="20">100°C</text>
                    <text class="fahrenheit" x="65" y="80">32°F</text>
                    <text class="fahrenheit" x="65" y="20">212°F</text>
                </svg>
            `
        }
    ];
    
    const vyakaranChapters = [
        {
            title: 'संज्ञा (Noun)',
            description: 'नाम, स्थान, वस्तु, या विचार का बोध कराने वाले शब्द। जानें संज्ञा के प्रकार और उदाहरण।',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #e67e22; text-anchor: middle; }
                        .vyakaran-icon { opacity: 0; animation: fadeInScale 1s ease-out forwards; }
                        .icon-person { animation-delay: 0.5s; fill: #3498db; }
                        .icon-place { animation-delay: 1s; fill: #2ecc71; }
                        .icon-thing { animation-delay: 1.5s; fill: #9b59b6; }
                        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title">संज्ञा</text>
                    <!-- Person Icon -->
                    <circle class="vyakaran-icon icon-person" cx="25" cy="65" r="10"/>
                    <rect class="vyakaran-icon icon-person" x="18" y="75" width="14" height="15" rx="5"/>
                    <!-- Place Icon (House) -->
                    <polygon class="vyakaran-icon icon-place" points="40,55 60,55 50,45" />
                    <rect class="vyakaran-icon icon-place" x="42" y="55" width="16" height="20"/>
                    <!-- Thing Icon (Apple) -->
                    <path class="vyakaran-icon icon-thing" d="M75,55 C65,55 65,65 70,70 S80,75 80,65 C85,55 80,55 75,55 Z" />
                    <path class="vyakaran-icon icon-thing" d="M75,55 Q 80 50, 78 45" stroke="#16a085" stroke-width="2" fill="none"/>
                </svg>
            `
        },
        {
            title: 'सर्वनाम (Pronoun)',
            description: 'संज्ञा के स्थान पर प्रयुक्त होने वाले शब्द। मैं, तुम, वह, आदि के प्रयोग सीखें।',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #c0392b; text-anchor: middle; }
                        .pronoun-text { font: 20px 'Hind', sans-serif; fill: #2c3e50; opacity: 0; animation: popIn 0.8s forwards; }
                        .p1 { animation-delay: 0.5s; } .p2 { animation-delay: 1s; } .p3 { animation-delay: 1.5s; }
                        .arrow-path { stroke: #3498db; stroke-width: 3; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawPath 1.5s forwards 1.8s; }
                        @keyframes popIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                        @keyframes drawPath { to { stroke-dashoffset: 0; } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title">सर्वनाम</text>
                    <text x="15" y="60" class="pronoun-text p1">मैं</text>
                    <text x="45" y="80" class="pronoun-text p2">तुम</text>
                    <text x="75" y="60" class="pronoun-text p3">वह</text>
                    <path class="arrow-path" d="M25,65 Q 50,50 75,65" />
                </svg>
            `
        },
        {
            title: 'क्रिया (Verb)',
            description: 'किसी कार्य के करने या होने का बोध कराने वाले शब्द। जानें क्रिया के भेद और रचना।',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .vyakaran-title { font: bold 24px 'Hind', sans-serif; fill: #27ae60; text-anchor: middle; }
                        .stick-figure { stroke: #34495e; stroke-width: 4; fill: none; }
                        .leg1 { transform-origin: 50px 60px; animation: run-leg1 0.5s infinite alternate; }
                        .leg2 { transform-origin: 50px 60px; animation: run-leg2 0.5s infinite alternate; }
                        @keyframes run-leg1 { from { transform: rotate(-30deg); } to { transform: rotate(30deg); } }
                        @keyframes run-leg2 { from { transform: rotate(30deg); } to { transform: rotate(-30deg); } }
                    </style>
                    <text x="50" y="30" class="vyakaran-title">क्रिया</text>
                    <!-- Body -->
                    <circle class="stick-figure" cx="50" cy="50" r="10" />
                    <line class="stick-figure" x1="50" y1="60" x2="50" y2="80" />
                    <!-- Legs -->
                    <line class="stick-figure leg1" x1="50" y1="80" x2="40" y2="100" />
                    <line class="stick-figure leg2" x1="50" y1="80" x2="60" y2="100" />
                    <!-- Arms -->
                    <line class="stick-figure leg2" x1="50" y1="65" x2="65" y2="75" />
                    <line class="stick-figure leg1" x1="50" y1="65" x2="35" y2="75" />
                </svg>
            `
        },
    ];

    const mathsChapters = [
        {
            title: 'Algebra',
            description: 'Learn the fundamentals of variables, expressions, and equations. The building block of higher mathematics.',
            svg: `
                <svg viewBox="-10 -10 120 120">
                    <style>
                        .alg-text { font: bold 30px sans-serif; fill: #3498db; animation: pop-in 1s ease forwards; opacity: 0; }
                        .alg-text.t1 { animation-delay: 0.2s; }
                        .alg-text.t2 { animation-delay: 0.6s; }
                        .alg-text.t3 { animation-delay: 1.0s; }
                        @keyframes pop-in { 0% { opacity: 0; transform: scale(0.5); } 100% { opacity: 1; transform: scale(1); } }
                    </style>
                    <text x="0" y="50" class="alg-text t1">x</text>
                    <text x="30" y="50" class="alg-text t2">+</text>
                    <text x="60" y="50" class="alg-text t3">y</text>
                </svg>
            `
        },
        {
            title: 'Geometry',
            description: 'Explore shapes, sizes, positions of figures, and the properties of space in a visual way.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .geo-shape { stroke-width: 4; stroke: #e74c3c; fill: none; transform-origin: center; animation: rotate-geo 8s linear infinite; }
                        .geo-shape.s2 { animation-delay: -2s; stroke: #f1c40f; }
                        .geo-shape.s3 { animation-delay: -4s; stroke: #2ecc71; }
                        @keyframes rotate-geo { 
                            0% { transform: rotate(0deg) scale(0.8); }
                            50% { transform: rotate(180deg) scale(1); }
                            100% { transform: rotate(360deg) scale(0.8); }
                        }
                    </style>
                    <rect x="15" y="15" width="70" height="70" class="geo-shape s1"/>
                    <circle cx="50" cy="50" r="35" class="geo-shape s2"/>
                    <polygon points="50,15 85,85 15,85" class="geo-shape s3"/>
                </svg>
            `
        },
        {
            title: 'Trigonometry',
            description: 'Study the relationships between side lengths and angles of triangles, crucial for many fields.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .sine-wave {
                            stroke: #9b59b6;
                            stroke-width: 4;
                            fill: none;
                            stroke-dasharray: 200;
                            stroke-dashoffset: 200;
                            animation: draw-wave 4s ease-in-out infinite alternate;
                        }
                        @keyframes draw-wave { to { stroke-dashoffset: 0; } }
                    </style>
                    <path class="sine-wave" d="M 0 50 C 25 10, 25 90, 50 50 S 75 10, 100 50" />
                </svg>
            `
        },
        {
            title: 'Calculus',
            description: 'Delve into the study of continuous change, covering limits, functions, derivatives, and integrals.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .integral { font: bold 80px serif; fill: #1abc9c; }
                        .fn-line { stroke: #34495e; stroke-width: 3; fill: none; opacity: 0; animation: fade-in-line 2s forwards 1s; }
                        @keyframes fade-in-line { to { opacity: 1; } }
                    </style>
                    <text x="10" y="80" class="integral">∫</text>
                    <path class="fn-line" d="M 35,80 Q 60,20 90,50" />
                </svg>
            `
        },
        {
            title: 'Statistics',
            description: 'Master the collection, analysis, interpretation, and presentation of masses of numerical data.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .bar { fill: #27ae60; animation: grow-bar 1.5s ease-out forwards; transform-origin: bottom; transform: scaleY(0); }
                        .b2 { animation-delay: 0.2s; fill: #2980b9; }
                        .b3 { animation-delay: 0.4s; fill: #8e44ad; }
                        @keyframes grow-bar { to { transform: scaleY(1); } }
                    </style>
                    <rect class="bar" x="10" y="40" width="20" height="60" />
                    <rect class="bar b2" x="40" y="20" width="20" height="80" />
                    <rect class="bar b3" x="70" y="60" width="20" height="40" />
                </svg>
            `
        }
    ];

    const physicsChapters = [
        {
            title: 'Mechanics',
            description: 'Understand the motion of objects and the forces that cause them. From Newton\'s laws to energy.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .pendulum { transform-origin: 50px 10px; animation: swing 3s ease-in-out infinite alternate; }
                        .ball { fill: #c0392b; }
                        .string { stroke: #7f8c8d; stroke-width: 2; }
                         @keyframes swing {
                            from { transform: rotate(-45deg); }
                            to { transform: rotate(45deg); }
                        }
                    </style>
                    <g class="pendulum">
                        <line class="string" x1="50" y1="10" x2="50" y2="60" />
                        <circle class="ball" cx="50" cy="70" r="10" />
                    </g>
                </svg>
            `
        },
        {
            title: 'Electromagnetism',
            description: 'Explore the interaction between electric currents or fields and magnetic fields.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <style>
                        .em-ring { stroke: #2980b9; fill: none; stroke-width: 2; transform-origin: center; animation: pulse-ring 2s infinite ease-out; }
                        @keyframes pulse-ring {
                            0% { r: 10; opacity: 1; }
                            100% { r: 40; opacity: 0; }
                        }
                    </style>
                    <circle cx="50" cy="50" r="8" fill="#e67e22"/>
                    <circle class="em-ring" cx="50" cy="50" r="10" />
                    <circle class="em-ring" cx="50" cy="50" r="10" style="animation-delay: 1s;" />
                </svg>
            `
        },
        {
            title: 'Optics',
            description: 'Discover the behavior and properties of light, including its interactions with matter.',
            svg: `
                <svg viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="red"/>
                            <stop offset="20%" stop-color="orange"/>
                            <stop offset="40%" stop-color="yellow"/>
                            <stop offset="60%" stop-color="green"/>
                            <stop offset="80%" stop-color="blue"/>
                            <stop offset="100%" stop-color="purple"/>
                        </linearGradient>
                    </defs>
                    <style>
                        .prism-triangle { fill: #fff; stroke: #bdc3c7; stroke-width: 1; opacity: 0.8; }
                        .light-ray { stroke: white; stroke-width: 3; }
                        .split-ray { stroke: url(#rainbow); stroke-width: 4; stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw-split 2s forwards 1s; }
                        @keyframes draw-split { to { stroke-dashoffset: 0; } }
                    </style>
                    <line class="light-ray" x1="0" y1="50" x2="35" y2="50" />
                    <polygon class="prism-triangle" points="40,20 40,80 80,50" />
                    <path class="split-ray" d="M 75,50 C 85,40 95,30 100,25" />
                    <path class="split-ray" d="M 75,50 C 85,50 95,50 100,50" />
                    <path class="split-ray" d="M 75,50 C 85,60 95,70 100,75" />
                </svg>
            `
        },
        {
            title: 'Thermodynamics',
            description: 'Study heat, work, and temperature, and their relation to energy, radiation, and physical properties.',
            svg: `
                 <svg viewBox="0 0 100 100">
                    <style>
                        .thermo-glass { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 2; }
                        .thermo-liquid { fill: #e74c3c; animation: rise-temp 4s infinite alternate; }
                        @keyframes rise-temp { to { transform: translateY(-40px); } }
                    </style>
                    <rect x="40" y="20" width="20" height="70" rx="10" class="thermo-glass" />
                    <circle cx="50" cy="80" r="15" class="thermo-glass" />
                    <rect x="45" y="40" width="10" height="40" class="thermo-liquid" />
                    <circle cx="50" cy="80" r="10" class="thermo-liquid" />
                </svg>
            `
        }
    ];

    function createChapterCard(chapter) {
        const url = chapter.url || '#';
        return `
            <a href="${url}" class="chapter-card-link" title="Learn about ${chapter.title}">
                <article class="chapter-card">
                    <div class="chapter-svg-container">
                        ${chapter.svg}
                    </div>
                    <div class="chapter-content">
                        <h3 class="chapter-title">${chapter.title}</h3>
                        <p class="chapter-description">${chapter.description}</p>
                    </div>
                </article>
            </a>
        `;
    }

    const formulasContainer = document.getElementById('formulas-chapters-container');
    const conversionContainer = document.getElementById('conversion-chapters-container');
    const vyakaranContainer = document.getElementById('vyakaran-chapters-container');
    const mathsContainer = document.getElementById('maths-chapters-container');
    const physicsContainer = document.getElementById('physics-chapters-container');
    
    if (formulasContainer) {
        formulasContainer.innerHTML = allFormulasChapters.map(createChapterCard).join('');
    }
    if (conversionContainer) {
        conversionContainer.innerHTML = conversionChapters.map(createChapterCard).join('');
    }
    if (vyakaranContainer) {
        vyakaranContainer.innerHTML = vyakaranChapters.map(createChapterCard).join('');
    }
    if (mathsContainer) {
        mathsContainer.innerHTML = mathsChapters.map(createChapterCard).join('');
    }
    if (physicsContainer) {
        physicsContainer.innerHTML = physicsChapters.map(createChapterCard).join('');
    }
});
