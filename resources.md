---
layout: default
title: Resources
permalink: /resources/
art_hero: ""
---

<h2 class="section-title">Community Resources</h2>

{% include art.html src=page.art_hero alt="Resources art" class="art-wide" hint="art_hero in resources.md" %}

<div class="grid">
  {% for r in site.data.resources %}
  <article class="card c-{{ forloop.index0 | modulo: 6 }}">
    <h3>{{ r.title }}</h3>
    {% if r.blurb != "" %}<p class="muted">{{ r.blurb }}</p>{% endif %}
    <ul class="links">
      {% for l in r.links %}
      <li>
        {% if l.url != "" %}<a href="{{ l.url }}" target="_blank" rel="noopener">{{ l.name }}</a>{% else %}<span>{{ l.name }}</span>{% endif %}
        {% if l.note != "" %}<small>{{ l.note }}</small>{% endif %}
      </li>
      {% endfor %}
    </ul>
  </article>
  {% endfor %}
</div>

<p class="note">If you're in crisis right now, call or text <strong>988</strong>, or call <strong>911</strong> for an emergency.</p>
