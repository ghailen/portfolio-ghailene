document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Typing effect
  const typeTargets = document.querySelectorAll('.typing');
  typeTargets.forEach(el => {
    const text = el.textContent;
    el.textContent = "";
    let index = 0;
    const speed = 50;
    const type = () => {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };
    type();
  });
});