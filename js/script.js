document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // Modal functionality
  // ==========================================

  // Get all modal triggers
  const modalTriggers = document.querySelectorAll(".project-modal-trigger");

  // Add click event to each trigger
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const projectId = this.getAttribute("data-project-id");
      const modal = document.getElementById(projectId + "-modal");
      modal.style.display = "block";
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden";
    });
  });

  // Handle close buttons
  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".project-modal").style.display = "none";
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("project-modal")) {
      e.target.style.display = "none";
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = "auto";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".project-modal").forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          // Re-enable body scrolling when modal is closed
          document.body.style.overflow = "auto";
        }
      });
    }
  });

  // ==========================================
  // Mobile menu functionality
  // ==========================================

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });

  // ==========================================
  // Smooth scrolling
  // ==========================================

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

  // ==========================================
  // Form handling
  // ==========================================

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
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.className = `form-status ${type}`;
    }
  }

  // ==========================================
  // Scroll animations
  // ==========================================

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
  // Set initial visible state for sections above the fold
  revealOnScroll();

  // Listen for scroll events
  window.addEventListener("scroll", revealOnScroll);
});
