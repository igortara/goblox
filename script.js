// Get database reference
const database = firebase.database();
const messagesRef = database.ref('messages');

function addPost() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;

    if (!nickname || !message) {
        alert('Please fill in all fields!');
        return;
    }

    const newMessage = {
        author: nickname,
        message: message,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    // Add message to Firebase
    messagesRef.push(newMessage);

    // Clear input fields
    document.getElementById('nickname').value = '';
    document.getElementById('message').value = '';
}

function displayMessage(msg, key) {
    const postsContainer = document.getElementById('posts');
    const existingPost = document.getElementById(key);
    
    if (existingPost) {
        return; // Skip if message is already displayed
    }

    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.id = key;
    
    postElement.innerHTML = `
        <div class="post-header">
            <span class="post-author">${escapeHtml(msg.author)}</span>
            <span class="post-time">${msg.time} ${msg.date || ''}</span>
        </div>
        <div class="post-content">${escapeHtml(msg.message)}</div>
    `;

    // Add new messages to the top
    postsContainer.insertBefore(postElement, postsContainer.firstChild);
}

// Function for safe HTML display
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Listen for database changes
window.onload = function() {
    // Load last 50 messages
    messagesRef.orderByChild('timestamp').limitToLast(50).on('child_added', (snapshot) => {
        const message = snapshot.val();
        displayMessage(message, snapshot.key);
    });

    // Add demo messages only if database is empty
    messagesRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            const demoMessages = [
                {
                    author: "Builderman",
                    message: "Hello everyone! Welcome to the forum!",
                    time: "12:00",
                    date: new Date().toLocaleDateString(),
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                },
                {
                    author: "Roblox_Fan2014",
                    message: "Who wants to play Natural Disaster Survival?",
                    time: "12:05",
                    date: new Date().toLocaleDateString(),
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                }
            ];
            
            demoMessages.forEach(msg => {
                messagesRef.push(msg);
            });
        }
    });
} 