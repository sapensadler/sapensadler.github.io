document.addEventListener('DOMContentLoaded', function(){
  const container = document.getElementById('clubs-grid');
  const searchInput = document.getElementById('clubs-search');
  const fieldSelect = document.getElementById('clubs-field');
  const clearBtn = document.getElementById('clubs-clear');
  const countEl = document.getElementById('clubs-count');
  if(!container) return;

  let clubsData = [];

  fetch('/assets/data/clubs.json')
    .then(r=>r.json())
    .then(clubs=>{
      clubsData = clubs;
      renderClubs(clubsData);
      attachControls();
    })
    .catch(err=>{
      container.innerHTML = '<p>Unable to load clubs data.</p>';
      console.error(err);
    });

  function renderClubs(list){
    container.innerHTML = '';
    if(!list.length){
      container.innerHTML = '<p>No clubs match your search.</p>';
      countEl.textContent = '0 clubs';
      return;
    }

    list.forEach(club=>{
      const card = document.createElement('article');
      card.className = 'club-card';

      const header = document.createElement('header');
      header.className = 'club-card__header';
      header.innerHTML = `<h3>${escapeHtml(club.name)}</h3>`;
      card.appendChild(header);

      const body = document.createElement('div');
      body.className = 'club-card__body';

      const fields = [
        {k:'instructor', label:'Instructor'},
        {k:'email', label:'Email'},
        {k:'address', label:'Address/Location'},
        {k:'website', label:'Website'},
        {k:'map', label:'Map'}
      ];

      fields.forEach(f=>{
        const val = club[f.k] || '';
        if(!val) return;

        const p = document.createElement('p');
        p.className = 'club-field';
        if(f.k === 'email') {
          p.innerHTML = `<strong>${f.label}:</strong> <a href="mailto:${escapeHtml(val)}">${escapeHtml(val)}</a>`;
        } else if(f.k === 'website') {
          p.innerHTML = `<strong>${f.label}:</strong> <a href="${escapeHtml(val)}" target="_blank" rel="noopener">${escapeHtml(val)}</a>`;
        } else if(f.k === 'map') {
          p.innerHTML = `<strong>${f.label}:</strong> <a href="${escapeHtml(val)}" target="_blank" rel="noopener">Map</a>`;
        } else {
          p.innerHTML = `<strong>${f.label}:</strong> ${escapeHtml(val)}`;
        }
        body.appendChild(p);
      });

      if(!body.children.length){
        const p = document.createElement('p');
        p.className = 'club-field';
        p.innerHTML = `<strong>Instructor:</strong> ${escapeHtml(club.instructor || '')}`;
        body.appendChild(p);
      }

      card.appendChild(body);
      container.appendChild(card);
    });

    countEl.textContent = `${list.length} club${list.length===1?'':'s'}`;
  }

  function attachControls(){
    const debounced = debounce(filterAndRender, 250);
    if(searchInput) searchInput.addEventListener('input', debounced);
    if(fieldSelect) fieldSelect.addEventListener('change', filterAndRender);
    if(clearBtn) clearBtn.addEventListener('click', () => {
      if(searchInput) searchInput.value = '';
      if(fieldSelect) fieldSelect.value = 'all';
      renderClubs(clubsData);
    });
  }

  function filterAndRender(){
    const q = (searchInput && searchInput.value || '').trim().toLowerCase();
    const field = (fieldSelect && fieldSelect.value) || 'all';

    let results = clubsData.filter(club => {
      if(!q) return true;

      if(field === 'all'){
        return ['name','instructor','address','website'].some(k => (club[k]||'').toLowerCase().includes(q));
      }

      return (club[field]||'').toLowerCase().includes(q);
    });

    renderClubs(results);
  }

  function debounce(fn, ms){
    let t;
    return function(...args){
      clearTimeout(t);
      t = setTimeout(()=>fn.apply(this,args), ms);
    };
  }

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&"'<>]/g, function(s){
      return ({'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'})[s];
    });
  }
});
