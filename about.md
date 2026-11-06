---
layout: default
title: About
permalink: /about/
art_hero: ""
---

<section class="card card-wide c-orange" markdown="1">

## Who We Are

Placeholder description. Write a few sentences about the league here: who it's for,
the vibe, how it started. This is plain markdown, so **bold**, *italics*, and
[links](https://example.com) all work.

</section>

{% include art.html src=page.art_hero alt="About art" class="art-wide" hint="art_hero in about.md" %}

<h2 class="section-title">Community Agreements</h2>

<div class="grid">
  {% for a in site.data.agreements %}
  <article class="card c-{{ forloop.index0 | modulo: 6 }}">
    <span class="card-num">{{ forloop.index }}</span>
    <h3>{{ a.title }}</h3>
    <p>{{ a.text }}</p>
  </article>
  {% endfor %}
</div>
