---
layout: layouts/base.njk
title: Clubs
---

# Club Directory

Below is the JKA WF England club list.

<div class="club-controls">
  <input id="clubs-search" type="search" placeholder="Search clubs (name, instructor, address...)" aria-label="Search clubs">
  <select id="clubs-field" aria-label="Search field">
    <option value="all">All fields</option>
    <option value="name">Name</option>
    <option value="instructor">Instructor</option>
    <option value="address">Address/Location</option>
  </select>
  <button id="clubs-clear" type="button">Clear</button>
</div>

<p id="clubs-count" class="muted" aria-live="polite"></p>

<div id="clubs-grid" class="clubs-grid" aria-live="polite">
  <!-- Club cards are generated client-side -->
</div>

