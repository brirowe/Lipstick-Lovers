---
layout: default
title: Voss Tribute
permalink: /voss/
# Optional, e.g. "1995 - 2026". Leave "" to hide.
dates: ""
# Main photo at the top
hero_photo: ""
# Photo gallery. Add or remove entries. Leave src "" to show a placeholder.
photos:
  - src: ""
    caption: "Caption"
  - src: ""
    caption: "Caption"
  - src: ""
    caption: "Caption"
  - src: ""
    caption: "Caption"
---

<h2 class="section-title">In Memory of Voss</h2>
{% if page.dates != "" %}<p class="center muted tribute-dates">{{ page.dates }}</p>{% endif %}

<figure class="tribute-photo tribute-hero">
  {% if page.hero_photo != "" %}
    <img src="{{ page.hero_photo | relative_url }}" alt="Voss">
  {% else %}
    <div class="photo-placeholder" aria-hidden="true"></div>
  {% endif %}
</figure>

<section class="card card-wide" markdown="1">

## About Voss

Placeholder. A few sentences about who he was, what he loved, and what he brought to the league.

</section>

<section class="card card-wide" markdown="1">

## His Joy and Passions

Placeholder. Things he loved doing and how he shared that joy with the people around him.

</section>

<div class="tribute-gallery">
  {% for p in page.photos %}
  <figure class="tribute-photo">
    {% if p.src != "" %}
      <img src="{{ p.src | relative_url }}" alt="{{ p.caption }}" loading="lazy">
    {% else %}
      <div class="photo-placeholder" aria-hidden="true"></div>
    {% endif %}
    {% if p.caption != "" %}<figcaption>{{ p.caption }}</figcaption>{% endif %}
  </figure>
  {% endfor %}
</div>

<section class="card card-wide" markdown="1">

## What We'll Remember

Placeholder. Memories and messages from teammates.

</section>

<p class="center tribute-closing">Placeholder closing line.</p>