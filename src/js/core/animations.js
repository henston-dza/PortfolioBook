import { gsap } from 'gsap';

let bookOpened = false;
const componentCache = new Map();

// Global animation lock — prevents overlapping page-flip animations
let isAnimating = false;
export function getIsAnimating() { return isAnimating; }

// No viewer modules needed for portfolio
const viewerModules = {};

// Reference to the current flip-page GSAP tween so we can kill it if needed
let currentFlipTween = null;

export function playPageEntranceAnimations(containers, baseDelay = 0) {
  if (!containers || containers.length === 0) return;

  const containerEls = Array.isArray(containers) ? containers : [containers];

  containerEls.forEach(container => {
    if (!container) return;

    // Helper to run from animations
    const animateElements = (selector, vars) => {
      const elements = typeof container === 'string'
        ? document.querySelectorAll(`${container} ${selector}`)
        : container.querySelectorAll(selector);
      if (elements && elements.length) {
        gsap.from(elements, vars);
      }
    };

    animateElements('.section-title', { y: -20, opacity: 0, duration: 1.0, ease: 'power2.out', delay: baseDelay + 0.2 });
    animateElements('.reveal-text, .about-narrative-container p, .note-box-text, .char-list li', { y: 15, opacity: 0, duration: 1.0, stagger: 0.1, ease: 'power2.out', delay: baseDelay + 0.3 });
    animateElements('.polaroid-frame, .intro-badge', { x: -30, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out', delay: baseDelay + 0.2 });

    animateElements('.skills-sticky', {
      y: 40,
      opacity: 0,
      rotation: () => Math.random() * 10 - 5,
      duration: 1.2,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      delay: baseDelay + 0.4
    });

    animateElements('.portfolio-project-card, .experience-card, .workflow-card, .characteristics-container', { y: 40, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power2.out', delay: baseDelay + 0.3 });
    animateElements('.timeline-node', { x: 30, opacity: 0, duration: 1.0, stagger: 0.2, ease: 'power2.out', delay: baseDelay + 1.6 });
    // Node markers (pink dots) - CSS has opacity:0, so use gsap.to
    const nodeMarkers = typeof container === 'string'
      ? document.querySelectorAll(`${container} .node-marker`)
      : container.querySelectorAll('.node-marker');
    if (nodeMarkers && nodeMarkers.length) {
      gsap.fromTo(nodeMarkers,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)', delay: baseDelay + 1.6 }
      );
    }

    // Node content - CSS has opacity:0, so use gsap.fromTo
    const nodeContents = typeof container === 'string'
      ? document.querySelectorAll(`${container} .node-content`)
      : container.querySelectorAll('.node-content');
    if (nodeContents && nodeContents.length) {
      gsap.fromTo(nodeContents,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: baseDelay + 1.8 }
      );
    }

    // Timeline line draws from top to bottom first, then nodes appear
    const timelineLines = typeof container === 'string'
      ? document.querySelectorAll(`${container} .timeline-line`)
      : container.querySelectorAll('.timeline-line');
    if (timelineLines && timelineLines.length) {
      gsap.fromTo(timelineLines,
        { scaleY: 0, transformOrigin: 'top center' },
        { scaleY: 1, duration: 1.2, ease: 'power2.inOut', delay: baseDelay + 0.4 }
      );
    }
    animateElements('.form-group, .submit-contact-btn, .social-link-badge, .home-actions > *', { y: 20, opacity: 0, duration: 1.0, stagger: 0.15, ease: 'power2.out', delay: baseDelay + 0.3 });
  });
}

let bookEntranceTl = null;

export function playBookEntranceAnimation() {
  const book = document.querySelector('.book');
  const coverContent = document.querySelector('.cover-content');
  const btnStart = document.getElementById('btnStartStory');
  const appContainer = document.getElementById('app');

  if (!book) return;

  if (appContainer) appContainer.style.opacity = '1';

  if (bookEntranceTl) bookEntranceTl.kill();

  bookEntranceTl = gsap.timeline();

  bookEntranceTl
    .to(book, {
      y: '0vh',
      x: '-25%',
      rotateX: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power3.out"
    })
    .to(coverContent, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.6")
    .to(btnStart, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      onComplete: () => {
        if (btnStart) gsap.set(btnStart, { clearProps: "transform" });
      }
    }, "-=0.2");
}

export function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.querySelector('.loader-bar');
  const appContainer = document.getElementById('app');
  const book = document.querySelector('.book');
  const coverContent = document.querySelector('.cover-content');
  const btnStart = document.getElementById('btnStartStory');

  // Set initial hidden position for book entering from bottom
  if (book) {
    gsap.set(book, { y: '100vh', x: '-25%', rotateX: 18, opacity: 0 });
  }
  if (coverContent) {
    gsap.set(coverContent, { opacity: 0, y: 40, scale: 0.92 });
  }
  if (btnStart) {
    gsap.set(btnStart, { opacity: 0, y: 25, scale: 0.85 });
  }

  if (!preloader || !loaderBar) {
    playBookEntranceAnimation();
    return;
  }

  const tl = gsap.timeline();
  tl.to(loaderBar, {
    width: '100%',
    duration: 2.5,
    ease: "power2.inOut"
  })
    .to('.pencil-sketch-icon', {
      x: '100%',
      duration: 2.5,
      ease: "power2.inOut"
    }, 0)
    .to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        preloader.style.display = 'none';
        playBookEntranceAnimation();
      }
    });
}

export function initAnimations() {
  const cover = document.querySelector('.cover');
  const book = document.querySelector('.book');
  const btnStart = document.getElementById('btnStartStory');

  const openBook = () => {
    if (bookOpened || isAnimating) return;
    bookOpened = true;
    isAnimating = true;

    if (bookEntranceTl) {
      bookEntranceTl.kill();
      bookEntranceTl = null;
    }
    if (book) gsap.set(book, { y: '0vh', x: '-25%', rotateX: 0, opacity: 1 });
    if (document.querySelector('.cover-content')) gsap.set('.cover-content', { opacity: 1, y: 0, scale: 1 });
    if (btnStart) gsap.set(btnStart, { opacity: 1, y: 0, scale: 1, clearProps: 'transform' });

    playPageEntranceAnimations([document.getElementById('leftPageContainer'), document.getElementById('rightPageContainer')], 1.5);

    const tl = gsap.timeline({
      onComplete: () => { isAnimating = false; }
    });

    tl.to(cover, {
      rotateY: -180,
      duration: 1.5,
      ease: "power3.inOut"
    }, 0)
      .to('.base-left-page', {
        rotateY: 0,
        duration: 1.5,
        ease: "power3.inOut"
      }, 0)
      .to(book, {
        x: "0%",
        duration: 1.5,
        ease: "power3.inOut"
      }, 0)
      .to(['#portfolioLeftBookmarks .bookmark', '#portfolioRightBookmarks .bookmark'], {
        y: '0rem',
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(1.5)",
        clearProps: "transform"
      }, 1.0);
  };

  if (btnStart) btnStart.addEventListener('click', openBook);
  else cover.addEventListener('click', openBook);


  const successPopup = document.getElementById('successPopup');
  const successCloseBtn = document.getElementById('successCloseBtn');
  if (successCloseBtn && successPopup) {
    successCloseBtn.addEventListener('click', () => {
      successPopup.classList.remove('show');
    });
  }
}

// Stop and remove all playing media (videos/iframes) inside a container
function stopAllMedia(container) {
  container.querySelectorAll('video').forEach(v => {
    v.pause();
    v.removeAttribute('src');
    v.load(); // release the media resource
  });
  container.querySelectorAll('iframe').forEach(f => {
    f.removeAttribute('src');
  });
}

export function turnPage(newLeftHTML, newRightHTML, forward = true, isLeftCover = false, stayFlipped = false) {
  return new Promise(resolve => {
    // Kill any in-progress flip animation to prevent overlap
    if (currentFlipTween) {
      currentFlipTween.progress(1); // Jump to end to finalize DOM state
      currentFlipTween = null;
    }

    isAnimating = true;

    const leftContainer = document.getElementById('leftPageContainer');
    const rightContainer = document.getElementById('rightPageContainer');
    const flipPage = document.querySelector('.flip-page');
    const flipFront = document.getElementById('flipFrontContainer');
    const flipBack = document.getElementById('flipBackContainer');
    const baseLeftPage = document.querySelector('.base-left-page');
    const flipBackFace = document.querySelector('.flip-page .back');
    const wasAlreadyFlipped = flipPage.style.display !== 'none';

    flipPage.style.display = 'block';
    flipPage.style.pointerEvents = 'none';

    if (forward) {
      const rightScrollTop = rightContainer.scrollTop;
      flipFront.innerHTML = '';
      while (rightContainer.firstChild) flipFront.appendChild(rightContainer.firstChild);
      flipFront.scrollTop = rightScrollTop;

      flipBack.innerHTML = newLeftHTML;
      rightContainer.innerHTML = newRightHTML;
      if (window.lucide) window.lucide.createIcons();

      // Animate the elements on the newly revealed pages, delaying until flip is done
      playPageEntranceAnimations([flipBack, rightContainer], 1.5);


      // The back face will show the new left page
      if (isLeftCover) flipBackFace.classList.add('is-cover-back');
      else flipBackFace.classList.remove('is-cover-back');

      currentFlipTween = gsap.fromTo(flipPage,
        { rotateY: 0 },
        {
          rotateY: -180,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            currentFlipTween = null;
            if (isLeftCover) baseLeftPage.classList.add('is-cover-back');
            else baseLeftPage.classList.remove('is-cover-back');

            if (!stayFlipped) {
              leftContainer.innerHTML = '';
              while (flipBack.firstChild) leftContainer.appendChild(flipBack.firstChild);
              flipPage.style.display = 'none';
              flipFront.innerHTML = '';
            } else {
              // Stop all media in the old grid content before clearing
              stopAllMedia(flipFront);
              stopAllMedia(leftContainer);
              flipFront.innerHTML = '';
              leftContainer.innerHTML = '';
              flipPage.style.pointerEvents = 'auto';
            }
            isAnimating = false;
            resolve();
          }
        }
      );
    } else {
      // The back face will show the CURRENT left page
      const currentIsCover = baseLeftPage.classList.contains('is-cover-back');
      if (currentIsCover) flipBackFace.classList.add('is-cover-back');
      else flipBackFace.classList.remove('is-cover-back');

      if (wasAlreadyFlipped) {
        // flipBack already contains the component preview! No need to move anything.
      } else {
        const leftScrollTop = leftContainer.scrollTop;
        flipBack.innerHTML = '';
        while (leftContainer.firstChild) flipBack.appendChild(leftContainer.firstChild);
        flipBack.scrollTop = leftScrollTop;
      }

      flipFront.innerHTML = newRightHTML;

      // We are updating the left container to the NEW left page immediately
      if (isLeftCover) baseLeftPage.classList.add('is-cover-back');
      else baseLeftPage.classList.remove('is-cover-back');

      leftContainer.innerHTML = newLeftHTML;
      if (window.lucide) window.lucide.createIcons();

      // Animate the elements on the newly revealed pages, delaying until flip is done
      playPageEntranceAnimations([leftContainer, flipFront], 1.5);


      currentFlipTween = gsap.fromTo(flipPage,
        { rotateY: -180 },
        {
          rotateY: 0,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            currentFlipTween = null;
            if (!stayFlipped) {
              rightContainer.innerHTML = '';
              while (flipFront.firstChild) rightContainer.appendChild(flipFront.firstChild);
              flipPage.style.display = 'none';
              flipBack.innerHTML = '';
            }
            isAnimating = false;
            resolve();
          }
        }
      );
    }
  });
}

export async function flipToComponent(path) {
  if (isAnimating) return; // Block if animation in progress
  try {
    let html;
    if (componentCache.has(path)) {
      html = componentCache.get(path);
    } else {
      const res = await fetch(path + 'index.html');
      html = await res.text();
      componentCache.set(path, html);
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const previewSection = doc.querySelector('.preview-section');
    const codeSection = doc.querySelector('.code-section');

    let leftHTML = previewSection ? previewSection.outerHTML : '';
    let rightHTML = codeSection ? codeSection.outerHTML : '';

    // Adjust iframe sources
    if (previewSection) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = leftHTML;
      const iframe = tempDiv.querySelector('iframe');
      if (iframe && iframe.getAttribute('src').startsWith('./')) {
        iframe.src = path + iframe.getAttribute('src').replace('./', '');
        leftHTML = tempDiv.innerHTML;
      }
    }

    gsap.to(['#gridBookmarks .bookmark', '#leftBookmarks .bookmark'], {
      y: '1.25rem',
      opacity: 0,
      duration: 0.3,
      stagger: 0.02
    });

    gsap.to('.sticky-notes-container', {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3
    });

    gsap.to('#gridBookmarks .bookmark', {
      duration: 0.3,
      onComplete: () => {
        document.getElementById('gridBookmarks').style.display = 'none';
        document.getElementById('leftBookmarks').style.display = 'none';
        document.getElementById('componentBookmarks').style.display = 'flex';
        gsap.fromTo('#componentBookmarks .bookmark',
          { y: '1.25rem', opacity: 0 },
          { y: '0rem', opacity: 1, duration: 0.5, ease: "back.out(1.5)", clearProps: "transform" }
        );
      }
    });

    const turnPromise = turnPage(leftHTML, rightHTML, true, false, true);

    // Bind iframe scroll AFTER it is in DOM
    const iframe = document.querySelector('iframe.preview-iframe') || document.querySelector('.base-left-page iframe');
    if (iframe) {
      iframe.onload = () => {
        try {
          if (iframe.src && (iframe.src.includes('scroll-transitions') || iframe.src.includes('page-transitions'))) {
            return; // Allow native scrolling inside the iframe for these categories
          }
          iframe.contentDocument.documentElement.style.overflow = 'hidden';
          iframe.contentDocument.body.style.overflow = 'hidden';
          const scrollContainer = document.getElementById('leftPageContainer');

          iframe.contentWindow.addEventListener('wheel', (e) => {
            e.preventDefault();
            // Handle different scroll modes (pixels vs lines)
            const multiplier = e.deltaMode === 1 ? 16 : 1;
            scrollContainer.scrollBy({ top: e.deltaY * multiplier, behavior: 'auto' });
          }, { passive: false });

          // Forward touch events for mobile scrolling
          let lastTouchY = 0;
          iframe.contentWindow.addEventListener('touchstart', (e) => {
            lastTouchY = e.touches[0].clientY;
          }, { passive: true });

          iframe.contentWindow.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            const deltaY = lastTouchY - currentY;
            lastTouchY = currentY;
            scrollContainer.scrollBy({ top: deltaY, behavior: 'auto' });
          }, { passive: true });

        } catch (err) {
          console.warn("Could not bind iframe scroll:", err);
        }
      };
    }

    try {
      // Build the glob key from the component path
      const componentsIndex = path.indexOf('components/');
      const relativePath = componentsIndex !== -1
        ? path.substring(componentsIndex + 'components/'.length).replace(/\/$/, '')
        : path.split('/').filter(Boolean).pop();

      // Update GitHub Button URL for Book View
      const gitBtn = document.getElementById('gitRepoBtn');
      if (gitBtn && relativePath) {
        gitBtn.href = `https://github.com/ITomPoland/ui-components/blob/master/components/${relativePath}/README.md`;
      }

      const globKey = `../../components/${relativePath}/viewer.js`;
      if (viewerModules[globKey]) {
        const mod = await viewerModules[globKey]();
        if (mod && mod.init) {
          mod.init();
        }
      }
    } catch (err) {
      console.warn("No viewer.js found or failed to load:", err);
    }

    await turnPromise;

  } catch (e) {
    console.error("Failed to load component:", e);
  }
}

export function triggerSubmitSuccess() {
  // Pokaż popup
  const successPopup = document.getElementById('successPopup');
  if (successPopup) {
    successPopup.classList.add('show');
  }
}
