---
layout: default
title: Home
permalink: /
# Art slots: put image paths here, e.g. /assets/img/art/home-hero.png
art_hero: ""
---

<h2 class="tagline">{{ site.tagline }}</h2>

{% include art.html src=page.art_hero alt="Lipstick Lovers art" class="art-wide" hint="art_hero in index.md" %}

<div class="tiles">
  <a class="tile c-red" href="{{ '/about/' | relative_url }}"><span>About Us</span></a>
  <a class="tile c-orange" href="{{ '/schedule/' | relative_url }}"><span>Schedule</span></a>
  <a class="tile c-green" href="{{ '/resources/' | relative_url }}"><span>Resources</span></a>
  <a class="tile c-purple" href="{{ '/contact/' | relative_url }}"><span>Contact</span></a>
</div>
