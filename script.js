const chapterFolders = ["chapter1", "chapter2"];

async function loadChapters() {
  const container = document.getElementById("chapters");
  const nav = document.getElementById("chapter-nav");

  for (const folder of chapterFolders) {
    const info = await fetch(`chapters/${folder}/info.json`).then(r => r.json());

    const navLink = document.createElement("a");
    navLink.href = `#${folder}`;
    navLink.textContent = info.title;
    navLink.title = info.subtitle;
    navLink.className = "chapter-nav-link";
    nav.appendChild(navLink);

    const card = document.createElement("div");
    card.className = "chapter-card";
    card.id = folder;

    const slideshow = document.createElement("div");
    slideshow.className = "slideshow";

    info.images.forEach((imgFile, i) => {
      const img = document.createElement("img");
      img.src = `chapters/${folder}/${imgFile}`;
      if (i === 0) img.classList.add("active");
      slideshow.appendChild(img);
    });

    const infoDiv = document.createElement("div");
    infoDiv.className = "chapter-info";
    infoDiv.innerHTML = `<h2>${info.title}</h2><p>${info.subtitle}</p>`;

    card.appendChild(slideshow);
    card.appendChild(infoDiv);
    container.appendChild(card);
  }

  setInterval(() => {
    document.querySelectorAll(".slideshow").forEach(slideshow => {
      const imgs = slideshow.querySelectorAll("img");
      const active = slideshow.querySelector("img.active");
      let next = active.nextElementSibling || imgs[0];
      active.classList.remove("active");
      next.classList.add("active");
    });
  }, 3000);
}

loadChapters();
