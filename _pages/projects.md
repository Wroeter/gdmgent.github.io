---
permalink: /projects/
layout: page
title: Projects
---

<div class="projects">
	<ul class="row projects">
		{% assign projects = site.projects | sort: 'listing-priority' %}
		{% for project in projects %}
		<li class="medium-6 large-4 columns">
			<article class="card">
				<picture class="card__picture">
					<img class="card__image" src="{{ project.thumbnail-url }}" />
				</picture>
				<section class="card__content">
					<h4><a href="{{ project.url }}">{{ project.title }}</a></h4>
					{{ project.content }}
					<section class="card__authors">
						<ul>
							{% for student in project.students %}
								<li>{{ student }}</li>
							{% endfor %}
						</ul>
					</section>
					<section class="card__category">
						{% assign olod = site.olods | where: "object-id", project.olod-id  | first %}
						{{ olod.name }}
					</section>
				</section>
				<section class="card__footer">
					<a href="{{ project.url }}">Read more</a>
					<a class="right">Share</a>
				</section>
			</article>
		</li>
		{% endfor %}
	</ul>
</div>