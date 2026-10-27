const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#site-search');
const toast = document.querySelector('#search-toast');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
let toastTimer;

const films = {
  star: { title: '星夜归途', tagline: '有些路，要走到夜深才看得见星光。', rating: '9.1', year: '2026', genre: '剧情 · 公路', place: '中国 · 118 分钟', director: '周予安', cast: '陈屿、林知夏、许明川', type: '剧情 · 公路 · 家庭', runtime: '118 分钟', summary: '多年未归的摄影师林野，在收到一卷旧胶片后，踏上穿越西北的夜行旅程。沿途遇见的陌生人，让他重新看见父亲留下的沉默、故乡未说完的话，以及自己一直逃避的那场告别。', story: '一卷没有冲洗的胶片，把林野带回了十年未曾踏足的家乡。他沿着旧日地图向西行驶，每到一处便按下快门，也听见一段关于父亲的回忆。旅程没有标准答案，只有一盏盏亮起的夜灯，提醒他有些告别并不意味着失去。' },
  time: { title: '时光放映室', tagline: '每一段记忆，都有自己的放映时间。', rating: '8.8', year: '2025', genre: '悬疑 · 剧情', place: '中国 · 106 分钟', director: '沈知白', cast: '林屿、周念、贺闻舟', type: '悬疑 · 剧情 · 文艺', runtime: '106 分钟', summary: '一间即将拆除的老影院里，放映员发现了几卷从未登记的旧胶片。每一段影像都指向一位曾经的观众，也拼出一桩被时间藏起的往事。', story: '年轻的放映员回到故乡整理老影院，在一场场意外的夜间放映中，遇见了不同年代的观众与他们的秘密。胶片上的细节逐渐连成线索，而那段尘封故事的答案，正藏在最后一场电影里。' },
  tide: { title: '潮汐之后', tagline: '潮水退去时，我们终于听见彼此。', rating: '8.6', year: '2026', genre: '爱情 · 剧情', place: '中国 · 112 分钟', director: '顾南音', cast: '许知遥、江望、陈海宁', type: '爱情 · 剧情 · 海岸', runtime: '112 分钟', summary: '在海边小镇重逢的两个人，带着未完成的约定一起寻找一座旧灯塔。潮起潮落之间，他们终于学会说出当年没有说完的话。', story: '返乡修复灯塔的建筑师遇见了经营旧书店的儿时伙伴。两人沿着海岸寻找一封迟到多年的信，经过风暴与静潮，也慢慢厘清当年分别的缘由。' },
  letter: { title: '远方来信', tagline: '写给远方的信，也会寄回自己心里。', rating: '8.9', year: '2025', genre: '青春 · 成长', place: '中国 · 103 分钟', director: '方晓禾', cast: '林知夏、陆川、宋雨乔', type: '青春 · 成长 · 剧情', runtime: '103 分钟', summary: '毕业前夕，几位好友决定完成一份十年前写下的愿望清单。一封封寄出的信，让他们重新认识彼此，也找到各自前行的方向。', story: '高三最后一个夏天，旧课桌里的一叠信重新回到同学们手中。他们循着年少时写下的愿望清单出发，在告别校园之前，认真回答关于友情、选择与未来的问题。' },
  last: { title: '最后一公里', tagline: '抵达终点之前，每一步都算数。', rating: '8.7', year: '2026', genre: '动作 · 冒险', place: '中国 · 121 分钟', director: '程野', cast: '韩峥、罗依、赵远川', type: '动作 · 冒险 · 公路', runtime: '121 分钟', summary: '一名离队多年的山地救援队员接到紧急求助，必须在风雪封山前穿过无人区，完成一场关乎生命的接力。', story: '暴雪切断了山谷与外界的联系，救援队员在最后一段山路上遇到新的险情。时间与天气不断逼近，他与当地向导并肩前行，在看似无法通过的绝境中寻找一线生机。' }
};

const detailPage = document.querySelector('#film-detail');
if (detailPage) {
  const film = films[new URLSearchParams(window.location.search).get('film')] || films.star;
  detailPage.dataset.film = new URLSearchParams(window.location.search).get('film') || 'star';
  document.querySelector('#film-title').textContent = film.title;
  document.querySelector('#crumb-title').textContent = film.title;
  document.querySelector('#film-tagline').textContent = film.tagline;
  document.querySelector('#film-rating').textContent = film.rating;
  document.querySelector('#film-summary').textContent = film.summary;
  document.querySelector('#film-director').textContent = film.director;
  document.querySelector('#film-cast').textContent = film.cast;
  document.querySelector('#film-genre').textContent = film.type;
  document.querySelector('#film-year').textContent = film.year;
  document.querySelector('#film-runtime').textContent = film.runtime;
  document.querySelector('#film-story').textContent = film.story;
  document.querySelector('.detail-facts').innerHTML = `<span class="rating"><b>${film.rating}</b><small>拾光评分</small></span><span>${film.year}</span><span>${film.genre}</span><span>${film.place}</span>`;
  document.querySelector('.detail-poster').className = `detail-poster p${{ star: 1, time: 2, tide: 3, letter: 4, last: 5 }[detailPage.dataset.film] || 1}`;
  document.querySelector('.detail-poster').setAttribute('aria-label', `${film.title}影片海报`);
  document.title = `${film.title} — 电影详情 | 拾光影集`;
  document.querySelector('meta[name="description"]').content = `${film.title}电影详情：剧情、演职员、影片信息与编辑推荐。${film.summary}`;
  document.querySelector('meta[property="og:title"]').content = `${film.title} — 拾光影集`;
  document.querySelector('meta[property="og:description"]').content = film.tagline;
}

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
