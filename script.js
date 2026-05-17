/* ====== SoleStyle — Interactions ====== */

// Loader
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('hidden'), 700);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  scrollTopBtn.classList.toggle('show', window.scrollY > 600);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open'); navLinks.classList.remove('open');
}));

// Theme toggle
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('solestyle-theme');
if (savedTheme === 'light') document.documentElement.setAttribute('data-theme','light');
themeBtn.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('solestyle-theme','dark'); themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>'; }
  else { document.documentElement.setAttribute('data-theme','light'); localStorage.setItem('solestyle-theme','light'); themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>'; }
});
if (savedTheme === 'light') themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

// Hero slider
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('dots');
let currentSlide = 0;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(b);
});
const dots = dotsWrap.querySelectorAll('button');
function goToSlide(i){
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = i;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5500);

// Arrivals horizontal scroll buttons
const track = document.getElementById('arrivalsTrack');
document.getElementById('trackLeft').addEventListener('click', () => track.scrollBy({left:-360, behavior:'smooth'}));
document.getElementById('trackRight').addEventListener('click', () => track.scrollBy({left:360, behavior:'smooth'}));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('visible'); revealObserver.unobserve(e.target); }});
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated counters
const counterEls = document.querySelectorAll('.counter h3');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; const target = +el.dataset.target; const dur = 1800; const start = performance.now();
    function tick(now){
      const p = Math.min((now - start)/dur, 1);
      const val = Math.floor(target * (1 - Math.pow(1-p, 3)));
      el.textContent = val.toLocaleString() + (target >= 1000 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObs.unobserve(el);
  });
}, {threshold:0.5});
counterEls.forEach(el => counterObs.observe(el));

// Form handlers
document.getElementById('newsForm').addEventListener('submit', (e) => {
  e.preventDefault(); alert('Welcome to the inner circle.'); e.target.reset();
});
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault(); alert('Message received. We\'ll be in touch.'); e.target.reset();
});

// Particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
function initParticles(){
  particles = [];
  const n = Math.min(80, Math.floor(window.innerWidth/20));
  for (let i=0;i<n;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*1.4 + .3,
      vx: (Math.random()-.5)*.3,
      vy: (Math.random()-.5)*.3,
      a: Math.random()*.5 + .2
    });
  }
}
initParticles();
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x<0||p.x>canvas.width) p.vx*=-1;
    if (p.y<0||p.y>canvas.height) p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `rgba(200,200,204,${p.a})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();

// FAB
document.getElementById('fab').addEventListener('click', () => {
  document.getElementById('collection').scrollIntoView({behavior:'smooth'});
});