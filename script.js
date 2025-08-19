let currentSlide = 1
const totalSlides = 10

function updateSlide() {
  // Hide all slides
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.classList.remove("active", "prev")
  })

  // Show current slide
  const current = document.querySelector(`[data-slide="${currentSlide}"]`)
  current.classList.add("active")

  // Update counter
  document.querySelector(".current-slide").textContent = currentSlide

  // Update progress bar
  const progressPercent = (currentSlide / totalSlides) * 100
  document.querySelector(".progress-fill").style.width = progressPercent + "%"

  // Update navigation buttons
  document.querySelector(".prev-btn").disabled = currentSlide === 1
  document.querySelector(".next-btn").disabled = currentSlide === totalSlides

  // Add entrance animations to slide content
  setTimeout(() => {
    const slideContent = current.querySelector(".slide-content")
    slideContent.style.animation = "none"
    slideContent.offsetHeight // Trigger reflow
    slideContent.style.animation = "slideIn 0.8s ease-out"
  }, 100)
}

function nextSlide() {
  if (currentSlide < totalSlides) {
    currentSlide++
    updateSlide()
  }
}

function previousSlide() {
  if (currentSlide > 1) {
    currentSlide--
    updateSlide()
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault()
    nextSlide()
  } else if (e.key === "ArrowLeft") {
    e.preventDefault()
    previousSlide()
  }
})

// Touch/swipe support for mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      previousSlide()
    }
  }
}

// Auto-advance slides (optional - uncomment to enable)
/*
let autoAdvanceTimer;
function startAutoAdvance() {
    autoAdvanceTimer = setInterval(() => {
        if (currentSlide < totalSlides) {
            nextSlide();
        } else {
            currentSlide = 1;
            updateSlide();
        }
    }, 10000); // 10 seconds per slide
}

function stopAutoAdvance() {
    clearInterval(autoAdvanceTimer);
}

// Start auto-advance
startAutoAdvance();

// Pause auto-advance on user interaction
document.addEventListener('click', stopAutoAdvance);
document.addEventListener('keydown', stopAutoAdvance);
document.addEventListener('touchstart', stopAutoAdvance);
*/

// Initialize
updateSlide()

// Add smooth scrolling and enhanced animations
document.addEventListener("DOMContentLoaded", () => {
  // Add stagger animation to list items
  document.querySelectorAll(".slide").forEach((slide, slideIndex) => {
    const listItems = slide.querySelectorAll("li, .load-item, .parameter-card, .calc-step")
    listItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1 + 0.2}s`
    })
  })

  // Add particle effect to title slide
  if (currentSlide === 1) {
    createParticles()
  }
})

function createParticles() {
  const titleSlide = document.querySelector('[data-slide="1"]')
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `
    titleSlide.appendChild(particle)
  }
}

// Add CSS for particle animation
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
`
document.head.appendChild(style)
