/*
const xhr = new XMLHttpRequest();

xhr.addEventListener ('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
*/

// Simple than XMLHttpRequest 
// Fetch Uses Promises
async function fetchLearn () {
    try {
        // throw 'error';
        return fetch('https://supersimplebackend.dev/products').then((response) => {
            // console.log(response);
            return response.json(); // json is also asyncronous it return a promise
        }).then ((data) => {
            console.log(data);
        });
    } catch (error) {
        console.error('Fetch failed:', error);
    }
}


// async await is a shortcut for promises
async function loadPage () {
    console.log('Page Load');

    await fetchLearn();

    return 'value2';
}
loadPage().then((value) => {
    console.log('Next step');
    console.log(value);
});