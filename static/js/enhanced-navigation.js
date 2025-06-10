document.addEventListener('DOMContentLoaded', function() {
    // Reading progress indicator
    function updateReadingProgress() {
        const article = document.querySelector('.main-content');
        if (!article) return;

        const scrolled = window.pageYOffset;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const progress = Math.min(scrolled / (articleHeight - windowHeight), 1);

        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            document.body.appendChild(progressBar);
        }

        progressBar.style.width = (progress * 100) + '%';
    }

    // Smart active link highlighting
    function updateActiveLinks() {
        const headers = document.querySelectorAll('h2, h3');
        const sidebarLinks = document.querySelectorAll('.sidebar-links a');

        let current = '';
        headers.forEach(header => {
            const rect = header.getBoundingClientRect();
            if (rect.top <= 100) {
                current = header.id || header.textContent.toLowerCase().replace(/\s+/g, '-');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('reading');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('reading');
            }
        });
    }

    // Smooth mega menu interactions
    const megaMenuTriggers = document.querySelectorAll('.nav-item');
    megaMenuTriggers.forEach(trigger => {
        let timeout;

        trigger.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            const menu = this.querySelector('.mega-menu');
            if (menu) {
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                }, 10);
            }
        });

        trigger.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.mega-menu');
            if (menu) {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }, 100);
            }
        });
    });

    // Event listeners
    window.addEventListener('scroll', function() {
        updateReadingProgress();
        updateActiveLinks();
    });

    // Initialize
    updateReadingProgress();
    updateActiveLinks();
});