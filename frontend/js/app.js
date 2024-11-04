async function register() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) showLogin();
}
async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        showBooks();
    } else {
        alert(data.message);
    }
}
function showRegister() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

function showLogin() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('register').style.display = 'none';
}

function showBooks() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('books').style.display = 'block';
}
async function fetchBooks() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/books', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const books = await response.json();
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(li);
    });
}
function logout() {
    localStorage.removeItem('token');
    showLogin();
}
