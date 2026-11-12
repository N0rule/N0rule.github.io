import { t } from "./i18n.js";
import { renderIcon } from "./icons.js";
import { escapeHtml } from "./utils.js";
import { reducedMotion } from "./environment.js";
import {
  projects,
  skills,
  socialLinks,
  categoryLabels,
  categoryIcons,
} from "./data.js";
import {
  resetCardTracking,
  revealCards,
  cancelCardReveal,
} from "./cards.js";

const projectGrid = document.querySelector("#project-grid");

function projectCardHtml(project) {
  const status = project.status || (project.featured ? "In development" : "");
  const tags = project.tags
    .map((tag) => `<span>${escapeHtml(tag)}</span>`)
    .join("");
  const links = project.links.length
    ? project.links
        .map(
          ([label, url]) => `
        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${label}: ${t(project.title)}`)}" data-project-title="${escapeHtml(project.title)}" data-link-label="${escapeHtml(label)}">
          ${renderIcon(label === "GitHub" ? "GitHub" : "web")}<span data-i18n="${escapeHtml(label)}">${escapeHtml(label)}</span>
        </a>`,
        )
        .join("")
    : '<span class="project-note" data-i18n="Personal hardware build">Personal hardware build</span>';
  return `
    <article class="project-card" data-category="${escapeHtml(project.category)}">
      <div class="project-image">
        <img src="./images/${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" data-i18n-alt="${escapeHtml(project.alt)}" loading="lazy" width="600" height="400">
      </div>
      <div class="project-body">
        <div class="project-meta"><span class="project-category">${renderIcon(categoryIcons[project.category])}<span data-i18n="${escapeHtml(categoryLabels[project.category])}">${escapeHtml(categoryLabels[project.category])}</span></span>${status ? `<span class="project-status" data-i18n="${escapeHtml(status)}">${escapeHtml(status)}</span>` : ""}</div>
        <h3><span data-i18n="${escapeHtml(project.title)}">${escapeHtml(project.title)}</span></h3>
        <p><span data-i18n="${escapeHtml(project.description)}">${escapeHtml(project.description)}</span></p>
        <div class="project-tags">${tags}</div>
        <div class="project-links">${links}</div>
      </div>
    </article>`;
}

function renderSkills() {
  document.querySelector("#skills-grid").innerHTML = skills
    .map(
      (skill) => `<article class="skill-card">
        <div class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${skill.icon}/${skill.icon}-original.svg" alt="" loading="lazy" width="44" height="44"><span class="skill-icon-fallback" hidden>${renderIcon("code")}</span></div>
        <div class="skill-top">
          <h3>${escapeHtml(skill.name)}</h3>
          <span class="skill-level"><span data-i18n="${escapeHtml(skill.level)}">${escapeHtml(skill.level)}</span></span>
        </div>
        <p><span data-i18n="${escapeHtml(skill.description)}">${escapeHtml(skill.description)}</span></p>
      </article>`,
    )
    .join("");
}

function renderSocialLinks() {
  document.querySelector("#social-links").innerHTML = socialLinks
    .map(
      (link) => `<a class="social-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
        <span class="social-icon">${renderIcon(link.name)}</span>
        <div><strong>${escapeHtml(link.name)}</strong><small><span data-i18n="${escapeHtml(link.handle)}">${escapeHtml(link.handle)}</span></small></div>
      </a>`,
    )
    .join("");
}

// Show the icon fallback if a skill logo fails to load from the CDN.
function initSkillIconFallbacks() {
  document.querySelectorAll(".skill-icon img").forEach((img) => {
    img.addEventListener("error", () => {
      img.hidden = true;
      img.nextElementSibling.hidden = false;
    });
  });
}

function initFilters() {
  document.querySelectorAll(".filter").forEach((button) =>
    button.addEventListener("click", () => {
      resetCardTracking();
      if (button.getAttribute("aria-pressed") === "true") return;
      for (const other of document.querySelectorAll(".filter")) {
        const isSelected = other === button;
        other.classList.toggle("active", isSelected);
        other.setAttribute("aria-pressed", String(isSelected));
      }
      for (const card of projectGrid.children) {
        cancelCardReveal(card);
        card.hidden =
          button.dataset.filter !== "all" &&
          card.dataset.category !== button.dataset.filter;
      }
      const visible = [...projectGrid.children].filter((card) => !card.hidden);
      projectGrid.classList.toggle(
        "is-filtered",
        button.dataset.filter !== "all",
      );
      document.querySelector("#filter-status").textContent = t(
        "Showing {n} projects",
        { n: visible.length },
      );
      revealCards(visible);
    }),
  );
}

// Re-translate the generated link labels on every language change.
function syncProjectLinkLabels() {
  document.querySelectorAll("[data-project-title]").forEach((link) => {
    link.setAttribute(
      "aria-label",
      `${t(link.dataset.linkLabel)}: ${t(link.dataset.projectTitle)}`,
    );
  });
}

export function initContent() {
  projectGrid.innerHTML = projects.map(projectCardHtml).join("");
  renderSkills();
  renderSocialLinks();
  document.querySelector("#year").textContent = new Date().getFullYear();
  initSkillIconFallbacks();
  initFilters();
  window.addEventListener("portfolio:languagechange", syncProjectLinkLabels);

  // One restrained greeting after the type is ready; never replay on
  // theme or language changes.
  document.fonts.ready.then(() => {
    if (reducedMotion.matches) return;
    document
      .querySelector(".hello-wave")
      .animate(
        [
          { rotate: "0deg" },
          { rotate: "14deg", offset: 0.22 },
          { rotate: "-9deg", offset: 0.42 },
          { rotate: "7deg", offset: 0.62 },
          { rotate: "-3deg", offset: 0.8 },
          { rotate: "0deg" },
        ],
        { duration: 1100, delay: 200, easing: "ease-in-out", iterations: 1 },
      );
  });
}
