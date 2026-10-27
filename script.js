const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#site-search');
const toast = document.querySelector('#search-toast');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = searchInput.value.trim().toLocaleLowerCase('zh-CN');
  if (!query) {
    searchInput.focus();
    announce('输入片名，开始寻找好故事。');
    return;
  }
  const cards = [...document.querySelectorAll('[data-title]')];
  const match = cards.find((card) => card.dataset.title.toLocaleLowerCase('zh-CN').includes(query));
  if (match) {
    match.scrollIntoView({ behavior: 'smooth', block: 'center' });
    match.focus({ preventScroll: true });
    announce(`为你找到：${match.dataset.title}`);
  } else {
    announce(`暂未找到“${searchInput.value.trim()}”，试试「星夜归途」或「春风有信」。`);
  }
});

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? '打开导航' : '关闭导航');
  mainNav.classList.toggle('open', !expanded);
});

mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航');
  }
});
