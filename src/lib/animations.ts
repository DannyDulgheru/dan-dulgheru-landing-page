
// Animation utility functions
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration:.6, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.04
    }
  }
};

export const slideLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const animateTextReveal = (node: HTMLSpanElement, delay = 0) => {
  node.style.display = 'inline-block';
  node.style.overflow = 'hidden';
  
  const textContent = node.textContent || '';
  node.textContent = '';
  
  Array.from(textContent).forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.transform = 'translateY(100%)';
    span.style.display = 'inline-block';
    span.style.transition = `opacity 0.3s ease, transform 0.6s ease`;
    span.style.transitionDelay = `${delay + i * 0.04}s`;
    
    setTimeout(() => {
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, 10);
    
    node.appendChild(span);
  });
};

// Intersection Observer helper for scroll animations
export const createScrollObserver = (
  elementSelector: string, 
  animationClass: string, 
  threshold = 0.3
) => {
  const elements = document.querySelectorAll(elementSelector);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    },
    { threshold }
  );
  
  elements.forEach((element) => {
    observer.observe(element);
  });
  
  return observer;
};
