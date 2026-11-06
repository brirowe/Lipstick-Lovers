---
layout: default
title: Resources
permalink: /resources/
art_hero: ""
---

<h2 class="section-title">Community Resources</h2>

{% include art.html src=page.art_hero alt="Resources art" class="art-wide" %}

<div class="grid resource-grid">
  {% for r in site.data.resources %}
  <article class="card c-{{ forloop.index0 | modulo: 6 }}">
    <h3>{{ r.title }}</h3>
    {% if r.blurb and r.blurb != "" %}<p class="muted">{{ r.blurb }}</p>{% endif %}

    {% for i in r.items %}
    <details class="resource">
      <summary>{{ i.name }}</summary>
      <div class="resource-body">
        {% if i.details %}
        <ul class="resource-details">
          {% for d in i.details %}<li>{{ d }}</li>{% endfor %}
        </ul>
        {% endif %}
        {% if i.links %}
        <ul class="resource-links">
          {% for l in i.links %}<li><a href="{{ l.url }}" target="_blank" rel="noopener">{{ l.name }}</a></li>{% endfor %}
        </ul>
        {% endif %}
      </div>
    </details>
    {% endfor %}
  </article>
  {% endfor %}
</div>

<p class="note">If you're in crisis right now, call or text <strong>988</strong>, or call <strong>911</strong> for an emergency.</p>