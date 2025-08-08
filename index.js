/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */




// --- Start of CommentManager class ---
class CommentManager {
  constructor() {
    this.comments = [];
    this.currentUser = null;
    this.ownerName = "GK Learn Study";
    this.storageKey = "blogComments_" + window.location.pathname;

    this.commentSection = document.getElementById('comment-section');
    this.commentAuthArea = document.getElementById('comment-auth-area');
    this.commentForm = document.getElementById('comment-form');
    this.commentNameInput = document.getElementById('comment-name');
    this.commentSubjectInput = document.getElementById('comment-subject');
    this.commentTextInput = document.getElementById('comment-text');
    this.commentsList = document.getElementById('comments-list');
    this.commentsTitle = document.getElementById('comments-title');
    
    this.loginPromptContainer = document.createElement('div');
    this.loginPromptContainer.id = 'login-prompt';
  }

  init() {
    this.loadComments();
    this.loadUser();
    this.setupEventListeners();
    this.render();
  }

  loadComments() {
    const savedComments = localStorage.getItem(this.storageKey);
    if (savedComments) {
      try {
        this.comments = JSON.parse(savedComments);
      } catch (e) {
        console.error("Failed to parse comments from localStorage", e);
        this.comments = [];
      }
    }
  }

  saveComments() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
  }

  loadUser() {
    this.currentUser = localStorage.getItem('blogUser');
  }

  saveUser(name) {
    this.currentUser = name;
    localStorage.setItem('blogUser', name);
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('blogUser');
    this.render();
  }

  setupEventListeners() {
    this.commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addComment();
    });

    this.commentsList.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        if (!action || !id) return;

        if (action === 'delete') {
            if (confirm('Are you sure you want to delete this comment?')) {
                this.deleteComment(id);
            }
        } else if (action === 'reply') {
            this.showReplyForm(id, target.closest('.comment-card'));
        }
    });
  }
  
  addComment(parentId = null, subject, text) {
      if (!this.currentUser) return;
      
      const newComment = {
          id: Date.now().toString(),
          author: this.currentUser,
          subject: parentId ? '' : subject || this.commentSubjectInput.value.trim(),
          text: text || this.commentTextInput.value.trim(),
          date: new Date().toLocaleString(),
          replies: [],
      };

      if (parentId) {
          const parent = this.findComment(parentId, this.comments);
          if(parent) parent.replies.unshift(newComment);
      } else {
          this.comments.unshift(newComment);
      }
      
      this.saveComments();
      this.render();
      if (!parentId) {
        this.commentForm.reset();
        this.commentNameInput.value = this.currentUser;
      }
  }
  
  deleteComment(id) {
      const iter = (comments) => {
          return comments.filter(comment => {
              if (comment.id === id) {
                  const canDelete = this.currentUser === comment.author || this.currentUser === this.ownerName;
                  return !canDelete;
              }
              comment.replies = iter(comment.replies);
              return true;
          });
      };
      this.comments = iter(this.comments);
      this.saveComments();
      this.render();
  }
  
  findComment(id, comments) {
      for (const comment of comments) {
          if (comment.id === id) return comment;
          const foundInReply = this.findComment(id, comment.replies);
          if (foundInReply) return foundInReply;
      }
      return null;
  }
  
  showReplyForm(id, parentElement) {
      if (!parentElement || !this.currentUser) return;
      
      const existingForm = parentElement.querySelector('.reply-form');
      if (existingForm) {
          existingForm.remove();
          return;
      }
      
      const form = document.createElement('form');
      form.className = 'reply-form';
      form.innerHTML = `
          <textarea placeholder="Write a reply..." rows="3" required></textarea>
          <div>
              <button type="button" class="cancel">Cancel</button>
              <button type="submit">Reply</button>
          </div>
      `;
      
      parentElement.querySelector('.comment-actions')?.insertAdjacentElement('afterend', form);
      
      form.querySelector('textarea')?.focus();
      
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          const text = form.querySelector('textarea').value.trim();
          if (text) {
              this.addComment(id, undefined, text);
          }
      });
      
      form.querySelector('.cancel')?.addEventListener('click', () => {
          form.remove();
      });
  }

  render() {
    this.renderAuthArea();
    this.renderCommentsList();
  }

  renderAuthArea() {
      this.commentAuthArea.innerHTML = '';
      if (this.currentUser) {
          this.commentForm.style.display = 'flex';
          this.commentNameInput.value = this.currentUser;
          const loggedInArea = document.createElement('div');
          loggedInArea.className = 'logged-in-area';
          loggedInArea.innerHTML = `<p>Commenting as: <strong>${this.escapeHtml(this.currentUser)}</strong></p>`;
          const logoutBtn = document.createElement('button');
          logoutBtn.textContent = 'Not you? Log out';
          logoutBtn.type = 'button';
          logoutBtn.addEventListener('click', () => this.logoutUser());
          loggedInArea.appendChild(logoutBtn);
          this.commentAuthArea.appendChild(loggedInArea);
      } else {
          this.commentForm.style.display = 'none';
          this.loginPromptContainer.innerHTML = `
            <p>You must provide a name to comment.</p>
            <form id="login-form">
                <input type="text" id="login-name-input" placeholder="Enter your name" required />
                <button type="submit">Save Name</button>
            </form>
          `;
          this.commentAuthArea.appendChild(this.loginPromptContainer);

          const loginForm = this.commentAuthArea.querySelector('#login-form');
          loginForm.addEventListener('submit', (e) => {
              e.preventDefault();
              const nameInput = loginForm.querySelector('#login-name-input');
              const name = nameInput.value.trim();
              if (name) {
                  this.saveUser(name);
                  this.render();
              }
          });
      }
  }

  renderCommentsList() {
    this.commentsList.innerHTML = '';
    
    const commentCount = this.getCommentCount();
    this.commentsTitle.textContent = `Comments (${commentCount})`;

    if (commentCount === 0) {
        this.commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
        return;
    }
    
    this.comments.forEach(comment => {
        const commentElement = this.createCommentElement(comment);
        this.commentsList.appendChild(commentElement);
    });
  }

  getCommentCount() {
      let count = 0;
      const countReplies = (comments) => {
          for (const comment of comments) {
              count++;
              countReplies(comment.replies);
          }
      };
      countReplies(this.comments);
      return count;
  }
  
  createCommentElement(comment) {
    const element = document.createElement('div');
    element.className = 'comment-card';
    
    const canDelete = this.currentUser === comment.author || this.currentUser === this.ownerName;
    
    element.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${this.escapeHtml(comment.author)}</span>
            ${comment.subject ? `<strong class="comment-subject">${this.escapeHtml(comment.subject)}</strong>` : ''}
            <span class="comment-date">${comment.date}</span>
        </div>
        <p class="comment-text">${this.escapeHtml(comment.text)}</p>
        <div class="comment-actions">
            ${this.currentUser ? `<button type="button" data-action="reply" data-id="${comment.id}">Reply</button>` : ''}
            ${canDelete ? `<button type="button" data-action="delete" data-id="${comment.id}">Delete</button>` : ''}
        </div>
    `;

    if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'replies-container';
        comment.replies.forEach(reply => {
            repliesContainer.appendChild(this.createCommentElement(reply));
        });
        element.appendChild(repliesContainer);
    }

    return element;
  }
  
  escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
}

// --- Start of Core UI Initialization ---
function initHeader() {
    const menuLinks = [
        { href: "/", text: "Home" },
        { href: "/education.html", text: "Education" },
        { href: "/all-formulas.html", text: "All Formula" },
        { href: "/computer.html", text: "Computer" },
        { href: "/kaise-karen.html", text: "How to" },
        { href: "/gk-quiz.html", text: "GK Quiz" },
        { href: "/test.html", text: "golu" },
    ];

    const headerHTML = `
        <div id="reading-progress-bar"></div>
        <header class="header" id="header">
            <nav class="navbar container1">
                <a href="/" class="brand" aria-label="GK Learn Study">
                    <div class="logo-container1">
                        <div class="demo2">
                             <svg width="40" height="40" viewBox="0 0 300 300">
                                <circle cx="150" cy="150" r="150" fill="white"/>
                                <text x="50%" y="35%" font-size="90" font-weight="bold" fill="red" text-anchor="middle" style="transform-origin: center center;" opacity="0">
                                    GK
                                    <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="1.5s" fill="freeze"/>
                                    <animateTransform attributeName="transform" type="rotate" from="-15" to="0" begin="0.5s" dur="1.5s" fill="freeze" additive="sum"/>
                                    <animateTransform attributeName="transform" type="scale" from="0.5" to="1" begin="0.5s" dur="1.5s" fill="freeze" additive="sum"/>
                                </text>
                                <text x="50%" y="65%" font-size="38" fill="purple" text-anchor="middle" style="transform-origin: center center;" opacity="0">
                                    Learn Study
                                    <animate attributeName="opacity" from="0" to="1" begin="0.8s" dur="1.5s" fill="freeze"/>
                                    <animateTransform attributeName="transform" type="scale" from="0.7" to="1" begin="0.8s" dur="1.5s" fill="freeze"/>
                                </text>
                                <clipPath id="circle-clip">
                                    <circle cx="150" cy="150" r="150"/>
                                </clipPath>
                                <g clip-path="url(#circle-clip)">
                                    <path fill="#c0a4fb" fill-opacity="1">
                                         <animate attributeName="d" dur="8s" repeatCount="indefinite"
                                            values="M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z; M0 240 Q 75 260, 150 240 T 300 250 L 300 300 L 0 300 Z; M0 230 Q 75 210, 150 230 T 300 210 L 300 300 L 0 300 Z" />
                                    </path>
                                    <path fill="#641ef9" fill-opacity="0.7">
                                        <animate attributeName="d" dur="7s" repeatCount="indefinite"
                                            values="M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z; M0 250 Q 75 220, 150 250 T 300 220 L 300 300 L 0 300 Z; M0 220 Q 75 245, 150 220 T 300 235 L 300 300 L 0 300 Z" />
                                    </path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </a>
                <div class="burger" id="burger">
                    <span class="burger-line"></span><span class="burger-line"></span><span class="burger-line"></span>
                </div>
                <span class="overlay"></span>
                <div class="menu" id="menu">
                    <span class="back-arrow">×</span>
                    <a href="/" class="menu-brand">GK</a>
                    <div class="menu-arrow left">&#8249;</div>
                    <div class="menu-arrow right">&#8250;</div>
                    <div class="menu-inner">
                        ${menuLinks.map(link => `<a href="${link.href}">${link.text}</a>`).join('')}
                    </div>
                </div>
            </nav>
        </header>
        <div class="search-container">
            <button class="search-icon" id="searchBtn"><span style="display: inline-block; transform: rotate(270deg);">⌕</span></button>
            <button class="back-icon" id="backBtn">←</button>
            <input type="text" class="search-input" id="searchInput" autocomplete="off" placeholder="Search..." required />
        </div>
        <button id="themeToggle" aria-label="Switch theme">
            <span id="themeIcon">
                <svg id="sunIcon" fill="yellow" viewBox="-87.6 -87.6 1051.20 1051.20" stroke="red" stroke-width="20.00876" aria-hidden="true"><g><circle cx="438" cy="438" r="246"></circle><path d="M420.5,163h35c11.046,0,20-8.954,20-20V20c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123C400.5,154.046,409.454,163,420.5,163z"></path><path d="M713,420.5v35c0,11.046,8.954,20,20,20h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H733C721.954,400.5,713,409.454,713,420.5z"></path><path d="M455.5,876c11.046,0,20-8.954,20-20V733c0-11.046-8.954-20-20-20h-35c-11.046,0-20,8.954-20,20v123c0,11.046,8.954,20,20,20H455.5z"></path><path d="M20,475.5h123c11.046,0,20-8.954,20-20v-35c0-11.046-8.954-20-20-20H20c-11.046,0-20,8.954-20,20v35C0,466.546,8.954,475.5,20,475.5z"></path><path d="M644.829,255.92c7.811,7.81,20.474,7.811,28.284,0l86.975-86.974c7.811-7.812,7.811-20.474,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.812,7.81-7.812,20.474,0,28.284L644.829,255.92z"></path><path d="M735.338,760.087l24.749-24.749c7.811-7.81,7.811-20.474,0-28.284l-86.975-86.974c-7.812-7.811-20.475-7.811-28.284,0l-24.749,24.749c-7.812,7.811-7.812,20.474,0,28.284l86.975,86.974C714.865,767.898,727.528,767.898,735.338,760.087z"></path><path d="M168.946,760.087l86.975-86.974c7.812-7.811,7.812-20.475,0-28.284l-24.749-24.749c-7.811-7.811-20.474-7.811-28.284,0l-86.975,86.974c-7.811,7.812-7.811,20.475,0,28.284l24.749,24.749C148.472,767.898,161.135,767.898,168.946,760.087z"></path><path d="M202.887,255.92c7.811,7.811,20.474,7.81,28.284,0l24.749-24.749c7.812-7.81,7.812-20.474,0-28.284l-86.975-86.974c-7.811-7.811-20.474-7.811-28.284,0l-24.749,24.749c-7.811,7.81-7.811,20.474,0,28.284L202.887,255.92z"></path></g></svg>
                <svg id="moonIcon" viewBox="0 0 48.00 48.00" fill="#ffffff" stroke="#000000" style="display: none;" aria-hidden="true"><path d="m32.8,29.3c-8.9-.8-16.2-7.8-17.5-16.6-.3-1.8-.3-3.7,0-5.4.2-1.4-1.4-2.3-2.5-1.6C6.3,9.7,2.1,16.9,2.5,25c.5,10.7,9,19.5,19.7,20.4,10.6.9,19.8-6,22.5-15.6.4-1.4-1-2.6-2.3-2-2.9,1.3-6.1,1.8-9.6,1.5Z"></path></svg>
            </span>
        </button>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    if (!themeToggle || !sunIcon || !moonIcon) return;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.documentElement.removeAttribute('data-theme');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };

    themeToggle.addEventListener('click', () => {
        let currentTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme(currentTheme);
    });

    applyTheme(localStorage.getItem('theme') || 'light');
}

function initNavigation() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.overlay');
    const backArrow = document.querySelector('.back-arrow');

    const toggleMenu = (isActive) => {
        menu?.classList.toggle('is-active', isActive);
        overlay?.classList.toggle('is-active', isActive);
    };

    burger?.addEventListener('click', () => toggleMenu(true));
    overlay?.addEventListener('click', () => toggleMenu(false));
    backArrow?.addEventListener('click', () => toggleMenu(false));

    const menuInner = document.querySelector('.menu-inner');
    const leftArrow = document.querySelector('.menu-arrow.left');
    const rightArrow = document.querySelector('.menu-arrow.right');

    if (menuInner && leftArrow && rightArrow) {
        const updateArrows = () => {
            requestAnimationFrame(() => {
                const { scrollWidth, clientWidth, scrollLeft } = menuInner;
                leftArrow.style.visibility = scrollLeft > 0 ? 'visible' : 'hidden';
                rightArrow.style.visibility = scrollWidth > clientWidth + scrollLeft + 1 ? 'visible' : 'hidden';
            });
        };

        leftArrow.addEventListener('click', () => {
            menuInner.scrollBy({ left: -200, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', () => {
            menuInner.scrollBy({ left: 200, behavior: 'smooth' });
        });

        menuInner.addEventListener('scroll', updateArrows, { passive: true });
        window.addEventListener('resize', updateArrows);
        updateArrows();
    }
    
    const currentPath = window.location.pathname.toLowerCase();
    const menuLinks = document.querySelectorAll('.menu-inner a');
    menuLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname.toLowerCase();
        let isActive = (currentPath === '/' || currentPath === '/index.html') 
            ? (linkPath === '/' || linkPath === '/index.html')
            : (linkPath !== '/' && currentPath.startsWith(linkPath.replace('.html', '')));
        if (isActive) {
            link.classList.add('active');
        }
    });
}

function initImagePlaceholders() {
    document.querySelectorAll("img").forEach(img => {
        img.onerror = () => {
            const imageName = img.src.split('/').pop()?.split('.')[0] || 'image';
            const placeholder = document.createElement("div");
            placeholder.className = "placeholder";
            placeholder.innerHTML = `<div class="emoji">📘</div><div>${imageName.charAt(0).toUpperCase() + imageName.slice(1)}</div>`;
            img.replaceWith(placeholder);
        };
    });
}

function initLinkAttributes() {
    document.querySelectorAll('a').forEach(link => {
        if (!link.title) {
            link.title = link.textContent?.trim() || link.href;
        }
        if (link.target === '_blank') {
            link.rel = 'noopener noreferrer';
        }
    });
}

function initFavicon() {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'https://gklearnstudy.in/favicon.ico';
    link.type = 'image/x-icon';
    document.head.appendChild(link);
  }
}

function initReadingProgressBar() {
    const progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = docHeight > 0 ? `${(window.scrollY / docHeight) * 100}%` : '0%';
    });
};

// --- Main Application Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Build the static UI parts
    initHeader();
    initTheme();
    initNavigation();
    initImagePlaceholders();
    initLinkAttributes();
    initFavicon();
    initReadingProgressBar();

    // 2. Setup Header Search Logic (Global Search)
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.getElementById('searchBtn');
    const backIcon = document.getElementById('backBtn');
    const headerSearchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestions-list');

    const closeHeaderSearch = () => {
        searchContainer.classList.remove('active');
        headerSearchInput.value = '';
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            suggestionsList.style.display = 'none';
        }
    };
    
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            searchContainer.classList.add('active');
            headerSearchInput.focus();
        });
    }

    if (backIcon) {
        backIcon.addEventListener('click', closeHeaderSearch);
    }
    
    if (headerSearchInput && suggestionsList) {
        headerSearchInput.addEventListener('input', () => {
            const query = headerSearchInput.value.trim();
            const searchData = window.GKApp?.searchData || [];
            const fuzzySearch = window.GKApp?.fuzzySearch;

            if (!fuzzySearch || query.length < 1) {
                suggestionsList.innerHTML = '';
                suggestionsList.style.display = 'none';
                return;
            }

            const filtered = fuzzySearch(query, searchData);

            suggestionsList.style.display = 'block';
            if (filtered.length > 0) {
                suggestionsList.innerHTML = filtered.map(post => `
                    <li>
                        <a href="${post.url}" class="result-card" title="${post.title}">
                            <img src="${post.image}" alt="${post.title}" class="result-image">
                            <div class="result-text">
                                <div class="result-title">${post.title}</div>
                                <p class="result-paragraph">${post.paragraph}</p>
                            </div>
                            <div class="result-arrow">›</div>
                        </a>
                    </li>
                `).join('');
            } else {
                suggestionsList.innerHTML = '<li style="padding: 1rem; text-align: center; color: var(--text-secondary);">No results found.</li>';
            }
        });
    }
    
    document.addEventListener('click', (e) => {
        if (searchContainer && !searchContainer.contains(e.target) && searchContainer.classList.contains('active')) {
            closeHeaderSearch();
        }
    });


    // 3. Setup Blog Post rendering and filtering logic (On-page filter)
    const POSTS_PER_PAGE = 6;
    const postsContainer = document.getElementById('posts-container');
    const postFilterInput = document.getElementById('post-filter-input');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    if (!postsContainer || !loadMoreBtn || !backToTopBtn) {
        return;
    }

    const allPosts = window.GKApp?.searchData || [];
    let currentFilteredPosts = [...allPosts];
    let visiblePostCount = POSTS_PER_PAGE;

    const renderPosts = (posts) => {
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts-found">No articles match your filter.</p>';
            return;
        }

        posts.forEach((post, index) => {
            const postElement = document.createElement('a');
            postElement.href = post.url;
            postElement.className = 'post-card-link';
            postElement.setAttribute('title', post.title);
            
            const words = post.paragraph.split(/\s+/).length;
            const readingTime = Math.ceil(words / 225);

            postElement.innerHTML = `
                <article class="post-card" style="animation-delay: ${index * 100}ms">
                    <img src="${post.image}" alt="${post.title}" class="post-card-image" loading="lazy">
                    <div class="post-card-content">
                        <h2 class="post-card-title">${post.title}</h2>
                        <div class="post-card-meta">
                            <span class="post-author">By ${post.author}</span>
                             <span class="post-reading-time">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v6h6v-2h-4V7z"></path></svg>
                                ${readingTime} min read
                            </span>
                            <span class="post-date">${post.date}</span>
                        </div>
                        <p class="post-card-excerpt">${post.paragraph}</p>
                    </div>
                </article>
            `;
            postsContainer.appendChild(postElement);
        });
    };

    const updatePostsDisplay = () => {
        const postsToRender = currentFilteredPosts.slice(0, visiblePostCount);
        renderPosts(postsToRender);

        if (visiblePostCount >= currentFilteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    };

    const handleFilter = (filteredPosts) => {
        currentFilteredPosts = filteredPosts;
        visiblePostCount = POSTS_PER_PAGE;
        updatePostsDisplay();
    };
    
    const applyFilters = () => {
        const category = document.querySelector('.category-list a.active-category')?.dataset.category || 'all';
        const query = postFilterInput ? postFilterInput.value.trim().toLowerCase() : '';

        let filtered = allPosts;

        if (category.toLowerCase() !== 'all') {
            filtered = filtered.filter(post => post.category === category);
        }

        if (query) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.paragraph.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query)
            );
        }

        handleFilter(filtered);
    };

    if (postFilterInput) {
        postFilterInput.addEventListener('input', applyFilters);
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active-category'));
            link.classList.add('active-category');
            applyFilters();
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        visiblePostCount += POSTS_PER_PAGE;
        updatePostsDisplay();
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial render and setup
    applyFilters();
    
    // 4. Initialize Comments
    if (document.getElementById('comment-section')) {
        const commentManager = new CommentManager();
        commentManager.init();
    }
});
