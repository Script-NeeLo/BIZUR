// Local storage for posts (temporary, without Firebase)
let localPosts = [];

// Splash Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainApp = document.getElementById('main-app');

    // Load posts from localStorage
    const savedPosts = localStorage.getItem('bizur-posts');
    if (savedPosts) {
        localPosts = JSON.parse(savedPosts);
    }

    // Через 4 секунды скрываем заставку
    setTimeout(() => {
        // Добавляем класс для плавного исчезновения
        splashScreen.classList.add('fade-out');
        
        // После анимации исчезновения показываем основное приложение
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainApp.classList.remove('hidden');
            
            // Плавное появление основного приложения
            setTimeout(() => {
                mainApp.classList.add('show');
                initApp();
            }, 50);
        }, 800); // Длительность анимации fadeOut
    }, 4000); // 4 секунды показа заставки
});

// Initialize App
function initApp() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen');

    // Load posts
    loadPosts();

    // Navigation Logic
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            const pageName = button.getAttribute('data-page-name');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Switch screens with animation
            screens.forEach(screen => {
                screen.classList.remove('active');
            });
            
            const activeScreen = document.getElementById(`${targetScreen}-screen`);
            if (activeScreen) {
                activeScreen.classList.add('active');
            }
            
            // Update header page name with animation
            updatePageName(pageName);
        });
    });

    // Publish post button
    const publishBtn = document.querySelector('.btn-publish');
    if (publishBtn) {
        publishBtn.addEventListener('click', publishPost);
    }
}

// Load posts (local version)
function loadPosts() {
    const postsContainer = document.querySelector('.posts-container');

    if (localPosts.length === 0) {
        // Show empty state
        postsContainer.innerHTML = `
            <div class="empty-state">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p>Пока нет постов</p>
                <p class="subtitle">Нажми + чтобы создать первый пост</p>
            </div>
        `;
    } else {
        // Show posts
        postsContainer.innerHTML = '';
        localPosts.forEach((post) => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    const date = post.timestamp ? new Date(post.timestamp).toLocaleString('ru-RU') : 'Сейчас';
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <div class="user-avatar">👤</div>
                <span class="user-name">Пользователь</span>
            </div>
            <span class="post-time">${date}</span>
        </div>
        <div class="post-content">
            <p>${post.text}</p>
        </div>
    `;
    
    return postDiv;
}

// Update page name in header
function updatePageName(pageName) {
    const currentPageEl = document.querySelector('.current-page');
    if (!currentPageEl) return;
    
    // Add fade out animation
    currentPageEl.classList.add('changing');
    
    setTimeout(() => {
        currentPageEl.textContent = pageName;
        currentPageEl.classList.remove('changing');
    }, 150);
}

// Publish post (local version)
function publishPost() {
    const textInput = document.querySelector('.post-input');
    const text = textInput.value.trim();

    if (!text) {
        alert('Напиши что-нибудь!');
        return;
    }

    // Create new post
    const newPost = {
        text: text,
        timestamp: new Date().getTime()
    };

    // Add to beginning of array (newest first)
    localPosts.unshift(newPost);

    // Save to localStorage
    localStorage.setItem('bizur-posts', JSON.stringify(localPosts));

    // Clear input and go back to home
    textInput.value = '';
    document.querySelector('[data-screen="home"]').click();
    
    // Reload posts
    loadPosts();
    
    console.log('✅ Пост создан локально!');
}

