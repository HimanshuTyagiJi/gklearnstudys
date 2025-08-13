
// Import functions from the Firebase v9 SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp,
    doc,
    deleteDoc,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// =================================================================================
// 🔥🔥🔥 ACTION REQUIRED: PASTE YOUR FIREBASE CONFIGURATION HERE 🔥🔥🔥
// =================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCFIKqQ5OICMZhWPtZqmgem0bEW7QpoPcw",
  authDomain: "appcomment.firebaseapp.com",
  projectId: "appcomment",
  storageBucket: "appcomment.firebasestorage.app",
  messagingSenderId: "156258808941",
  appId: "1:156258808941:web:04a1f7470ac43657c7fb64",
  measurementId: "G-2HX1M5QQ44"
};

// --- Declare variables for DOM Elements ---
let commentFormSection, commentForm, nameInput, commentInput, submitButton, commentsList, charCounter;

// --- Firebase and DB instance ---
let db;

// --- Helper Functions ---

function getPageIdentifier() {
    // Generate a consistent ID from the page's URL path to keep comments page-specific.
    // We use the pathname, remove leading/trailing slashes, and replace inner slashes.
    const path = window.location.pathname;
    
    // Handle the root path as a special case for clarity.
    if (path === '/' || path === '/index.html' || path === '') {
        return 'main_page';
    }
    
    // Create a clean ID that is valid for Firestore: /blog/my-post/ -> blog_my-post
    return path.substring(1).replace(/\/$/, '').replace(/\//g, '_');
}

function showConfigError() {
    const commentsListElement = document.getElementById('comments-list');
    if(commentsListElement) {
        commentsListElement.innerHTML = `
            <div class="config-error">
                <h3><span class="emoji">⚙️</span> Action Required: Connect Your Firebase Project</h3>
                <p>To make it work, you need to configure this widget with your own Firebase project credentials.</p>
                <h4>Step 1: Update the Code</h4>
                <p>Open the <code>comment.js</code> file and replace the placeholder <code>firebaseConfig</code> object with your own.</p>
                <h4>Step 2: Update Firestore Rules</h4>
                <p>In your Firebase project dashboard, go to the <strong>Firestore Database → Rules</strong> tab and paste the rules provided in the updated installation guide. <strong>The old rules will not work with this version.</strong></p>
            </div>
        `;
    }
}

function showConnectionError(error) {
    const commentsListElement = document.getElementById('comments-list');
    if(commentsListElement) {
        commentsListElement.innerHTML = `
            <div class="config-error">
                <h3><span class="emoji">🔌</span> Firebase Connection Error</h3>
                <p>We see you've added a config, but we couldn't connect. This often happens if the website's domain isn't authorized in Firebase.</p>
                <h4>Troubleshooting Steps:</h4>
                <ol>
                    <li><strong>Authorize Your Domain:</strong> In your <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a>, go to <strong>Authentication → Settings → Authorized domains</strong> and add your website's domain (e.g., <code>yourwebsite.com</code>).</li>
                    <li><strong>Correct Credentials:</strong> Double-check your <code>firebaseConfig</code> in <code>comment.js</code>.</li>
                    <li><strong>Firestore Enabled:</strong> Make sure you have created a Firestore Database in your project.</li>
                    <li><strong>Security Rules:</strong> Ensure your Firestore "Rules" are updated to the latest version from the installation guide. The new rules are required.</li>
                </ol>
                <p><strong>Original Error:</strong> <code>${escapeHTML(error.message)}</code></p>
            </div>
        `;
    }
}

function showMissingFilesError(type) {
    const widgetContainer = document.querySelector('.firebase-comments-widget');
    if (!widgetContainer) return;
    const message = type === 'css' ?
        `<h3><span class="emoji">🎨</span> CSS File Not Loaded</h3><p>The link to <code>comment.css</code> is broken or incorrect. Please check the <code>&lt;link&gt;</code> tag in your HTML's <code>&lt;head&gt;</code>.</p>` :
        `<h3><span class="emoji">👀</span> HTML Structure Error</h3><p>The comment widget's HTML is missing or incomplete. Please copy the entire <code>&lt;div class="firebase-comments-widget"&gt;...&lt;/div&gt;</code> block from the guide.</p>`;
    
    widgetContainer.innerHTML = `<div class="container" style="margin: 0; max-width: 100%;"><div class="config-error">${message}</div></div>`;
}

// --- Main Application Logic ---

function initApp() {
    const widgetContainer = document.querySelector('.firebase-comments-widget');
    if (!widgetContainer) {
        console.error("Firebase Comments: Main widget container '.firebase-comments-widget' not found.");
        return;
    }

    commentFormSection = widgetContainer.querySelector('.comment-form-section');
    commentForm = widgetContainer.querySelector('#comment-form');
    nameInput = widgetContainer.querySelector('#name');
    commentInput = widgetContainer.querySelector('#comment');
    submitButton = widgetContainer.querySelector('#submit-button');
    commentsList = widgetContainer.querySelector('#comments-list');
    charCounter = widgetContainer.querySelector('#char-counter');
    const containerElement = widgetContainer.querySelector('.container');

    if (!commentFormSection || !commentsList || !commentForm || !containerElement) {
        showMissingFilesError('html');
        return;
    }
    
    // REMOVED: The check for CSS loading via getComputedStyle, which caused a forced reflow.
    // This check was a safeguard, but assuming the CSS is linked correctly, it's better for performance to remove it.
    
    commentsList.innerHTML = `<div class="spinner-container"><div class="spinner"></div><p>Loading comments...</p></div>`;

    try {
        if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_")) {
             throw new Error("Invalid Firebase API Key");
        }
        
        const pageId = getPageIdentifier();
        const commentsCollectionPath = ['pages', pageId, 'comments'];

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);

        commentFormSection.hidden = false;
        
        commentForm.addEventListener('submit', (event) => handleFormSubmit(event, commentsCollectionPath));
        commentInput.addEventListener('input', updateCharCounter);
        
        const commentsQuery = query(collection(db, ...commentsCollectionPath), orderBy('timestamp', 'desc'));
        
        onSnapshot(commentsQuery, 
            (snapshot) => displayComments(snapshot, commentsCollectionPath),
            (error) => {
                console.error("Firestore snapshot error:", error.code, error.message);
                showConnectionError(error);
            }
        );
        updateCharCounter();

    } catch (error) {
        console.error("Firebase initialization error:", error);
        if (error.message.includes("Invalid Firebase API Key")) {
            showConfigError();
        } else {
            showConnectionError(error);
        }
    }
}

async function handleFormSubmit(event, collectionPath) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();
    if (name === '' || comment === '') return;

    submitButton.disabled = true;
    submitButton.textContent = 'Posting...';

    try {
        await addDoc(collection(db, ...collectionPath), {
            name: name,
            comment: comment,
            timestamp: serverTimestamp()
        });
        commentForm.reset();
        updateCharCounter();
    } catch (error) {
        console.error("Error adding comment:", error.message);
        alert("Error submitting comment. Check console and Firestore rules.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Post Comment';
    }
}

function displayComments(snapshot, collectionPath) {
    commentsList.innerHTML = '';
    if (snapshot.empty) {
        commentsList.innerHTML = `<div class="no-comments"><p><strong>No comments yet.</strong></p><p>Be the first to post a comment!</p></div>`;
        return;
    }
    snapshot.forEach(doc => {
        try {
            const commentElement = createCommentElement(doc.id, doc.data(), collectionPath);
            commentsList.appendChild(commentElement);
            const repliesPath = [...collectionPath, doc.id, 'replies'];
            fetchAndDisplayReplies(commentElement, repliesPath);
        } catch (error) {
            console.error("Failed to render a comment:", error.message, doc.data());
        }
    });
}

async function handleReplySubmit(event, replyCollectionPath) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('.reply-name-input').value.trim();
    const replyText = form.querySelector('.reply-text-input').value.trim();
    if (name === '' || replyText === '') return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
        await addDoc(collection(db, ...replyCollectionPath), { name, comment: replyText, timestamp: serverTimestamp() });
        const container = form.closest('.reply-form-container');
        if (container) container.innerHTML = '';
    } catch (error) {
        console.error("Error adding reply:", error.message);
        alert("Failed to post reply.");
        submitBtn.disabled = false;
    }
}

async function deleteDocAndSubcollections(pathSegments) {
    const subcollectionsSnapshot = await getDocs(collection(db, ...pathSegments, 'replies'));
    for (const replyDoc of subcollectionsSnapshot.docs) {
        await deleteDocAndSubcollections([...pathSegments, 'replies', replyDoc.id]);
    }
    await deleteDoc(doc(db, ...pathSegments));
}

async function handleDeleteClick(pathSegments) {
    if (!confirm("Are you sure you want to delete this item and all of its replies?")) return;
    try {
        await deleteDocAndSubcollections(pathSegments);
    } catch(error) {
        console.error("Error deleting document:", error.message);
        alert("Could not delete item.");
    }
}

function fetchAndDisplayReplies(parentElement, repliesCollectionPath) {
    const repliesContainer = parentElement.querySelector('.replies-container');
    if (!repliesContainer) return;

    const repliesQuery = query(collection(db, ...repliesCollectionPath), orderBy('timestamp', 'asc'));
    onSnapshot(repliesQuery, (snapshot) => {
        repliesContainer.innerHTML = '';
        snapshot.forEach((doc) => {
            try {
                const replyElement = createReplyElement(doc.id, doc.data(), repliesCollectionPath);
                repliesContainer.appendChild(replyElement);
                fetchAndDisplayReplies(replyElement, [...repliesCollectionPath, doc.id, 'replies']);
            } catch (error) {
                 console.error("Failed to render a reply:", error.message, doc.data());
            }
        });
    });
}

function createCommentElement(id, data, parentCollectionPath) {
    const element = document.createElement('div');
    element.classList.add('comment-item');
    const myPath = [...parentCollectionPath, id];

    element.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHTML(data.name)}</span>
            <span class="comment-date">${timeAgo(safeToDate(data.timestamp))}</span>
        </div>
        <p class="comment-body">${escapeHTML(data.comment)}</p>
        <div class="comment-actions">
            <button class="action-btn reply-btn" aria-label="Reply">Reply</button>
            <button class="action-btn delete-btn" aria-label="Delete">Delete</button>
        </div>
        <div class="reply-form-container"></div>
        <div class="replies-container"></div>`;

    element.querySelector('.reply-btn').addEventListener('click', () => toggleReplyForm(element, myPath));
    element.querySelector('.delete-btn').addEventListener('click', () => handleDeleteClick(myPath));
    return element;
}

function createReplyElement(id, data, parentCollectionPath) {
    const element = document.createElement('div');
    element.classList.add('comment-item', 'reply-item');
    const myPath = [...parentCollectionPath, id];

    element.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHTML(data.name)}</span>
            <span class="comment-date">${timeAgo(safeToDate(data.timestamp))}</span>
        </div>
        <p class="comment-body">${escapeHTML(data.comment)}</p>
        <div class="comment-actions">
            <button class="action-btn reply-btn" aria-label="Reply">Reply</button>
            <button class="action-btn delete-btn" aria-label="Delete">Delete</button>
        </div>
        <div class="reply-form-container"></div>
        <div class="replies-container"></div>`;
    
    element.querySelector('.reply-btn').addEventListener('click', () => toggleReplyForm(element, myPath));
    element.querySelector('.delete-btn').addEventListener('click', () => handleDeleteClick(myPath));
    return element;
}

function toggleReplyForm(commentElement, collectionPathToPostTo) {
    const replyFormContainer = commentElement.querySelector('.reply-form-container');
    const wasOpen = replyFormContainer.innerHTML !== '';

    // First, perform all DOM writes.
    // Close all open reply forms to ensure only one is open at a time.
    document.querySelectorAll('.reply-form-container').forEach(c => {
        c.innerHTML = '';
    });

    // If the clicked form was closed, now we open it.
    if (!wasOpen) {
        replyFormContainer.innerHTML = `
            <form class="reply-form">
                <div class="form-group"><input type="text" class="reply-name-input" placeholder="Your name" required maxlength="50" aria-label="Your Name for Reply"></div>
                <div class="form-group"><textarea class="reply-text-input" rows="2" placeholder="Write a reply..." required maxlength="500" aria-label="Reply text"></textarea></div>
                <div class="reply-form-actions">
                    <button type="submit">Post Reply</button>
                    <button type="button" class="cancel-reply-btn">Cancel</button>
                </div>
            </form>`;
        
        const replyForm = replyFormContainer.querySelector('.reply-form');
        const inputToFocus = replyForm.querySelector('input.reply-name-input');
        const postPath = [...collectionPathToPostTo, 'replies'];
        
        replyForm.addEventListener('submit', (e) => handleReplySubmit(e, postPath));
        replyFormContainer.querySelector('.cancel-reply-btn').addEventListener('click', () => {
            replyFormContainer.innerHTML = '';
        });

        // Defer the focus() call to the next frame to avoid a forced reflow.
        // This separates the read (implicit in focus()) from the preceding DOM writes.
        requestAnimationFrame(() => {
            inputToFocus.focus();
        });
    }
}

function updateCharCounter() {
    if (commentInput) {
        const currentLength = commentInput.value.length;
        const maxLength = commentInput.maxLength;
        charCounter.textContent = `${currentLength} / ${maxLength}`;
    }
}

function escapeHTML(str) {
    return String(str ?? '').replace(/[&<>"']/g, (match) => {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[match];
    });
}

function safeToDate(timestamp) {
    return (timestamp && typeof timestamp.toDate === 'function') ? timestamp.toDate() : new Date();
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 5) return "just now";
    const intervals = { 'year': 31536000, 'month': 2592000, 'day': 86400, 'hour': 3600, 'minute': 60, 'second': 1 };
    for (let unit in intervals) {
        let interval = seconds / intervals[unit];
        if (interval > 1) {
            const floor = Math.floor(interval);
            return `${floor} ${unit}${floor === 1 ? '' : 's'} ago`;
        }
    }
    return 'just now';
}

document.addEventListener('DOMContentLoaded', () => {
    const commentSectionContainer = document.getElementById('custom-comment-section');

    if (!commentSectionContainer) {
        return; // No comment section on this page
    }

    // Set up a temporary loader. This will be replaced by initApp's content.
    const commentsList = commentSectionContainer.querySelector('#comments-list');
    if (commentsList) {
        commentsList.innerHTML = `<div class="spinner-container"><div class="spinner"></div><p>Waiting for comments...</p></div>`;
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The comment section is visible, so initialize Firebase.
                initApp();
                // We only need to do this once.
                observer.unobserve(commentSectionContainer);
            }
        });
    }, {
        rootMargin: '250px 0px', // Start loading when the user is 250px away from the comments.
        threshold: 0.01
    });

    // Start observing the comment section container.
    observer.observe(commentSectionContainer);
});
