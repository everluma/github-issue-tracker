const button = document.querySelector('button');

button.addEventListener('click', function (){
    const username = document.getElementById('username').value;

    const password = document.getElementById("password").value;

    if (username === 'admin' && password === 'admin123'){
        localStorage.setItem("login", "true");
    window.location.href= "main.html";
} else {
    alert('Invalid Username or password');
}
});

