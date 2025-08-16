document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById("topic-sidebar");
    const sidebarToggle = document.getElementById("topic-sidebar-toggle");
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    const sidebarNav = document.getElementById("topic-nav");

    // Desktop par sidebar hamesha open
    function setSidebarState() {
        if (window.innerWidth > 991) {
            sidebar.classList.add("is-open");
            if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
        }
    }

    setSidebarState(); // initial load par check

    window.addEventListener("resize", setSidebarState); // resize hone par check

    // Mobile toggle logic
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("is-open");
            sidebarOverlay.classList.toggle("is-open");
        });

        sidebarOverlay.addEventListener("click", () => {
            sidebar.classList.remove("is-open");
            sidebarOverlay.classList.remove("is-open");
        });
    }

    // Sidebar nav link active state
    if (sidebarNav) {
        sidebarNav.addEventListener("click", (e) => {
            if (e.target.tagName === "A") {
                const currentActive = sidebarNav.querySelector("a.active");
                if (currentActive) currentActive.classList.remove("active");
                e.target.classList.add("active");

                // Mobile par link click hone par sidebar close
                if (window.innerWidth <= 991) {
                    sidebar.classList.remove("is-open");
                    if (sidebarOverlay) sidebarOverlay.classList.remove("is-open");
                }
            }
        });
    }
});
