---
layout: default
title: Schedule
permalink: /schedule/
art_hero: ""
---

{% assign s = site.data.season %}

{% if site.registration.open %}
<div class="register-wrap">
  <a class="btn btn-register" href="{{ site.registration.url }}" target="_blank" rel="noopener">{{ site.registration.button_text }}</a>
</div>
{% endif %}

<section class="card card-wide c-orange">
  <h2>Current Season</h2>
  <p class="big">{{ s.current.name }}</p>
  <p><strong>Dates:</strong> {{ s.current.dates }}</p>
  <p>{{ s.current.details }}</p>
</section>

<section class="card card-wide c-blue">
  <h2>Upcoming Season</h2>
  <p class="big">{{ s.upcoming.name }}</p>
  <dl class="dates">
    <div><dt>Season starts</dt><dd>{{ s.upcoming.start }}</dd></div>
    <div><dt>Registration opens</dt><dd>{{ s.upcoming.registration_opens }}</dd></div>
    <div><dt>Registration closes</dt><dd>{{ s.upcoming.registration_closes }}</dd></div>
  </dl>
</section>

{% include art.html src=page.art_hero alt="Schedule art" class="art-wide" hint="art_hero in schedule.md" %}

<p class="subs"><span class="subs-text">{{ s.subs_text }}</span> <a class="btn btn-small" href="{{ '/contact/' | relative_url }}">Contact us</a></p>