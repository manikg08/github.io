// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest("nav") && menu.classList.contains("active")) {
    menu.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    if (menu.classList.contains("active")) {
      menu.classList.remove("active");
    }

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for header
        behavior: "smooth",
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Form validation
    if (!name || !email || !message) {
      showFormStatus("Please fill in all fields", "error");
      return;
    }

    // This would normally send data to a server
    // For GitHub Pages, we'll just simulate a successful submission
    showFormStatus(
      "Thank you for your message! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();

    // Clear success message after 5 seconds
    setTimeout(() => {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }, 5000);
  });
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

// Reveal animations on scroll
function revealOnScroll() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.classList.add("visible");
    }
  });
}

// Add CSS for reveal animations
const style = document.createElement("style");
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    section:nth-child(even) {
        transition-delay: 0.2s;
    }
`;
document.head.appendChild(style);

// Initialize animations
window.addEventListener("DOMContentLoaded", () => {
  // Set initial visible state for sections above the fold
  revealOnScroll();

  // Listen for scroll events
  window.addEventListener("scroll", revealOnScroll);
});
