// ================================================================
// EDIT YOUR PORTFOLIO HERE
// Add, remove, or reorder objects in this array. The Work section
// is generated automatically from this data.
// ================================================================

const projects = [
  {
    title: "[REPUBLIC TELUGU MOVIE]",
    category: "Movies",
    link: "https://youtu.be/YjftfqRHAF4?si=Qe7k9nvnctHc3JRO",
    platform: "Project Link",
    description: "",
    featured: true
  },
  {
    title: "[MAYASABHA TELUGU SERIES]",
    category: "Series",
    link: "https://www.youtube.com/watch?v=qa7S4EDX1wE",
    platform: "YouTube",
    description: "",
    featured: true
  },
  {
    title: "[AD FILM 01]",
    category: "Ad Films",
    link: "https://youtu.be/E2WDKfU5EmI?si=z856_YNHDAF_QyVm",
    platform: "YouTube",
    description: "",
    featured: false
  },
  {
    title: "[AD FILM 02]",
    category: "Ad Films",
    link: "https://youtu.be/LhIY5ST_XF8?si=Ep2ruxEYbXWWDdai",
    platform: "YouTube",
    description: "",
    featured: false
  },
  {
    title: "[AD FILM 03]",
    category: "Ad Films",
    link: "https://youtu.be/r0YO8Zn7M0A?si=rggGuc0WcBF8zejL",
    platform: "YouTube",
    description: "",
    featured: false
  },
  {
    title: "[AD FILM 04]",
    category: "Ad Films",
    link: "https://youtu.be/Q9gcrJX4o-o?si=XvXS0kdXmjrsB-Yx",
    platform: "YouTube",
    description: "",
    featured: false
  },
  {
    title: "[WALLPOSTER SHORT FILM]",
    category: "Short Films",
    link: "https://youtu.be/smGh15P167U?si=O08mZL2XPMf4ptWD",
    platform: "YouTube",
    description: "Project description placeholder.",
    featured: true
  },
  {
    title: "[CAMPAIGN VIDEO 01]",
    category: "Political Campaigns",
    thumbnail: "assets/political-campaign-01.jpeg",
    link: "https://www.instagram.com/reel/CzvZc3Zq_ii/?igshid=MzRlODBiNWFlZA==",
    platform: "Instagram",
    description: "",
    featured: false,
    vertical: true
  },
  {
    title: "[CAMPAIGN VIDEO 02]",
    category: "Political Campaigns",
    thumbnail: "assets/political-campaign-02.jpeg",
    link: "https://www.instagram.com/reel/CzvlNhpKBHP/?igshid=ODhhZWM5NmIwOQ==",
    platform: "Instagram",
    description: "",
    featured: false,
    vertical: true
  }
];

const categoryOrder = [
  "All",
  "Movies",
  "Series",
  "Ad Films",
  "Short Films",
  "Political Campaigns",
  "Shorts & Reels"
];

const filtersEl = document.getElementById("filters");
const gridEl = document.getElementById("project-grid");
const emptyEl = document.getElementById("empty-state");

let activeCategory = "All";

function availableCategories() {
  const existing = new Set(projects.map(project => project.category));
  // Only categories containing real projects are shown. Shorts & Reels will
  // automatically appear as soon as a project with that category is added.
  return categoryOrder.filter(category => category === "All" || existing.has(category));
}

function createFilters() {
  filtersEl.innerHTML = "";
  availableCategories().forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-btn${category === activeCategory ? " active" : ""}`;
    button.textContent = category;
    button.setAttribute("aria-pressed", category === activeCategory ? "true" : "false");
    button.addEventListener("click", () => {
      activeCategory = category;
      createFilters();
      renderProjects();
    });
    filtersEl.appendChild(button);
  });
}

function getFilteredProjects() {
  if (activeCategory === "All") return projects;
  return projects.filter(project => project.category === activeCategory);
}

function isPlaceholder(value = "") {
  return /^(YOUR_|YOUR |\[)/i.test(value.trim());
}

function externalAttrs(link) {
  const validExternal = link && !isPlaceholder(link) && /^https?:\/\//i.test(link);
  return validExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
}

function displayButtonText(project) {
  if (project.platform === "Instagram") return "View on Instagram";
  if (project.category === "Movies") return "View Project";
  if (project.category === "Short Films") return "Watch Film";
  return "Watch on YouTube";
}


function getProjectThumbnail(project) {
  // If a local thumbnail was provided, use it first.
  if (project.thumbnail && !isPlaceholder(project.thumbnail)) {
    return project.thumbnail;
  }

  if (!project.link || isPlaceholder(project.link)) {
    return "";
  }

  try {
    const url = new URL(project.link);

    // YouTube thumbnails
    if (
      project.platform === "YouTube" ||
      /(^|\.)youtube\.com$|(^|\.)youtu\.be$/i.test(url.hostname)
    ) {
      let videoId = "";

      if (url.hostname.toLowerCase() === "youtu.be") {
        videoId = url.pathname.split("/").filter(Boolean)[0] || "";
      } else if (url.pathname.startsWith("/watch")) {
        videoId = url.searchParams.get("v") || "";
      } else {
        const parts = url.pathname.split("/").filter(Boolean);

        if (
          parts.length >= 2 &&
          ["shorts", "embed", "live"].includes(parts[0])
        ) {
          videoId = parts[1] || "";
        }
      }

      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
  } catch (error) {
    console.warn(
      "Could not derive project thumbnail:",
      project.link,
      error
    );
  }

  return "";
}



// function getProjectThumbnail(project) {
//   if (!project.link || isPlaceholder(project.link)) {
//     return "";
//   }

//   try {
//     const url = new URL(project.link);

//     // YouTube: use the video's own public thumbnail.
//     if (project.platform === "YouTube" || /(^|\.)youtube\.com$|(^|\.)youtu\.be$/i.test(url.hostname)) {
//       let videoId = "";

//       if (url.hostname.toLowerCase() === "youtu.be") {
//         videoId = url.pathname.split("/").filter(Boolean)[0] || "";
//       } else if (url.pathname.startsWith("/watch")) {
//         videoId = url.searchParams.get("v") || "";
//       } else {
//         const parts = url.pathname.split("/").filter(Boolean);
//         const markerIndex = ["shorts", "embed", "live"].findIndex(marker => parts[0] === marker);
//         if (markerIndex === 0) videoId = parts[1] || "";
//       }

//       if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
//     }

//     // Instagram public reel/post media endpoint. This lets the page request
//     // the media thumbnail without storing a local JPG in the project.
//     if (project.platform === "Instagram" || /(^|\.)instagram\.com$/i.test(url.hostname)) {
//       const parts = url.pathname.split("/").filter(Boolean);
//       const shortCode = parts[1] || parts[0] || "";
//       if (shortCode) return `https://www.instagram.com/p/${shortCode}/media/?size=l`;
//     }
//   } catch (error) {
//     console.warn("Could not derive project thumbnail:", project.link, error);
//   }

//   return "";
// }

function setImageSource(image, project) {
  const thumbnail = getProjectThumbnail(project);

  if (!thumbnail) {
    image.classList.add("is-missing");
    image.alt = `${project.title} thumbnail placeholder`;
    return;
  }

  image.src = thumbnail;
  image.alt = `${project.title} thumbnail`;
  image.loading = "lazy";
  image.referrerPolicy = "no-referrer";

  image.addEventListener("error", () => {
    image.removeAttribute("src");
    image.classList.add("is-missing");
    image.alt = `${project.title} thumbnail unavailable`;
  }, { once: true });
}

function renderProjects() {
  const filtered = getFilteredProjects();
  gridEl.innerHTML = "";
  emptyEl.hidden = filtered.length !== 0;

  filtered.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = [
      "project-card",
      project.featured ? "featured" : "",
      project.vertical ? "vertical" : ""
    ].filter(Boolean).join(" ");
    article.style.animationDelay = `${Math.min(index * 70, 350)}ms`;

    const media = document.createElement("div");
    media.className = "card-media";

    const image = document.createElement("img");
    setImageSource(image, project);
    media.appendChild(image);

    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = `
      <div>
        <div class="card-title-overlay">${escapeHtml(project.title)}</div>
        <div class="card-platform">${escapeHtml(project.platform || "")}</div>
      </div>
    `;
    media.appendChild(overlay);

    const body = document.createElement("div");
    body.className = "card-body";
    const meta = project.category === "Political Campaigns"
      ? "Political Campaign · Short-form Video"
      : `${project.category} · Video Editing`;

    const linkIsUsable = project.link && !isPlaceholder(project.link);
    body.innerHTML = `
      <h3 class="card-title">${escapeHtml(project.title)}</h3>
      <div class="card-meta">${escapeHtml(meta)}</div>
      ${project.description ? `<p class="card-description">${escapeHtml(project.description)}</p>` : ""}
      <a class="card-link" href="${linkIsUsable ? escapeAttribute(project.link) : "#"}" ${externalAttrs(project.link)} ${linkIsUsable ? "" : "aria-disabled=\"true\""}>
        ${displayButtonText(project)} ↗
      </a>
    `;

    article.append(media, body);
    gridEl.appendChild(article);
  });

  // Prevent placeholder links from jumping the page.
  gridEl.querySelectorAll('[aria-disabled="true"]').forEach(link => {
    link.addEventListener("click", event => event.preventDefault());
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function setupHeader() {
  const header = document.getElementById("site-header");
  const update = () => header.classList.toggle("scrolled", window.scrollY > 30);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menuLinks = document.querySelectorAll(".mobile-menu a");

  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.getElementById("mobile-menu").setAttribute("aria-hidden", String(!open));
  };

  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  menuLinks.forEach(link => link.addEventListener("click", () => setOpen(false)));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
}

function setupYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

createFilters();
renderProjects();
setupHeader();
setupMobileMenu();
setupReveal();
setupYear();
