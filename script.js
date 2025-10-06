// Dynamically load chapters
const chapters = ['chapter1', 'chapter2'];
const container = document.getElementById('chapters-container');

chapters.forEach(chapter => {
    loadChapter(chapter);
});

async function loadChapter(chapterName) {
    try {
        const response = await fetch(`chapters/${chapterName}/info.json`);
        if (!response.ok) throw new Error('Info not found');
        const info = await response.json();

        // Create chapter element
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter';
        chapterDiv.innerHTML = `
            <h2>${info.title}</h2>
            <p>${info.description}</p>
        `;

        // Create gallery
        const gallery = document.createElement('div');
        gallery.className = 'gallery';

        // Possible image extensions to try
        const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

        // Dynamically load photos (assumes sequential naming; stops on no more photos)
        let photoCount = 1;
        while (true) {
            let photoLoaded = false;
            for (const ext of extensions) {
                try {
                    const imgResponse = await fetch(`chapters/${chapterName}/photo${photoCount}.${ext}`);
                    if (imgResponse.ok) {
                        const img = document.createElement('img');
                        img.src = `chapters/${chapterName}/photo${photoCount}.${ext}`;
                        img.alt = `Photo ${photoCount} from ${info.title}`;
                        gallery.appendChild(img);
                        photoLoaded = true;
                        break; // Found a valid extension, move to next photo
                    }
                } catch (e) {
                    // Continue to next extension
                }
            }
            if (!photoLoaded) {
                break; // No more photos
            }
            photoCount++;
        }

        if (gallery.children.length === 0) {
            gallery.innerHTML = '<p>No photos available.</p>';
        }

        chapterDiv.appendChild(gallery);
        container.appendChild(chapterDiv);
    } catch (error) {
        console.error(`Error loading ${chapterName}:`, error);
        container.innerHTML += `<p>Error loading Chapter ${chapterName.slice(-1)}.</p>`;
    }
}

// Fallback: If fetch fails (e.g., file:// protocol), show static message
if (typeof fetch === 'undefined') {
    container.innerHTML = '<p>Please serve the site via a local server (e.g., Python: python -m http.server) for dynamic loading.</p>';
}
