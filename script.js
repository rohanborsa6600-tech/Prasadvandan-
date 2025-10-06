async function loadChapters() {
  const container = document.getElementById("chapters");
  
  // Manually list folders (or fetch dynamically from server)
  const chapterFolders = ["chapter1", "chapter2"];

  for (const folder of chapterFolders) {
    const info = await fetch(`chapters/${folder}/info.json`).then(r => r.json());

    const card = document.createElement("div");
    card.className = "chapter-card";

    const slideshow = document.createElement("div");
    slideshow.className = "slideshow";

    info.images.forEach((imgSrc, i) => {
      const img = document.createElement("img");
      img.src = `chapters/${folder}/${imgSrc}`;
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

  // Auto slideshow
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
