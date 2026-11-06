---
layout: default
title: About
permalink: /about/
art_hero: ""
---

<section class="card card-wide" markdown="1">

## About Our League

Denver Lipstick Lovers is a queer, recreational soccer league that centers trans, nonbinary, and queer women players that is run by and for the queer community. All skill levels are welcome, including those new to the sport. This is a non-competitive league, and other clubs like Altitude FC offer more competitive play. We exist to have fun and build queer community by playing soccer.

</section>

{% include art.html src=page.art_hero alt="About art" class="art-wide" hint="art_hero in about.md" %}

<h2 class="section-title">Community Agreements</h2>

<div class="grid">
  {% for a in site.data.agreements %}
    <article class="card agreement c-{{ forloop.index0 | modulo: 6 }}">
    <span class="card-num">{{ forloop.index }}</span>
    {% if a.title %}<h3>{{ a.title }}</h3>{% endif %}
    <p>{{ a.text }}</p>
  </article>
  {% endfor %}
</div>