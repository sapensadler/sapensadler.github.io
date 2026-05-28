document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  if(!btn || !nav) return;

  function setExpanded(val){
    const valStr = String(val);
    btn.setAttribute('aria-expanded', valStr);
    if(valStr === 'true') {
      nav.classList.add('open');
    } else {
      nav.classList.remove('open');
    }
  }

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    setExpanded(!expanded);
  });

  // Close menu when clicking a link (mobile)
  nav.addEventListener('click', function(e){
    if(e.target.tagName === 'A') setExpanded(false);
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') setExpanded(false);
  });

  // Click outside to close
  document.addEventListener('click', function(e){
    if(!nav.classList.contains('open')) return;
    if(e.target === btn || btn.contains(e.target)) return;
    if(nav.contains(e.target)) return;
    setExpanded(false);
  });
});
