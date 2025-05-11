function toggleMenu() {
    const nav = document.getElementById("navItems");
    nav.classList.toggle('show');
}

// HIDING ALREADY SCROLLED ELEMENTS
// function hideTextOnScroll() {
//     const textElement = document.querySelector('.hero-content');

//     // check how far the user has scrolled from top
//     if (window.scrollY > 100) {
//         textElement.classList.add('.text-hidden');
//     } else{
//         textElement.classList.remove('.text-hidden');
//     }
// }


function doante(amount) {
    alert(`Redirecting to donation page for $${amount}...`)
    // Redirects to payment provider here (e.g, Crypto)
}

function donateCustom() {
    const amount = prompt("Enter custom donation amount: ")
    if (amount) donate(amount);
}

document.querySelector('a[href=#about]').addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
})