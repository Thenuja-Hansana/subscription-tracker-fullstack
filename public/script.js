// DOM Elements
const authContainer = document.getElementById('authContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const subForm = document.getElementById('subForm');
const userInfo = document.getElementById('userInfo');
const subList = document.getElementById('subList');
const logoutBtn = document.getElementById('logoutBtn');
const testEmailBtn = document.getElementById('testEmailBtn');

// State Management
let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user'));

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    if (token && user) {
        showDashboard();
    } else {
        showAuth();
    }
});

// Auth Functions
function showDashboard() {
    authContainer.style.display = 'none';
    dashboardContainer.style.display = 'block';
    logoutBtn.style.display = 'block';
    userInfo.innerHTML = `
        <p><strong>Signed in as:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
    `;
    fetchSubscriptions();
}

function showAuth() {
    authContainer.style.display = 'block';
    dashboardContainer.style.display = 'none';
    logoutBtn.style.display = 'none';
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token = null;
    user = null;
    showAuth();
});

// Handle Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/v1/auth/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            token = result.data.token;
            user = result.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
        } else {
            alert(result.message || 'Login failed');
        }
    } catch (error) {
        alert('Error connecting to server');
    }
});

// Handle Registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/v1/auth/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();

        if (result.success) {
            token = result.data.token;
            user = result.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            showDashboard();
        } else {
            alert(result.message || 'Registration failed');
        }
    } catch (error) {
        alert('Error connecting to server');
    }
});

// Fetch Protected Data
async function fetchSubscriptions() {
    try {
        const response = await fetch('/api/v1/subscriptions', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        
        if (result.success) {
            displaySubscriptions(result.data);
        } else if (response.status === 401) {
            logoutBtn.click(); // Token expired or invalid
        }
    } catch (error) {
        console.error('Error fetching subscriptions');
    }
}

testEmailBtn.addEventListener('click', async () => {
    testEmailBtn.innerText = 'Checking...';
    try {
        const response = await fetch('/api/v1/subscriptions/check-reminders', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert('Error triggering check');
    } finally {
        testEmailBtn.innerText = 'Check Reminders Now';
    }
});

function displaySubscriptions(subs) {
    subList.innerHTML = subs.map(sub => `
        <li>
            <strong>${sub.name}</strong> - $${sub.price} (${sub.frequency})
            <br>
            <small>Next Renewal: ${new Date(sub.renewalDate).toLocaleDateString()}</small>
        </li>
    `).join('');
}

// Add Subscription
subForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const subData = {
        name: document.getElementById('subName').value,
        price: document.getElementById('subPrice').value,
        frequency: document.getElementById('subFrequency').value,
        startDate: document.getElementById('subStartDate').value,
        user: user.id // We get the user ID from our stored user state!
    };

    try {
        const response = await fetch('/api/v1/subscriptions', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(subData)
        });

        const result = await response.json();
        if (result.success) {
            fetchSubscriptions();
            subForm.reset();
        } else {
            alert(result.message || 'Failed to add subscription');
        }
    } catch (error) {
        alert('Error connecting to server');
    }
});
