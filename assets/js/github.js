/**
 * GitHub API Integration
 * Fetches real repositories and contribution data from GitHub
 */

const GITHUB_USERNAME = 'KanekiCraynet';
const GITHUB_API = 'https://api.github.com';

// Cache for API responses
const cache = {
    repos: null,
    user: null,
    lastFetch: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch user profile data
 */
async function fetchGitHubUser() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
    } catch (error) {
        console.error('GitHub API Error:', error);
        return null;
    }
}

/**
 * Fetch user repositories
 */
async function fetchGitHubRepos() {
    try {
        const response = await fetch(
            `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) throw new Error('Failed to fetch repos');
        return await response.json();
    } catch (error) {
        console.error('GitHub API Error:', error);
        return [];
    }
}

/**
 * Get language color for repository
 */
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C#': '#178600',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Ruby': '#701516',
        'Vue': '#41b883',
        'Jupyter Notebook': '#DA5B0B'
    };
    return colors[language] || '#8b5cf6';
}

/**
 * Format number with K suffix
 */
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

/**
 * Create repository card HTML
 */
function createRepoCard(repo) {
    const languageColor = getLanguageColor(repo.language);

    return `
        <a href="${repo.html_url}" class="github-repo-card" target="_blank" rel="noopener">
            <div class="repo-header">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8z"/>
                </svg>
                <span class="repo-name">${repo.name}</span>
            </div>
            <p class="repo-description">${repo.description || 'No description'}</p>
            <div class="repo-meta">
                ${repo.language ? `
                    <span class="repo-language">
                        <span class="language-dot" style="background-color: ${languageColor}"></span>
                        ${repo.language}
                    </span>
                ` : ''}
                <span class="repo-stars">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                    </svg>
                    ${formatNumber(repo.stargazers_count)}
                </span>
                <span class="repo-forks">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    ${formatNumber(repo.forks_count)}
                </span>
            </div>
        </a>
    `;
}

/**
 * Create GitHub stats section
 */
function createGitHubStats(user) {
    return `
        <div class="github-stats">
            <div class="stat-item">
                <span class="stat-value">${user.public_repos}</span>
                <span class="stat-label" data-i18n="github.repos">Repositories</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${formatNumber(user.followers)}</span>
                <span class="stat-label" data-i18n="github.followers">Followers</span>
            </div>
            <div class="stat-item">
                <span class="stat-value">${formatNumber(user.following)}</span>
                <span class="stat-label" data-i18n="github.following">Following</span>
            </div>
        </div>
    `;
}

/**
 * Initialize GitHub integration
 */
async function initGitHubIntegration() {
    const reposContainer = document.getElementById('github-repos');
    const statsContainer = document.getElementById('github-stats');

    if (!reposContainer && !statsContainer) return;

    // Show loading state
    if (reposContainer) {
        reposContainer.innerHTML = `
            <div class="github-loading">
                <div class="loading-spinner"></div>
                <span data-i18n="github.loading">Loading repositories...</span>
            </div>
        `;
    }

    try {
        // Fetch data in parallel
        const [user, repos] = await Promise.all([
            fetchGitHubUser(),
            fetchGitHubRepos()
        ]);

        // Render stats
        if (statsContainer && user) {
            statsContainer.innerHTML = createGitHubStats(user);
        }

        // Render repos
        if (reposContainer && repos.length > 0) {
            reposContainer.innerHTML = repos
                .filter(repo => !repo.fork) // Exclude forks
                .slice(0, 6)
                .map(createRepoCard)
                .join('');
        } else if (reposContainer) {
            reposContainer.innerHTML = `
                <p class="github-error" data-i18n="github.error">Unable to load repositories</p>
            `;
        }

        // Update translations if i18n is loaded
        if (typeof updatePageTranslations === 'function') {
            updatePageTranslations();
        }

    } catch (error) {
        console.error('GitHub Integration Error:', error);
        if (reposContainer) {
            reposContainer.innerHTML = `
                <p class="github-error" data-i18n="github.error">Unable to load repositories</p>
            `;
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initGitHubIntegration);
