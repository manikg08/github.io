document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // Modal functionality
  // ==========================================
  const modalTriggers = document.querySelectorAll(".project-modal-trigger");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const projectId = this.getAttribute("data-project-id");
      const modal = document.getElementById(`${projectId}-modal`);
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Disable scroll when modal is open
    });
  });

  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".project-modal").style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scroll when modal is closed
    });
  });

  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("project-modal")) {
      e.target.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".project-modal").forEach((modal) => {
        if (modal.style.display === "block") {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    }
  });

  // ==========================================
  // Mobile menu functionality
  // ==========================================
  const hamburger = document.getElementById("hamburger");
  const menu = document.querySelector(".menu");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("nav") && menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });

  // ==========================================
  // Smooth scrolling
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ==========================================
  // Form handling
  // ==========================================
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !message) {
        showFormStatus("Please fill in all fields", "error");
        return;
      }

      showFormStatus(
        "Thank you for your message! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();

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

  revealOnScroll();
  window.addEventListener("scroll", revealOnScroll);

  // ==========================================
  // Hero Section Background Image Transition
  // ==========================================
  const heroSection = document.querySelector(".hero");

async function getUnsplashImage() {
  try {
    const response = await fetch("https://source.unsplash.com/random/1600x900/?technology");
    return response.url;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "images/default.jpg"; // Fallback image
  }
}

async function changeBackground() {
  const nextImage = await getUnsplashImage();

  const overlay = document.createElement("div");
  overlay.className = "hero-overlay";
  overlay.style.backgroundImage = `url(${nextImage})`;
  heroSection.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    heroSection.style.backgroundImage = `url(${nextImage})`;
    overlay.remove();
  }, 1000);
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
changeBackground();
