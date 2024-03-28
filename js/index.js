// Dynamically popping up the elements on an index page
function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
        }
    });
}

let options = {
    threshold: [0.1] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.h1_title, .main, .external-links');

for (let elm of elements) {
    observer.observe(elm);
}