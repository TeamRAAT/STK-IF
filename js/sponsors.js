// Sponsor logos on the Sponsors page and the About page.
// The list of sponsors lives in sponsors/sponsors-list.js (see sponsors/README.md).
// Each page has an element with id="sponsor-grid" inside a section with class "sponsors-block".

(function () {
    const SPONSOR_FOLDER = "sponsors/";
    const grid = document.getElementById("sponsor-grid");
    if (!grid) return;
    const section = grid.closest(".sponsors-block");

    const sponsors = (window.STK_SPONSORS || []).filter(function (s) { return s && s.name; });
    if (!sponsors.length) return;   // only the "Become a sponsor" invitation is shown

    sponsors.forEach(function (s, i) {
        const item = document.createElement(s.url ? "a" : "div");
        item.className = "sponsor";
        item.style.setProperty("--i", i);   // staggers the entrance animation
        if (s.url) {
            item.href = s.url;
            item.target = "_blank";
            item.rel = "noopener sponsored";
        }

        const tile = document.createElement("span");
        tile.className = "sponsor-logo";
        if (s.background) tile.style.background = s.background;
        if (s.logo) {
            const img = document.createElement("img");
            img.src = SPONSOR_FOLDER + s.logo;
            img.alt = s.name;
            img.loading = "lazy";
            img.onerror = function () { img.replaceWith(document.createTextNode(s.name)); };
            tile.appendChild(img);
        } else {
            tile.textContent = s.name;
        }
        item.appendChild(tile);

        const name = document.createElement("span");
        name.className = "sponsor-name";
        name.setAttribute("data-no-translate", "");   // company names stay as written
        name.textContent = s.name;
        item.appendChild(name);

        if (s.url) {
            const visit = document.createElement("span");
            visit.className = "sponsor-visit";
            visit.textContent = "Visit website";
            item.appendChild(visit);
        }
        grid.appendChild(item);
    });
    if (section) section.classList.add("has-sponsors");
})();
