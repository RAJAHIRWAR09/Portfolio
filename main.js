import './style.css';
import gsap from 'gsap';

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

  // Hero Animations
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.reveal-text', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.2
  });

  tl.from('.floating-shape', {
    scale: 0,
    opacity: 0,
    duration: 1.5,
    ease: 'elastic.out(1, 0.3)'
  }, '-=1');

  // Smooth Scroll / Generic Reveal on Scroll
  const sections = document.querySelectorAll('section');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    // Initial state for scroll reveal
    if (section.id !== 'hero') {
      gsap.set(section, { y: 50, opacity: 0 });
      observer.observe(section);
    }
  });

  // Cursor Light Effect
  const cursor = document.getElementById('cursor-glow');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2, // Faster response
        ease: 'power2.out'
      });
    });

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
      link.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
    });
  }


  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

