// Theme Toggle with Enhanced Transitions

const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
    localStorage.setItem('theme', theme);
}

// Update icon with smooth animation
function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.8) rotate(180deg)';

        setTimeout(() => {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            themeToggle.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    }
}

// Initialize theme
applyTheme(getPreferredTheme());

// Toggle theme on click
themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});
