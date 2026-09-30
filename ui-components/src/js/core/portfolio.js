import { turnPage } from './animations.js';


const PAGES = ['home', 'skills', 'experience', 'projects', 'contact'];
let currentPageIndex = 0;

export function initPortfolio() {
  const bookmarks = document.querySelectorAll('.bookmark');
  
  // Initial Load (Home)
  loadPage('home', false);

  bookmarks.forEach(bookmark => {
    bookmark.addEventListener('click', (e) => {
      const page = e.target.dataset.page || e.target.id.replace('nav-', '');
      if (!page) return;
      
      const targetIndex = PAGES.indexOf(page);
      if (targetIndex === currentPageIndex) return;

      const forward = targetIndex > currentPageIndex;
      currentPageIndex = targetIndex;

      // Update active bookmark styling
      document.querySelectorAll('.bookmark').forEach(b => b.classList.remove('active'));
      const activeBookmarks = document.querySelectorAll(`.bookmark[data-page="${page}"]`);
      activeBookmarks.forEach(b => b.classList.add('active'));

      loadPage(page, true, forward);
    });
  });
}

function loadPage(page, animate = false, forward = true) {

  const leftContent = document.getElementById('leftPageContainer');
  const rightContent = document.getElementById('rightPageContainer');

  const leftTemplate = document.getElementById(`${page}-left-template`);
  const rightTemplate = document.getElementById(`${page}-right-template`);

  let newLeftHTML = leftTemplate ? leftTemplate.innerHTML : '';
  let newRightHTML = rightTemplate ? rightTemplate.innerHTML : '';

  if (animate) {
    turnPage(newLeftHTML, newRightHTML, forward).then(() => {
      if (window.lucide) window.lucide.createIcons();
    });
  } else {
    leftContent.innerHTML = newLeftHTML;
    rightContent.innerHTML = newRightHTML;
    if (window.lucide) window.lucide.createIcons();
  }
}
