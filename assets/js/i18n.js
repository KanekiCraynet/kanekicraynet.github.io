/**
 * Internationalization (i18n) System
 * Supports Indonesian and English
 */

const translations = {
    id: {
        // Navigation
        'nav.home': 'Beranda',
        'nav.projects': 'Proyek',
        'nav.about': 'Tentang',
        'nav.experience': 'Pengalaman',
        'nav.contact': 'Kontak',

        // Hero Section
        'hero.greeting': '<span class="wave-emoji">👋</span> Halo, saya',
        'hero.title': 'Full-Stack Developer',
        'hero.subtitle': 'Saya membangun aplikasi web modern, mengintegrasikan AI, dan membuat solusi yang dapat di-scale untuk menyelesaikan masalah dunia nyata.',
        'hero.cta.projects': 'Lihat Proyek',
        'hero.cta.contact': 'Hubungi Saya',

        // Projects Section
        'projects.tag': 'Portfolio',
        'projects.title': 'Proyek Terbaru',
        'projects.subtitle': 'Berikut beberapa proyek yang telah saya kerjakan',
        'projects.viewAll': 'Lihat Semua di GitHub',

        // GitHub Section
        'github.tag': 'Open Source',
        'github.title': 'Repositori GitHub',
        'github.subtitle': 'Proyek open source dan kontribusi terbaru saya',
        'github.repos': 'Repositori',
        'github.followers': 'Pengikut',
        'github.following': 'Mengikuti',
        'github.loading': 'Memuat repositori...',
        'github.error': 'Tidak dapat memuat repositori',

        // Skills Section
        'skills.tag': 'Keahlian',
        'skills.title': 'Kemampuan Teknis',
        'skills.subtitle': 'Teknologi dan tools yang saya gunakan',
        'skills.frontend': 'Pengembangan Frontend',
        'skills.backend': 'Pengembangan Backend',
        'skills.devops': 'Database & DevOps',
        'skills.ai': 'AI & Spesialisasi',

        // Experience Section
        'experience.tag': 'Perjalanan',
        'experience.title': 'Pengalaman & Pendidikan',
        'experience.subtitle': 'Perjalanan profesional dan latar belakang pendidikan saya',
        'experience.role1': 'Full-Stack Developer',
        'experience.company1': 'Freelance & Proyek Personal',
        'experience.desc1': 'Membangun aplikasi web modern, platform trading berbasis AI, dan solusi SaaS yang dapat di-scale menggunakan teknologi terkini.',
        'experience.role2': 'Riset AI/ML',
        'experience.company2': 'Proyek Analisis Citra Medis',
        'experience.desc2': 'Mengembangkan model deep learning untuk deteksi kanker serviks menggunakan arsitektur VGG19 dan CNN.',
        'experience.role3': 'Mahasiswa Ilmu Komputer',
        'experience.company3': 'Universitas',
        'experience.desc3': 'Menempuh gelar di bidang Ilmu Komputer dengan fokus pada rekayasa perangkat lunak dan kecerdasan buatan.',

        // Contact Section
        'contact.tag': 'Kontak',
        'contact.title': 'Hubungi Saya',
        'contact.subtitle': 'Terbuka untuk kolaborasi dan kesempatan baru. Mari membangun sesuatu yang hebat bersama!',
        'contact.form.name': 'Nama',
        'contact.form.email': 'Email',
        'contact.form.message': 'Pesan',
        'contact.form.submit': 'Kirim Pesan',
        'contact.form.namePlaceholder': 'Nama Anda',
        'contact.form.messagePlaceholder': 'Pesan Anda...',
        'contact.direct': 'Atau hubungi langsung',

        // Footer
        'footer.copyright': 'Dibuat dengan passion menggunakan teknologi web modern.'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.greeting': '<span class="wave-emoji">👋</span> Hi, I\'m',
        'hero.title': 'Full-Stack Developer',
        'hero.subtitle': 'I build modern web applications, integrate AI, and create scalable solutions to solve real-world problems.',
        'hero.cta.projects': 'View Projects',
        'hero.cta.contact': 'Contact Me',

        // Projects Section
        'projects.tag': 'Portfolio',
        'projects.title': 'Featured Projects',
        'projects.subtitle': 'Here are some projects I\'ve worked on',
        'projects.viewAll': 'View All on GitHub',

        // GitHub Section
        'github.tag': 'Open Source',
        'github.title': 'GitHub Repositories',
        'github.subtitle': 'My latest open source projects and contributions',
        'github.repos': 'Repositories',
        'github.followers': 'Followers',
        'github.following': 'Following',
        'github.loading': 'Loading repositories...',
        'github.error': 'Unable to load repositories',

        // Skills Section
        'skills.tag': 'Expertise',
        'skills.title': 'Technical Skills',
        'skills.subtitle': 'Technologies and tools I work with to bring ideas to life',
        'skills.frontend': 'Frontend Development',
        'skills.backend': 'Backend Development',
        'skills.devops': 'Database & DevOps',
        'skills.ai': 'AI & Specializations',

        // Experience Section
        'experience.tag': 'Journey',
        'experience.title': 'Experience & Education',
        'experience.subtitle': 'My professional journey and educational background',
        'experience.role1': 'Full-Stack Developer',
        'experience.company1': 'Freelance & Personal Projects',
        'experience.desc1': 'Building modern web applications, AI-powered trading platforms, and scalable SaaS solutions using cutting-edge technologies.',
        'experience.role2': 'AI/ML Research',
        'experience.company2': 'Medical Image Analysis Projects',
        'experience.desc2': 'Developed deep learning models for cervical cancer detection using VGG19 and CNNs architecture.',
        'experience.role3': 'Computer Science Student',
        'experience.company3': 'University',
        'experience.desc3': 'Pursuing degree in Computer Science with focus on software engineering and artificial intelligence.',

        // Contact Section
        'contact.tag': 'Contact',
        'contact.title': 'Get In Touch',
        'contact.subtitle': 'Open to collaboration and new opportunities. Let\'s build something great together!',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.form.namePlaceholder': 'Your name',
        'contact.form.messagePlaceholder': 'Your message...',
        'contact.direct': 'Or reach me directly',

        // Footer
        'footer.copyright': 'Crafted with passion using modern web technologies.'
    }
};

// Current language
let currentLang = localStorage.getItem('language') || 'en';

/**
 * Get translation by key
 */
function t(key) {
    return translations[currentLang]?.[key] || translations.en[key] || key;
}

/**
 * Update all elements with data-i18n attribute
 */
function updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.value = translation;
            }
        } else if (key === 'hero.greeting') {
            // Use innerHTML for greeting to support emoji span
            element.innerHTML = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
}

/**
 * Set language and update UI
 */
function setLanguage(lang) {
    if (!translations[lang]) return;

    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);

    // Update toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'id' ? '🇮🇩' : '🇬🇧';
        langToggle.setAttribute('aria-label', `Switch to ${lang === 'id' ? 'English' : 'Indonesian'}`);
    }

    updatePageTranslations();
}

/**
 * Toggle between languages
 */
function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'id' : 'en';
    setLanguage(newLang);
}

/**
 * Initialize i18n system
 */
function initI18n() {
    // Set initial language
    setLanguage(currentLang);

    // Add click handler for language toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initI18n);

// Export for use in other scripts
window.t = t;
window.setLanguage = setLanguage;
window.updatePageTranslations = updatePageTranslations;
