/**
 * Typewriter text animation for Developer Role Title
 */

const ROLES = [
  'Creative Full Stack AI Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Software Engineer',
  'Full Stack Developer',
  'AI & ML Engineer'
];

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let timeoutId = null;

export function initRoleTypewriter() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  typeNextCharacter();
}

function typeNextCharacter() {
  const elements = document.querySelectorAll('.role-typewriter-text');

  const currentFullRole = ROLES[currentRoleIndex];

  if (isDeleting) {
    currentCharIndex--;
  } else {
    currentCharIndex++;
  }

  const displayedText = currentFullRole.substring(0, currentCharIndex);

  if (elements && elements.length > 0) {
    elements.forEach(el => {
      el.textContent = displayedText;
    });
  }

  let typeSpeed = isDeleting ? 45 : 80;

  if (!isDeleting && currentCharIndex === currentFullRole.length) {
    // Pause at full word before deleting
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    // Finished deleting, move to next role
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % ROLES.length;
    typeSpeed = 350;
  }

  timeoutId = setTimeout(typeNextCharacter, typeSpeed);
}
