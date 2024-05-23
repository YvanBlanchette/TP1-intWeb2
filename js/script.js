// !---> HEADER CHANGE ON SCROLL FUNCTIONALITY <---! //
const header = document.querySelector('.header');
const logoContainer = document.querySelector('.header__logo-container');
const navMenu = document.querySelector('.header__nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});



// !---> SECTION SCROLL FUNCTIONALITY <---! //
const sections = document.querySelectorAll('section');

const options = {
  root: null, // relative to the viewport
  rootMargin: '0px',
  threshold: 0.3 // 30% of the section is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});




// !---> INFO COUNTERS FUNCTIONALITY <---! //
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



// !---> STARBASE CARDS FUNCTIONALITY <---! //
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



// !---> MOBILE NAV FUNCTIONALITY <---! //
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('nav-menu');
const navLink = document.querySelectorAll('.nav__link');

mobileMenuBtn.addEventListener('click', () => {
  mobileNav.classList.toggle('show');
})

navLink.forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('show');
  })
})


// !---> FORM SUBMISSION & VALIDATION <---! //
const form = document.getElementById('form');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const message = document.getElementById('message');

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const handleSubmit = (e) => {
  e.preventDefault();
  const validForm = formValidation()

  if (validForm) {
    window.location.href = "message-confirmation.html";
  }
}

const formValidation = () => {
  let noError = true;

  const first_nameVal = first_name.value.trim();
  const last_nameVal = last_name.value.trim();
  const emailVal = email.value.trim();
  const messageVal = message.value.trim();

  if (first_nameVal === '') {
    setError(first_name, 'SVP inscrire votre prénom...');
    noError = false;
  } else {
    setSuccess(first_name);
  }

  if (last_nameVal === '') {
    setError(last_name, 'SVP inscrire votre nom de famille...');
    noError = false;
  } else {
    setSuccess(last_name);
  }

  if (emailVal === '') {
    setError(email, 'SVP inscrire votre email...');
    noError = false;
  } else if (!isValidEmail(emailVal)) {
    setError(email, 'Courriel invalide...');
    noError = false;
  } else {
    setSuccess(email);
  }

  if (messageVal === '') {
    setError(message, 'SVP inscrire votre message...');
    noError = false;
  } else {
    setSuccess(message);
  }
  return noError;
}

const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector('.errorMessage');
  errorDisplay.innerText = message;
  inputControl.classList.remove('success');
  inputControl.classList.add('error');
}

const setSuccess = (input) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector('.errorMessage');
  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
}
