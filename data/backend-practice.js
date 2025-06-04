const xhr = new XMLHttpRequest();

xhr.addEventListener ('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

// Simple than XMLHttpRequest 
// Fetch Uses Promises
function fetchLearn () {
    fetch('https://supersimplebackend.dev/products').then((response) => {
        // console.log(response);
        return response.json(); // json is also asyncronous it return a promise
    }).then ((data) => {
        console.log(data);
    });
}

fetchLearn();