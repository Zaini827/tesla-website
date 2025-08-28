
// ===============================
// Tesla-style Promo Slider
// ===============================

// sab slides, dots aur buttons select karo
let slides = document.querySelectorAll(".promo");
let dots = document.querySelectorAll(".dot");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");


let index = 0;
let slideInterval = setInterval(nextSlide, 5000); // Auto slide every 5 sec

// function: ek slide show karna
function showSlide(n) {
  // agar range se bahar ho to reset karo
  if (n >= slides.length) n = 0;
  if (n < 0) n = slides.length - 1;


  // sab slides aur dots reset karo
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
  });

  // current slide active karo
  slides[n].classList.add("active");
  dots[n].classList.add("active");

  index = n;
}

// next slide
function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

// prev slide
function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// manual controls
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetInterval();
  });
});

// auto-slide reset after manual action
function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// init: first slide show karo
showSlide(0);






document.addEventListener("DOMContentLoaded", function () {
  function initSlider(sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (!section) return;

    const wrapper = section.querySelector(".slides-wrapper");
    const slides = section.querySelectorAll(".slide");
    const dots = section.querySelectorAll(".dot");

    let currentIndex = 0;

    // Function: go to selected slide
    function goToSlide(idx) {
      currentIndex = idx;
      const slideWidth = slides[0].offsetWidth + 20; // width + gap (20px CSS me diya hai)
      wrapper.scrollTo({
        left: idx * slideWidth,
        behavior: "smooth"
      });

      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === idx);
      });
    }

    // Dot click listener
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => goToSlide(i));
    });

    // Auto-update dots while scrolling manually
    wrapper.addEventListener("scroll", () => {
      const slideWidth = slides[0].offsetWidth + 20;
      const idx = Math.round(wrapper.scrollLeft / slideWidth);
      if (idx !== currentIndex) {
        currentIndex = idx;
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === idx);
        });
      }
    });

    // Show first slide initially
    goToSlide(0);
  }

  // Initialize sliders for Section 2 and Section 7
  initSlider(".section-2");
  initSlider(".section-7");
});
