// Auth state observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userDisplay').style.display = 'inline';
        document.getElementById('userName').textContent = user.email;
        document.getElementById('authModal').style.display = 'none';
    } else {
        // User is signed out
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('userDisplay').style.display = 'none';
    }
});

// Modal handling
const modal = document.getElementById('authModal');
const span = document.getElementsByClassName('close')[0];

function toggleAuth() {
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Authentication functions
function login() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Logged in successfully
            modal.style.display = 'none';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function register() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registered successfully
            modal.style.display = 'none';
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
}

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful
    }).catch((error) => {
        alert('Error: ' + error.message);
    });
} 