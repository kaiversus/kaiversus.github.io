---
layout: default
title: Projects
permalink: /projects/
---
{%- assign sections = 'career|MAIN|career_operations|Professional tools & research artifacts;personal|SIDE|personal_lab|Experiments, utilities & fun stuff' | split: ';' -%}
<section class="wrap page-head">
  <div class="page-path">~/home/kai/projects <span>[DIR]</span></div>
  <h1>Projects<em>.</em></h1>
  <p>Github repositories · coding tools · personal malware samples.</p>
</section>

<section class="wrap">
  {% include filterbar.html %}
  {%- for s in sections -%}
    {%- assign f = s | split: '|' -%}
    {%- assign items = site.projects | where: 'category', f[0] | sort: 'date' | reverse -%}
    {%- if items.size > 0 -%}
    <div class="group">
      <div class="group-head"><span class="sec-tag">[{{ f[1] }}]</span> {{ f[2] }} <span>{{ f[3] }}</span></div>
      <ol class="cards">
        {%- for p in items -%}
        <li class="row card" data-kind="project" data-q="{{ p.title | downcase | escape }} {{ p.description | downcase | escape }} {{ f[0] }}">
          <a class="card-thumb" href="{{ p.url | relative_url }}" tabindex="-1" aria-hidden="true">
            {%- if p.image -%}<img src="{{ p.image | relative_url }}" alt="" loading="lazy">{%- else -%}<span>[ no preview ]</span>{%- endif -%}
          </a>
          <div class="card-body">
            <div class="card-meta"><span class="row-idx">0x{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>{{ p.date | date: '%Y-%m-%d' }}</div>
            <a class="row-link-plain" href="{{ p.url | relative_url }}"><span class="row-title">{{ p.title }}</span></a>
            {%- if p.description -%}<p class="card-desc">{{ p.description }}</p>{%- endif -%}
            <div class="card-links">
              <a href="{{ p.url | relative_url }}">$ logs</a>
              {%- if p.demo_link -%}<a href="{{ p.demo_link }}" target="_blank" rel="noopener">demo ↗</a>{%- endif -%}
              {%- if p.github_link -%}<a href="{{ p.github_link }}" target="_blank" rel="noopener">github ↗</a>{%- endif -%}
            </div>
          </div>
        </li>
        {%- endfor -%}
      </ol>
    </div>
    {%- endif -%}
  {%- endfor -%}
  {%- assign others = site.projects | where_exp: 'p', "p.category != 'career'" | where_exp: 'p', "p.category != 'personal'" -%}
  {%- if others.size > 0 -%}
    <div class="group">
      <div class="group-head">khác <span>{{ others.size }}</span></div>
      <ol class="rows">{%- for p in others -%}{% include post-row.html p=p hide_kind=true idx=forloop.index %}{%- endfor -%}</ol>
    </div>
  {%- endif -%}
  <p class="rows-empty" id="rows-empty" hidden>grep: không có kết quả. <button type="button" class="linklike" data-clear>[esc] xoá lọc</button></p>
  <div style="height:80px"></div>
</section>
