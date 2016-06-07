---
permalink: /projects/
layout: page
title: Projects
---

<div class="case-studies-body">
	<ul class="listing">
		{% assign projects = site.projects | sort: 'listing-priority' %}
		{% for project in projects %}
		<li>
			<h2><a href="{{ project.url }}">{{ project.title }}</a></h2>
			{{ project.content }}
		</li>
		{% endfor %}
	</ul>
</div>