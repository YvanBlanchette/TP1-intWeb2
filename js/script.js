//HEADER CHANGE ON SCROLL FUNCTIONALITY
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// INFO COUNTERS FUNCTIONALITY
const counters = document.querySelectorAll('.js-counter');
const countersContainer = document.querySelector('.js-counters-container');

// Variable to track if the counters are active
let activated = false;

// Scroll event listener
window.addEventListener('scroll', () => {
  if (pageYOffset > countersContainer.offsetTop - countersContainer.offsetHeight - 300 && !activated) {
    counters.forEach((counter) => {
      // Reset the counters
      counter.innerText = 0;
      // Set the count tracker vartiable to 0
      let count = 0;

      // Create the updateCounter Function
      function updateCounter() {
        // Get the counter target from data attribute
        const target = +counter.dataset.count;

        // Check if the count is less than the target
        if (count < target) {
          // Add 1 to the count
          count++;
          // Update the counter
          counter.innerText = count;

          // Run the function every 10 miliseconds
          setTimeout(updateCounter, 3)
        } else {
          // Set the counter to the target
          counter.innerText = target;
        }
      }
      // Run the function
      updateCounter();

      //Set activated to true
      activated = true;

    })
  } else if (pageYOffset < countersContainer.offsetTop - countersContainer.offsetHeight - 500 || pageYOffset === 0 && activated) {
    counters.forEach((counter) => {
      counter.innerText = 0;
    });
    activated = false;
  }
})



// STARBASE CARDS FUNCTIONALITY
const starbaseCards = document.querySelectorAll('.starbase__card');

starbaseCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('open')) {
      // Close any other opened cards
      starbaseCards.forEach((otherCard) => {
        if (otherCard !== card && otherCard.classList.contains('open')) {
          otherCard.classList.remove('open');
        }
      });
      // Open the clicked card
      card.classList.add('open');
    } else {
      // Close the clicked card
      card.classList.remove('open');
    }
  });
});