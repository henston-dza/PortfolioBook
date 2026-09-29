import { gsap } from 'gsap';
import { initAnimations, initPreloader } from './animations.js';
import { initPortfolio } from './portfolio.js';
import { initMobileLayout } from './mobile.js';
import { initRoleTypewriter } from '../features/typewriter.js';
import { initContactForm } from '../features/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // Setup GSAP initial states
  gsap.set(['#portfolioLeftBookmarks .bookmark', '#portfolioRightBookmarks .bookmark'], { y: '1.25rem', opacity: 0 });

  initPreloader();
  initPortfolio();
  initMobileLayout();
  initAnimations();
  initRoleTypewriter();
  initContactForm();
  
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

