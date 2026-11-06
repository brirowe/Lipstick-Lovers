---
layout: default
title: Contact
permalink: /contact/
art_hero: ""
---

<h2 class="section-title">Interested in Playing?</h2>

<form class="card card-wide c-orange contact-form" action="{{ site.contact_form_action }}" method="POST">
  <h3>Contact</h3>

  <label>Name
    <input type="text" name="name" required>
  </label>

  <label>Pronouns
    <input type="text" name="pronouns">
  </label>

  <label>Email
    <input type="email" name="email" required>
  </label>

  <label>When would you like to join?
    <select name="join_when">
      <option>As a sub this season</option>
      <option>Next season</option>
      <option>Not sure yet</option>
    </select>
  </label>

  <label>Anything else? <span class="muted">(optional)</span>
    <textarea name="message" rows="3"></textarea>
  </label>

  {% if site.contact_form_action != "" %}
    <button class="btn" type="submit">Send</button>
  {% else %}
    <p class="muted">Form not connected yet. Set <code>contact_form_action</code> in _config.yml.</p>
  {% endif %}
</form>


{% include art.html src=page.art_hero alt="Contact art" class="art-wide" hint="art_hero in contact.md" %}
