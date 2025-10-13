document.addEventListener('DOMContentLoaded', () => {

  
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('theme-toggle');
    
 
    const profileImage = document.getElementById('profileImage'); 
    
  
    const lightSrc = 'assets/profile/profile-light.jpg';
    const darkSrc = 'assets/profile/profile-dark.jpg';


    const updateProfileImage = (isDark) => {
        if (profileImage) {
            profileImage.src = isDark ? darkSrc : lightSrc;
        }
    };
    

    const checkSystemPreference = () => {
        // Only check system preference if no theme is saved in localStorage
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-mode');
            }
        }
    };

    let currentTheme = localStorage.getItem('theme');
    
    checkSystemPreference();

    const isDarkModeActive = document.body.classList.contains('dark-mode') || currentTheme === 'dark';

    if (isDarkModeActive) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Dark Mode';
        updateProfileImage(true);
    } else {
        themeToggle.textContent = 'Light Mode';
        updateProfileImage(false);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme;
        let isDark = document.body.classList.contains('dark-mode');

        if (isDark) {
            theme = 'dark';
            themeToggle.textContent = 'Dark Mode';
        } else {
            theme = 'light';
            themeToggle.textContent = 'Light Mode';
        }
        
        localStorage.setItem('theme', theme);
        updateProfileImage(isDark); 
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    const scrollSections = document.querySelectorAll('.scroll-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => navObserver.observe(section));

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.classList.add('show');
            modalImg.src = item.dataset.imgSrc; 
            modalTitle.textContent = item.dataset.title;
            modalDescription.textContent = item.dataset.description;
        });
    });

    const hideModal = () => {
        modal.classList.remove('show');
    };

    closeModal.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
});
