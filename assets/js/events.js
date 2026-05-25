document.addEventListener('DOMContentLoaded', function(){
  const root = document.getElementById('events-root');
  if(!root) return;

  fetch('/assets/data/events.json')
    .then(r=>r.json())
    .then(events=>{
      // Normalize and sort by start date
      const parsed = events.map(e => ({
        ...e,
        startDate: e.start ? new Date(e.start) : null,
        endDate: e.end ? new Date(e.end) : (e.start ? new Date(e.start) : null)
      })).filter(e => e.startDate);

      parsed.sort((a,b)=>a.startDate - b.startDate);

      const today = new Date();
      // Normalize today's time to 00:00 for comparison
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const upcoming = parsed.filter(e => e.endDate >= todayStart);
      const past = parsed.filter(e => e.endDate < todayStart).sort((a,b)=>b.startDate - a.startDate);

      root.innerHTML = '';

      if(upcoming.length){
        const h = document.createElement('h2'); h.textContent = 'Upcoming events';
        root.appendChild(h);
        const grid = document.createElement('div'); grid.className = 'events-grid';
        upcoming.forEach(ev=> grid.appendChild(renderEventCard(ev)));
        root.appendChild(grid);
      }

      if(past.length){
        const h2 = document.createElement('h2'); h2.textContent = 'Past events';
        root.appendChild(h2);
        const grid2 = document.createElement('div'); grid2.className = 'events-grid';
        past.forEach(ev=> grid2.appendChild(renderEventCard(ev)));
        root.appendChild(grid2);
      }

      if(!upcoming.length && !past.length){
        root.innerHTML = '<p>No events available.</p>';
      }
    })
    .catch(err=>{
      root.innerHTML = '<p>Unable to load events data.</p>';
      console.error(err);
    });

  function renderEventCard(ev){
    const card = document.createElement('article');
    card.className = 'event-card';

    const header = document.createElement('header');
    header.className = 'event-card__header';
    header.innerHTML = `<h3>${escapeHtml(ev.name)}</h3>`;
    card.appendChild(header);

    const body = document.createElement('div');
    body.className = 'event-card__body';

    const when = document.createElement('p');
    when.className = 'event-field';
    when.innerHTML = `<strong>Date:</strong> ${formatDate(ev.start)}${ev.end && ev.end !== ev.start ? ' — ' + formatDate(ev.end) : ''}`;
    body.appendChild(when);

    if(ev.location){
      const loc = document.createElement('p');
      loc.className = 'event-field';
      loc.innerHTML = `<strong>Location:</strong> ${escapeHtml(ev.location)}`;
      body.appendChild(loc);
    }

    if(ev.map){
      const map = document.createElement('p');
      map.className = 'event-field';
      map.innerHTML = `<strong>Map:</strong> <a href="${escapeHtml(ev.map)}" target="_blank" rel="noopener">Map</a>`;
      body.appendChild(map);
    }

    const actions = document.createElement('div');
    actions.className = 'event-actions';
    if(ev.details){
      const isInternal = ev.details.startsWith('/') ;
      const a = document.createElement('a');
      a.className = 'button';
      a.href = ev.details;
      a.target = isInternal ? '_self' : '_blank';
      a.rel = isInternal ? '' : 'noopener';
      a.textContent = 'Details';
      actions.appendChild(a);
    }

    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  function escapeHtml(str){
    if(!str) return '';
    return String(str).replace(/[&"'<>]/g, function(s){
      return ({'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'})[s];
    });
  }

  function formatDate(d){
    if(!d) return '';
    try{
      const dt = new Date(d);
      return dt.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
    }catch(e){return d}
  }
});
