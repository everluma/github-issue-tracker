const button = document.querySelector('button');

button.addEventListener('click', function (){
    const username = document.querySelector("input[type='text']").value;

    const password = document.querySelector("input[type='password']").value;

    if (username === 'admin' && password === 'admin123'){
    window.location.href= "main.html";
} else {
    alert('Invalid Username or password');
}
});

