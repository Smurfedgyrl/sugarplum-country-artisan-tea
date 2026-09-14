const catalog = window.TEA_CATALOG;
const teas = catalog.teas;
const seriesList = catalog.series;
const grid = document.querySelector("#tea-grid");
const search = document.querySelector("#search");
const collectionSearch = document.querySelector("#collection-search");
const collectionSearchResults = document.querySelector("#collection-search-results");
const siteSearchPanel = document.querySelector("#site-search-panel");
const siteSearch = document.querySelector("#site-search");
const siteSearchResults = document.querySelector("#site-search-results");
const availability = document.querySelector("#availability");
const sortOrder = document.querySelector("#sort-order");
const seriesSelect = document.querySelector("#series-select");
const seriesMenu = document.querySelector("#series-menu");
const collectionHome = document.querySelector("#collection-home");
const collectionSeriesGrid = document.querySelector("#collection-series-grid");
const catalogSection = document.querySelector("#catalog");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty");
const dialog = document.querySelector("#tea-dialog");
const detail = document.querySelector("#tea-detail");
const notice = document.querySelector("#notice");
const comparisonToggle = dialog.querySelector(".toggle-comparison");
const title = document.querySelector("#series-title");
const seriesCopy = document.querySelector("#series-copy");
const breadcrumbSeries = document.querySelector("#breadcrumb-series");
const showingSeries = document.querySelector("#showing-series");

const seriesDescriptions = {
  "Black Tea": "Rich, full-bodied teas ranging from classic and malty to fruit-filled, floral, and dessert-inspired.",
  "Green Tea": "Fresh, graceful teas ranging from softly floral and fruity to toasted, minty, and dessert-inspired.",
  "Oolong Tea": "Layered, aromatic teas balancing floral lift, smooth body, gentle roast, and lingering sweetness.",
  "White Tea": "Delicate, elegant teas with soft floral, fruit, honeyed, and naturally refreshing notes.",
  "Rooibos & Honeybush": "Naturally caffeine-free South African infusions with smooth, cozy, fruity, and dessert-like character.",
  "Herbal Tea": "Colorful caffeine-free botanical blends filled with fruits, flowers, herbs, spice, and comforting flavor.",
  "Chai": "Warmly spiced blends with aromatic depth, cozy sweetness, and satisfying character served hot or iced.",
  "Earl Grey": "Distinctive bergamot teas ranging from timeless classics to creamy, floral, and imaginative interpretations.",
  "Matcha": "Vibrant Japanese-style green tea selections with smooth energy, concentrated flavor, and versatile preparation.",
  "Pu-Erh Tea": "Earthy, deeply rounded teas with smooth body, aged character, and richly layered flavor.",
  "Darjeeling": "Elegant high-grown teas celebrated for their bright aroma, refined body, and distinctive muscatel character.",
  "Zodiac Collection": "A whimsical celestial collection pairing each zodiac sign with its own expressive tea blend.",
  "Decaf Tea": "Comforting decaffeinated favorites created for full flavor with significantly less caffeine.",
  "Wellness": "Purposeful botanical blends selected for comforting rituals, balanced flavor, and everyday well-being."
};

const themeNames = {
  "Black Tea":"black","Green Tea":"green","Oolong Tea":"oolong","White Tea":"white",
  "Rooibos & Honeybush":"rooibos","Herbal Tea":"herbal","Chai":"chai","Earl Grey":"earl",
  "Matcha":"matcha","Pu-Erh Tea":"puerh","Darjeeling":"darjeeling","Zodiac Collection":"zodiac",
  "Decaf Tea":"decaf","Wellness":"wellness"
};

const seriesArtwork = {
  "Black Tea":"black.webp","Green Tea":"green.webp","Oolong Tea":"oolong.webp","White Tea":"white.webp",
  "Rooibos & Honeybush":"rooibos.webp","Herbal Tea":"herbal.webp","Chai":"chai.webp","Earl Grey":"earl.webp",
  "Matcha":"matcha.webp","Pu-Erh Tea":"puerh.webp","Darjeeling":"darjeeling.webp","Zodiac Collection":"zodiac.webp",
  "Decaf Tea":"decaf.webp","Wellness":"wellness.webp"
};

const seriesCardArtwork = {
  "Black Tea":"victorian-tea-postcard-bg.webp", "Green Tea":"green-tea-postcard-bg.webp",
  "Oolong Tea":"oolong-tea-postcard-bg.webp", "White Tea":"white-tea-postcard-bg.webp",
  "Rooibos & Honeybush":"rooibos-tea-postcard-bg.webp", "Herbal Tea":"herbal-tea-postcard-bg.webp",
  "Chai":"chai-tea-postcard-bg.webp", "Earl Grey":"earl-grey-postcard-bg.webp",
  "Matcha":"matcha-postcard-bg.webp", "Pu-Erh Tea":"puerh-postcard-bg.webp",
  "Darjeeling":"darjeeling-postcard-bg.webp", "Zodiac Collection":"zodiac-postcard-bg.webp",
  "Decaf Tea":"decaf-postcard-bg.webp", "Wellness":"wellness-postcard-bg.webp"
};

const knownImages = {
  "almond":"black-almond-v2.webp",
  "apricot":"black-apricot.jpg",
  "april-in-paris":"black-april-in-paris.jpg",
  "assam-harmony":"black-assam-harmony.jpg",
  "assam-melody":"black-assam-melody-filler.webp",
  "black-cherry":"black-black-cherry-filler.webp",
  "black-forest-cake":"black-black-forest-cake-filler.webp",
  "black-jasmine-song":"black-black-jasmine-song-filler.webp",
  "blackberry":"black-blackberry-filler.webp",
  "blueberry":"black-blueberry-filler.webp",
  "brigadoon-breakfast":"black-brigadoon-breakfast-filler.webp",
  "butterscotch":"black-butterscotch-filler.webp",
  "campfire-s-mores":"black-campfire-smores-filler.webp",
  "candy-apple":"black-candy-apple-filler.webp",
  "candy-cane":"black-candy-cane-filler.webp",
  "caramel":"black-caramel-filler.webp",
  "caramel-cr-me-br-l-e":"black-caramel-creme-brulee-filler.webp",
  "ceylon-sonata":"black-ceylon-sonata-filler.webp",
  "chocolate":"black-chocolate-filler.webp",
  "chocolate-chip":"black-chocolate-chip-filler.webp",
  "chocolate-truffle":"black-chocolate-truffle-filler.webp",
  "christmas":"black-christmas-filler.webp",
  "cinnamon":"black-cinnamon-filler.webp",
  "coconut":"black-coconut-filler.webp",
  "cranberry":"black-cranberry-filler.webp",
  "cream":"black-cream-filler.webp",
  "currant":"black-currant-filler.webp",
  "english-breakfast":"black-english-breakfast-filler.webp",
  "forest-berries":"black-forest-berries-filler.webp",
  "ginger-peach":"black-ginger-peach-filler.webp",
  "gingerbread":"black-gingerbread-filler.webp",
  "grapefruit":"black-grapefruit-filler.webp",
  "half-caff-brekkie":"black-half-caff-brekkie-filler.webp",
  "hazelnut":"black-hazelnut-filler.webp",
  "hibiscus":"black-hibiscus-filler.webp",
  "irish-breakfast":"black-irish-breakfast-filler.webp",
  "kentucky-bourbon":"black-kentucky-bourbon-filler.webp",
  "kringles-krush":"black-kringles-krush-filler.webp",
  "lapsang-souchong":"black-lapsang-souchong-filler.webp",
  "lemon-soleil":"black-lemon-soleil-filler.webp",
  "mango":"black-mango-filler.webp",
  "orange":"black-orange-filler.webp",
  "orange-spice":"black-orange-spice-filler.webp",
  "passionfruit":"black-passionfruit-filler.webp",
  "peach":"black-peach-filler.webp",
  "pumpkin-spice":"black-pumpkin-spice-filler.webp",
  "raspberry":"black-raspberry-filler.webp",
  "scottish-breakfast":"black-scottish-breakfast-filler.webp",
  "strawberry":"black-strawberry-filler.webp",
  "summer-rose":"black-summer-rose-filler.webp",
  "sweet-cinnamon-spice":"black-sweet-cinnamon-spice-filler.webp",
  "sweet-potato-pie":"black-sweet-potato-pie-filler.webp",
  "thai-tea":"black-thai-tea-filler.webp",
  "tiger-eye":"black-tiger-eye-filler.webp",
  "valentines":"black-valentines-filler.webp",
  "vanilla":"black-vanilla-filler.webp",
  "chestnut":"black-chestnut-filler.webp",
  "autumn-mist-green":"green-autumn-mist-filler.webp",
  "blueberry-peach-cobbler-green":"green-blueberry-peach-cobbler-filler.webp",
  "calypso-green":"green-calypso-filler.webp",
  "cherry-green":"green-cherry-filler.webp",
  "citrus-mint-green":"green-citrus-mint-filler.webp",
  "cocomint-green":"green-cocomint-filler.webp",
  "cranberry-nut-muffin-green":"green-cranberry-nut-muffin-filler.webp",
  "ginseng-green":"green-ginseng-filler.webp",
  "lemon-meringue-green":"green-lemon-meringue-filler.webp",
  "lychee-rose-green":"green-lychee-rose-filler.webp",
  "melonberry-green":"green-melonberry-filler.webp",
  "pomegranate-green":"green-pomegranate-filler.webp",
  "vanilla-green":"green-vanilla-filler.webp",
  "apricot-green":"apricot-green.jpg",
  "citron-green":"citron-green.jpg",
  "mango-green":"mango-green.jpg",
  "raspberry-green":"raspberry-green.jpg",
  "almond-oolong":"oolong-almond-filler.webp",
  "blackberry-sage-oolong":"oolong-blackberry-sage-filler.webp",
  "cherry-marzipan-oolong":"oolong-cherry-marzipan-filler.webp",
  "grapefruit-oolong":"oolong-grapefruit-filler.webp",
  "maple-creme-oolong":"oolong-maple-creme-filler.webp",
  "peach-oolong":"oolong-peach-filler.webp",
  "vanilla-oolong":"oolong-vanilla-filler.webp",
  "buddhas-dream":"white-buddhas-dream-filler.webp",
  "fuzzy-navel":"white-fuzzy-navel-filler.webp",
  "white-blueberry":"white-blueberry-filler.webp",
  "white-eternal-spring":"white-eternal-spring-filler.webp",
  "white-grapefruit":"white-grapefruit-filler.webp",
  "white-peach":"white-peach-filler.webp",
  "white-pear":"white-pear-filler.webp",
  "white-peony":"white-peony-filler.webp",
  "white-strawberry":"white-strawberry-filler.webp",
  "white-strawberry-basil":"white-strawberry-basil-filler.webp",
  "white-symphony":"white-symphony-filler.webp",
  "white-tangerine":"white-tangerine-filler.webp",
  "white-toasted-coconut":"white-toasted-coconut-filler.webp",
  "white-tropics":"white-tropics-filler.webp",
  "almond-cardamom-cake":"rooibos-almond-cardamom-cake-filler.webp",
  "cranberry-cream":"rooibos-cranberry-cream-filler.webp",
  "green-rooibos":"rooibos-green-rooibos-filler.webp",
  "green-rooibos-blueberry":"rooibos-green-rooibos-blueberry-filler.webp",
  "green-rooibos-bonita":"rooibos-green-rooibos-bonita-filler.webp",
  "green-rooibos-citron":"rooibos-green-rooibos-citron-filler.webp",
  "green-rooibos-key-west":"rooibos-green-rooibos-key-west-filler.webp",
  "green-rooibos-paradiso":"rooibos-green-rooibos-paradiso-filler.webp",
  "honeybush":"rooibos-honeybush-filler.webp",
  "honeybush-apricot":"rooibos-honeybush-apricot-filler.webp",
  "honeybush-banana-nut":"rooibos-honeybush-banana-nut-filler.webp",
  "honeybush-blueberry-pancake":"rooibos-honeybush-blueberry-pancake-filler.webp",
  "honeybush-chocolate":"rooibos-honeybush-chocolate-filler.webp",
  "honeybush-hazelnut":"rooibos-honeybush-hazelnut-filler.webp",
  "honeybush-mango":"rooibos-honeybush-mango-filler.webp",
  "honeybush-vanilla":"rooibos-honeybush-vanilla-filler.webp",
  "honeybush-wild-berry":"rooibos-honeybush-wild-berry-filler.webp",
  "krampus-tea":"rooibos-krampus-tea-filler.webp",
  "rooibos":"rooibos-rooibos-filler.webp",
  "rooibos-almond":"rooibos-rooibos-almond-filler.webp",
  "rooibos-caramel":"rooibos-rooibos-caramel-filler.webp",
  "rooibos-cinnamon-apple":"rooibos-rooibos-cinnamon-apple-filler.webp",
  "rooibos-cinnamon-roll":"rooibos-rooibos-cinnamon-roll-filler.webp",
  "rooibos-cocomint":"rooibos-rooibos-cocomint-filler.webp",
  "rooibos-lemon-cloud":"rooibos-rooibos-lemon-cloud-filler.webp",
  "rooibos-nutcracker":"rooibos-rooibos-nutcracker-filler.webp",
  "rooibos-orange":"rooibos-rooibos-orange-filler.webp",
  "rooibos-peach":"rooibos-rooibos-peach-filler.webp",
  "rooibos-pecan-turtle":"rooibos-rooibos-pecan-turtle-filler.webp",
  "rooibos-vanilla":"rooibos-rooibos-vanilla-filler.webp",
  "white-chocolate-peppermint":"rooibos-white-chocolate-peppermint-filler.webp",
  "always-nuts":"herbal-always-nuts-filler.webp",
  "berry-blast":"herbal-berry-blast-filler.webp",
  "berry-blues":"herbal-berry-blues-filler.webp",
  "berry-creme-compote":"herbal-berry-creme-compote-filler.webp",
  "blood-orange":"herbal-blood-orange-filler.webp",
  "bonfire":"herbal-bonfire-filler.webp",
  "cha-cha":"herbal-cha-cha-filler.webp",
  "chamomile":"herbal-chamomile-filler.webp",
  "chicoriccino":"herbal-chicoriccino-filler.webp",
  "citrus-mate":"herbal-citrus-mate-filler.webp",
  "dewy-cherry":"herbal-dewy-cherry-filler.webp",
  "double-ginger":"herbal-double-ginger-filler.webp",
  "dragon-fruit-dream":"herbal-dragon-fruit-dream-filler.webp",
  "foxtrot":"herbal-foxtrot-filler.webp",
  "fruit-medley":"herbal-fruit-medley-filler.webp",
  "greek-mountain-tea":"herbal-greek-mountain-tea-filler.webp",
  "key-lime-herbal":"herbal-key-lime-herbal-filler.webp",
  "kona-pineapple":"herbal-kona-pineapple-filler.webp",
  "lavender-lemon":"herbal-lavender-lemon-filler.webp",
  "lemongrass":"herbal-lemongrass-filler.webp",
  "lemongrass-ginger":"herbal-lemongrass-ginger-filler.webp",
  "mango-melange":"herbal-mango-melange-filler.webp",
  "mocha-nut-mate":"herbal-mocha-nut-mate-filler.webp",
  "passionfruit-tango":"herbal-passionfruit-tango-filler.webp",
  "peach-bellini":"herbal-peach-bellini-filler.webp",
  "peach-serenity":"herbal-peach-serenity-filler.webp",
  "peppermint":"herbal-peppermint-filler.webp",
  "pina-colada":"herbal-pina-colada-filler.webp",
  "pomegranate-grove":"herbal-pomegranate-grove-filler.webp",
  "raspberry-patch":"herbal-raspberry-patch-filler.webp",
  "samurai-mate":"herbal-samurai-mate-filler.webp",
  "sour-apple":"herbal-sour-apple-filler.webp",
  "spearmint":"herbal-spearmint-filler.webp",
  "strawberry-lemonade":"herbal-strawberry-lemonade-filler.webp",
  "summer-night":"herbal-summer-night-filler.webp",
  "toasted-mate":"herbal-toasted-mate-filler.webp",
  "turmeric-bliss":"herbal-turmeric-bliss-filler.webp",
  "watermelon-cooler":"herbal-watermelon-cooler-filler.webp",
  "wild-strawberry":"herbal-wild-strawberry-filler.webp",
  "yerba-mate":"herbal-yerba-mate-filler.webp",
  "yuletide-toddy":"herbal-yuletide-toddy-filler.webp",
  "chaga-chai":"chai-chaga-chai-filler.webp",
  "chocolate-chai":"chai-chocolate-chai-filler.webp",
  "chocolate-chai-pu-erh":"chai-chocolate-chai-pu-erh-filler.webp",
  "cinnamon-rooibos-chai":"chai-cinnamon-rooibos-chai-filler.webp",
  "golden-turmeric-chai":"chai-golden-turmeric-chai-filler.webp",
  "green-chai":"chai-green-chai-filler.webp",
  "honeybush-pumpkin-chai":"chai-honeybush-pumpkin-chai-filler.webp",
  "masala-chai":"chai-masala-chai-filler.webp",
  "mindful-mint-chai":"chai-mindful-mint-chai-filler.webp",
  "raja-oolong-chai":"chai-raja-oolong-chai-filler.webp",
  "rooibos-vanilla-chai":"chai-rooibos-vanilla-chai-filler.webp",
  "spiced-apple-chai":"chai-spiced-apple-chai-filler.webp",
  "thai-chai":"chai-thai-chai-filler.webp",
  "tri-pepper-chai":"chai-tri-pepper-chai-filler.webp",
  "white-ayurvedic-chai":"chai-white-ayurvedic-chai-filler.webp",
  "white-chai":"chai-white-chai-filler.webp",
  "earl-grey-bella-luna":"earl-grey-bella-luna-filler.webp",
  "earl-grey-bravo":"earl-grey-bravo-filler.webp",
  "earl-grey-green":"earl-grey-green-filler.webp",
  "earl-grey-lavender":"earl-grey-lavender-filler.webp",
  "earl-grey-moonlight":"earl-grey-moonlight-filler.webp",
  "earl-grey-supreme":"earl-grey-supreme-filler.webp",
  "rooibos-earl-grey":"earl-grey-rooibos-filler.webp",
  "white-earl-grey":"earl-grey-white-filler.webp",
  "matcha":"matcha-matcha-filler.webp",
  "matcha-blueberry":"matcha-blueberry-filler.webp",
  "matcha-chocolate":"matcha-chocolate-filler.webp",
  "matcha-cinnamon-apple":"matcha-cinnamon-apple-filler.webp",
  "matcha-mocha":"matcha-mocha-filler.webp",
  "matcha-peach":"matcha-peach-filler.webp",
  "matcha-raspberry":"matcha-raspberry-filler.webp",
  "uji-matcha":"matcha-uji-filler.webp",
  "pu-erh-chorange":"pu-erh-chorange-filler.webp",
  "pu-erh-coffee":"pu-erh-coffee-filler.webp",
  "pu-erh-dante":"pu-erh-dante-filler.webp",
  "pu-erh-hazelberry":"pu-erh-hazelberry-filler.webp",
  "pu-erh-spice":"pu-erh-spice-filler.webp",
  "pu-erh-tahiti":"pu-erh-tahiti-filler.webp",
  "casablanca-mint":"darjeeling-casablanca-mint-filler.webp",
  "spring-darjeeling":"darjeeling-spring-filler.webp",
  "white-darjeeling":"darjeeling-white-filler.webp",
  "aquarius":"zodiac-aquarius-filler.webp",
  "aries":"zodiac-aries-filler.webp",
  "cancer":"zodiac-cancer-filler.webp",
  "capricorn":"zodiac-capricorn-filler.webp",
  "gemini":"zodiac-gemini-filler.webp",
  "leo":"zodiac-leo-filler.webp",
  "libra":"zodiac-libra-filler.webp",
  "pisces":"zodiac-pisces-filler.webp",
  "sagittarius":"zodiac-sagittarius-filler.webp",
  "scorpio":"zodiac-scorpio-filler.webp",
  "taurus":"zodiac-taurus-filler.webp",
  "virgo":"zodiac-virgo-filler.webp",
  "decaf-apricot":"decaf-apricot-filler.webp",
  "decaf-blueberry":"decaf-blueberry-filler.webp",
  "decaf-breakfast":"decaf-breakfast-filler.webp",
  "decaf-ceylon":"decaf-ceylon-filler.webp",
  "decaf-chai":"decaf-chai-filler.webp",
  "decaf-chocolate-truffle":"decaf-chocolate-truffle-filler.webp",
  "decaf-cream":"decaf-cream-filler.webp",
  "decaf-earl-grey":"decaf-earl-grey-filler.webp",
  "decaf-hazelnut-cinnamon-creme":"decaf-hazelnut-cinnamon-creme-filler.webp",
  "decaf-mango":"decaf-mango-filler.webp",
  "decaf-orange":"decaf-orange-filler.webp",
  "decaf-peach":"decaf-peach-filler.webp",
  "decaf-raspberry":"decaf-raspberry-filler.webp",
  "decaf-strawberry":"decaf-strawberry-filler.webp",
  "decaf-vanilla":"decaf-vanilla-filler.webp",
  "40-winks":"wellness-40-winks-filler.webp",
  "breathe-well":"wellness-breathe-well-filler.webp",
  "daydream":"wellness-daydream-filler.webp",
  "elderberry-wine":"wellness-elderberry-wine-filler.webp",
  "great-expectations":"wellness-great-expectations-filler.webp",
  "happy-belly":"wellness-happy-belly-filler.webp",
  "jump-start":"wellness-jump-start-filler.webp",
  "mamma-mia":"wellness-mamma-mia-filler.webp",
  "minty-comfort":"wellness-minty-comfort-filler.webp",
  "moringa":"wellness-moringa-filler.webp",
  "red-tent":"wellness-red-tent-filler.webp",
  "skinny-tea":"wellness-skinny-tea-filler.webp",
  "speedy-recovery":"wellness-speedy-recovery-filler.webp",
  "tea-tox":"wellness-tea-tox-filler.webp",
  "throat-therapy":"wellness-throat-therapy-filler.webp"
};

let currentSeries = "Green Tea";

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("show");
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => notice.classList.remove("show"), 2600);
}

function formatPrice(value) {
  if (!value || String(value).toUpperCase() === "TBD") return "Price TBD";
  return String(value).startsWith("$") ? value : "$" + value;
}

function teaImage(tea, detailView = false) {
  const className = detailView ? "detail-photo" : "tea-image";
  const image = detailView && tea.slug === "apricot-green" ? "apricot-green-hero.jpg" : knownImages[tea.slug];
  if (image) return `<div class="${className}"><img src="assets/${image}" alt="${tea.name} loose-leaf tea" /></div>`;
  const artwork = seriesArtwork[tea.series] || "green.webp";
  return `<div class="${className} placeholder series-art-placeholder" role="img" aria-label="${tea.series} botanical collection artwork" style="--placeholder-art:url('assets/series-backgrounds/${artwork}')"></div>`;
}

function availabilityClass(tea) {
  return tea.availability.toLowerCase().includes("season") ? "seasonal" :
    tea.availability.toLowerCase().includes("unavailable") ? "unavailable" : "";
}

function teaHaystack(tea) {
  return [tea.name, tea.series, tea.description, tea.ingredients, tea.flavors.join(" "), tea.search, tea.clarification].join(" ").toLowerCase();
}

function teaResultCard(tea) {
  return `<article class="tea-card">${teaImage(tea)}<div class="tea-card-body"><h2>${tea.name}</h2><p class="flavors">${tea.series} · ${tea.flavors.slice(0, 2).join(" · ")}</p><p><span class="badge ${availabilityClass(tea)}">${tea.availability}</span></p><button class="view-tea" type="button" data-global-tea="${tea.slug}">View Tea</button></div></article>`;
}

function renderCollectionSearch() {
  const term = collectionSearch.value.trim().toLowerCase();
  collectionSearchResults.hidden = !term;
  collectionSeriesGrid.hidden = Boolean(term);
  if (!term) return collectionSearchResults.innerHTML = "";
  const results = teas.filter(tea => teaHaystack(tea).includes(term));
  collectionSearchResults.innerHTML = results.length ? results.map(teaResultCard).join("") : `<div class="empty">No teas match “${collectionSearch.value.trim()}.” Try another word.</div>`;
}

function editDistance(a, b) {
  const row = Array.from({length:b.length + 1}, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]; row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const saved = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = saved;
    }
  }
  return row[b.length];
}

function renderSiteSearch() {
  const term = siteSearch.value.trim().toLowerCase();
  if (!term) return siteSearchResults.innerHTML = "";
  const direct = teas.filter(tea => teaHaystack(tea).includes(term));
  const pool = direct.length ? direct : teas;
  const matches = pool.map(tea => {
    const name = tea.name.toLowerCase();
    const score = name === term ? 0 : name.startsWith(term) ? 1 : name.includes(term) ? 2 : tea.series.toLowerCase().includes(term) ? 3 : direct.length ? 4 : 10 + editDistance(term, name);
    return {tea, score};
  }).sort((a,b) => a.score - b.score || a.tea.name.localeCompare(b.tea.name)).slice(0, 6);
  siteSearchResults.innerHTML = matches.map(({tea}, index) => `<button type="button" data-global-tea="${tea.slug}"><strong>${tea.name}</strong><small>${tea.series}${index === 0 ? " · Closest match" : ""}</small></button>`).join("");
}

function seriesSlug(name) {
  return name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderSeriesNavigation() {
  seriesSelect.innerHTML = seriesList.map(name => `<option value="${name}">${name}</option>`).join("");
  seriesMenu.innerHTML = seriesList.map(name => {
    const total = teas.filter(tea => tea.series === name).length;
    return `<button type="button" data-series="${name}"><span>${name}</span><small>${total} teas</small></button>`;
  }).join("");
  collectionSeriesGrid.innerHTML = seriesList.map(name => {
    const total = teas.filter(tea => tea.series === name).length;
    const artwork = seriesArtwork[name];
    return `<button class="collection-card" type="button" data-series="${name}" style="--collection-art:url('assets/series-backgrounds/${artwork}')">
      <span class="collection-card-art" aria-hidden="true"></span>
      <span class="collection-card-copy"><strong>${name}</strong><small>${total} teas</small><em>Explore Collection →</em></span>
    </button>`;
  }).join("");
}

function updateSeriesPresentation() {
  title.textContent = currentSeries;
  breadcrumbSeries.textContent = currentSeries;
  showingSeries.textContent = `Showing the ${currentSeries} collection`;
  seriesCopy.textContent = seriesDescriptions[currentSeries] || "";
  seriesSelect.value = currentSeries;
  document.body.dataset.series = themeNames[currentSeries] || "green";
  document.title = `${currentSeries} | Sugarplum Country Artisan Tea Collection`;
  seriesMenu.querySelectorAll("[data-series]").forEach(button => button.classList.toggle("active", button.dataset.series === currentSeries));
}

function renderCards() {
  const term = search.value.trim().toLowerCase();
  const status = availability.value;
  const results = teas.filter(tea => {
    if (tea.series !== currentSeries) return false;
    const haystack = teaHaystack(tea);
    const matchesTerm = !term || haystack.includes(term);
    const lower = tea.availability.toLowerCase();
    const matchesStatus = status === "all" || (status === "seasonal" ? lower.includes("season") : status === "unavailable" ? lower.includes("unavailable") : !lower.includes("season") && !lower.includes("unavailable"));
    return matchesTerm && matchesStatus;
  }).sort((a, b) => sortOrder.value === "za" ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name));
  count.textContent = results.length;
  empty.hidden = results.length !== 0;
  grid.innerHTML = results.map(tea => `
    <article class="tea-card">
      ${teaImage(tea)}
      <div class="tea-card-body">
        <h2>${tea.name}</h2>
        <p class="flavors">${tea.flavors.slice(0, 3).join(" · ") || "Artisan loose-leaf tea"}</p>
        <p><span class="badge ${availabilityClass(tea)}">${tea.availability}</span></p>
        <button class="view-tea" type="button" data-slug="${tea.slug}">View Tea</button>
      </div>
    </article>`).join("");
}

function chooseSeries(name, updateHash = true) {
  if (!seriesList.includes(name)) return;
  currentSeries = name;
  collectionHome.hidden = true;
  catalogSection.hidden = false;
  search.value = "";
  availability.value = "all";
  updateSeriesPresentation();
  renderCards();
  window.scrollTo({top: 0, behavior: "smooth"});
  if (updateHash) history.replaceState(null, "", `#series/${seriesSlug(name)}`);
}

function showCollectionHome(updateHash = true) {
  catalogSection.hidden = true;
  collectionHome.hidden = false;
  document.body.dataset.series = "home";
  document.title = "Artisan Tea Collection | Sugarplum Country";
  window.scrollTo({top: 0, behavior: "smooth"});
  if (updateHash) history.replaceState(null, "", "#collections");
}

function teaDetailCard(tea) {
  const allPricesReady = tea.sizes.every(size => size.price && String(size.price).toUpperCase() !== "TBD");
  const availableRelated = tea.related.filter(name => teas.some(item => item.name.toLowerCase() === name.toLowerCase()));
  return `<article class="comparison-card" data-open-tea="${tea.slug}" style="--tea-card-background:url('assets/${seriesCardArtwork[tea.series] || "victorian-tea-postcard-bg.webp"}')">
    <button class="close-tea" type="button" data-close-tea="${tea.slug}" aria-label="Close ${tea.name}">×</button>
    <div class="detail-layout">
      ${teaImage(tea, true)}
      <div class="detail-copy">
        <p class="breadcrumb">Artisan Tea Collection <span>/</span> ${tea.series} <span>/</span> ${tea.name}</p>
        <h2>${tea.name}</h2>
        <p class="detail-tags">${tea.series} · ${tea.flavors.slice(0, 3).join(" · ")}</p>
        <p><span class="badge ${availabilityClass(tea)}">${tea.availability}</span></p>
        <p class="availability-message"><em>${tea.availability === "Available to Order" ? "Hand-packed in shop. Please allow approximately 3–5 business days for preparation." : tea.message}</em>${tea.return ? `<br><strong>Estimated return: ${tea.return}</strong>` : ""}${tea.notes ? `<br><span>${tea.notes}</span>` : ""}</p>
        <p class="detail-description">${tea.description}</p>
      </div>
      <div class="card-details">
        <div class="facts">
          <div class="fact"><h3>Ingredients</h3><p>${tea.ingredients}</p></div>
          <div class="fact"><h3>Brewing</h3><p>${tea.brewing}</p></div>
          <div class="fact"><h3>Caffeine</h3><p>${tea.caffeine}</p></div>
          <div class="fact"><h3>Flavor</h3><p>${tea.flavors.join(" · ")}</p></div>
        </div>
        <h3 class="serving-title">Choose a serving size</h3>
        <div class="servings">
          ${tea.sizes.map((size, index) => `<button class="serving ${index === 0 ? "selected" : ""}" type="button" data-size="${size.name}"><span>${size.name}</span><small>${size.detail.replace(/^.*?—\s*/, "")}</small><strong>${formatPrice(size.price)}</strong></button>`).join("")}
        </div>
        <div class="cart-row"><select aria-label="Quantity"><option>1</option><option>2</option><option>3</option></select><button class="add-to-cart" type="button" ${allPricesReady ? "" : "disabled"}>${allPricesReady ? "ADD TO CART" : "ADD TO CART — PRICING PENDING"}</button><p class="tea-bag-note">Biodegradable tea bags sold separately.<br><span>Tea accessories coming soon.</span></p></div>
        <div class="related"><h3>Related Teas</h3>${availableRelated.map(name => `<button type="button" data-related="${name}">${name} →</button>`).join("") || "<p>Related selections will be added as the collection grows.</p>"}</div>
      </div>
    </div>
  </article>`;
}

function activateTeaCard(slug, updateHash = true) {
  const cards = [...detail.querySelectorAll(".comparison-card")];
  cards.forEach(card => card.classList.toggle("active", card.dataset.openTea === slug));
  detail.querySelectorAll("[data-focus-tea]").forEach(tab => {
    const active = tab.dataset.focusTea === slug;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const activeCard = cards.find(card => card.dataset.openTea === slug);
  if (activeCard) activeCard.style.zIndex = String(30 + cards.length);
  if (updateHash) history.replaceState(null, "", `#tea/${slug}`);
}

function refreshTeaTabs() {
  const tabs = detail.querySelector(".comparison-tabs");
  if (!tabs) return;
  tabs.innerHTML = [...detail.querySelectorAll(".comparison-card")].map(card => {
    const tea = teas.find(item => item.slug === card.dataset.openTea);
    return `<button type="button" role="tab" data-focus-tea="${card.dataset.openTea}">${tea.name}</button>`;
  }).join("");
}

function openTea(slug, updateHash = true) {
  const tea = teas.find(item => item.slug === slug);
  if (!tea) return showNotice("That tea is not in the current website launch collection.");
  if (!dialog.open) {
    detail.innerHTML = `<div class="comparison-grid"></div>`;
    dialog.show();
  }
  dialog.classList.remove("minimized");
  comparisonToggle.textContent = "Minimize";
  comparisonToggle.setAttribute("aria-expanded", "true");
  const comparisonGrid = detail.querySelector(".comparison-grid");
  const existing = comparisonGrid.querySelector(`[data-open-tea="${slug}"]`);
  if (!existing) {
    comparisonGrid.insertAdjacentHTML("beforeend", teaDetailCard(tea));
    const added = comparisonGrid.lastElementChild;
    const offset = (comparisonGrid.children.length - 1) * 34;
    added.style.left = `${Math.min(24 + offset, Math.max(24, window.innerWidth - 940))}px`;
    added.style.top = `${Math.min(18 + offset, Math.max(18, window.innerHeight - 644))}px`;
    refreshTeaTabs();
  }
  activateTeaCard(slug, updateHash);
}

function loadHash() {
  const routeParam = new URLSearchParams(location.search).get("route");
  const hash = location.hash.slice(1) || routeParam || "";
  if (hash.startsWith("tea/")) {
    const tea = teas.find(item => item.slug === hash.slice(4));
    if (tea) chooseSeries(tea.series, false);
    return openTea(hash.slice(4), false);
  }
  if (hash.startsWith("series/")) {
    const slug = hash.slice(7);
    const found = seriesList.find(name => seriesSlug(name) === slug);
    if (found) return chooseSeries(found, false);
  }
  showCollectionHome(false);
}

grid.addEventListener("click", event => {
  const button = event.target.closest("[data-slug]");
  if (button) openTea(button.dataset.slug);
});
seriesMenu.addEventListener("click", event => {
  const button = event.target.closest("[data-series]");
  if (button) chooseSeries(button.dataset.series);
});
collectionSeriesGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-series]");
  if (button) chooseSeries(button.dataset.series);
});
detail.addEventListener("click", event => {
  const closeTea = event.target.closest("[data-close-tea]");
  if (closeTea) {
    const card = closeTea.closest(".comparison-card");
    const wasActive = card.classList.contains("active");
    const nextCard = card.nextElementSibling || card.previousElementSibling;
    card.remove();
    refreshTeaTabs();
    if (!detail.querySelector(".comparison-card")) dialog.close();
    else if (wasActive && nextCard) activateTeaCard(nextCard.dataset.openTea);
    return;
  }
  const teaTab = event.target.closest("[data-focus-tea]");
  if (teaTab) {
    activateTeaCard(teaTab.dataset.focusTea);
    return;
  }
  const serving = event.target.closest(".serving");
  if (serving) {
    serving.closest(".comparison-card").querySelectorAll(".serving").forEach(item => item.classList.remove("selected"));
    serving.classList.add("selected");
  }
  const addToCart = event.target.closest(".add-to-cart");
  if (addToCart) {
    const card = addToCart.closest(".comparison-card");
    const tea = teas.find(item => item.slug === card.dataset.openTea);
    const selectedSize = card.querySelector(".serving.selected")?.dataset.size;
    const quantity = Number(card.querySelector('.cart-row select')?.value || 1);
    if (!tea || !selectedSize) return showNotice("Please choose a serving size.");
    addToCart.disabled = true;
    addToCart.textContent = "ADDING…";
    if (window.parent === window) {
      addToCart.disabled = false;
      addToCart.textContent = "ADD TO CART";
      return showNotice("Cart testing is available inside the Wix test site.");
    }
    const targetOrigin = document.referrer ? new URL(document.referrer).origin : "https://www.sugarplumcountry.com";
    window.parent.postMessage({ type: "sugarplum:add-to-cart", teaName: tea.name, size: selectedSize, quantity }, targetOrigin);
  }
  const related = event.target.closest("[data-related]");
  if (related) {
    const found = teas.find(tea => tea.name.toLowerCase() === related.dataset.related.toLowerCase());
    if (found) openTea(found.slug); else showNotice("That related tea is not in the current website launch collection.");
  }
});

let dragState = null;
detail.addEventListener("pointerdown", event => {
  const card = event.target.closest(".comparison-card");
  if (!card || event.target.closest("button, a, select, input") || event.clientY - card.getBoundingClientRect().top > 64) return;
  const rect = card.getBoundingClientRect();
  dragState = { card, dx: event.clientX - rect.left, dy: event.clientY - rect.top };
  card.setPointerCapture(event.pointerId);
  activateTeaCard(card.dataset.openTea);
  card.style.cursor = "grabbing";
  event.preventDefault();
});
detail.addEventListener("pointermove", event => {
  if (!dragState) return;
  const {card, dx, dy} = dragState;
  const maxLeft = Math.max(0, window.innerWidth - card.offsetWidth);
  const maxTop = Math.max(0, window.innerHeight - card.offsetHeight);
  card.style.left = `${Math.max(0, Math.min(maxLeft, event.clientX - dx))}px`;
  card.style.top = `${Math.max(0, Math.min(maxTop, event.clientY - dy))}px`;
});
detail.addEventListener("pointerup", event => {
  if (!dragState) return;
  dragState.card.releasePointerCapture(event.pointerId);
  dragState.card.style.cursor = "";
  dragState = null;
});
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
comparisonToggle.addEventListener("click", () => {
  const minimized = dialog.classList.toggle("minimized");
  comparisonToggle.textContent = minimized ? "Open Comparison" : "Minimize";
  comparisonToggle.setAttribute("aria-expanded", String(!minimized));
});
dialog.addEventListener("close", () => {
  detail.innerHTML = "";
  history.replaceState(null, "", `#series/${seriesSlug(currentSeries)}`);
});
search.addEventListener("input", renderCards);
collectionSearch.addEventListener("input", renderCollectionSearch);
siteSearch.addEventListener("input", renderSiteSearch);
function openGlobalTea(event) {
  const button = event.target.closest("[data-global-tea]");
  if (!button) return;
  const tea = teas.find(item => item.slug === button.dataset.globalTea);
  if (!tea) return;
  siteSearchPanel.hidden = true;
  chooseSeries(tea.series, false);
  openTea(tea.slug);
}
collectionSearchResults.addEventListener("click", openGlobalTea);
siteSearchResults.addEventListener("click", openGlobalTea);
availability.addEventListener("change", renderCards);
sortOrder.addEventListener("change", renderCards);
seriesSelect.addEventListener("change", () => chooseSeries(seriesSelect.value));
document.querySelector("#all-series").addEventListener("click", () => showCollectionHome());
document.querySelector('[data-nav="search"]').addEventListener("click", () => {
  siteSearchPanel.hidden = !siteSearchPanel.hidden;
  if (!siteSearchPanel.hidden) siteSearch.focus();
});
document.querySelector('[data-nav="account"]').addEventListener("click", () => showNotice("Account connection will be added during the final Wix setup."));
document.querySelector('[data-nav="cart"]').addEventListener("click", () => showNotice("Cart activation is waiting for final tea prices."));
window.addEventListener("message", event => {
  if (event.origin !== "https://www.sugarplumcountry.com" || !event.data?.type?.startsWith("sugarplum:cart-")) return;
  const button = detail.querySelector(".add-to-cart:disabled");
  if (button) {
    button.disabled = false;
    button.textContent = "ADD TO CART";
  }
  showNotice(event.data.type === "sugarplum:cart-success" ? `${event.data.teaName} was added to your cart.` : (event.data.message || "We couldn't add that tea. Please try again."));
});

renderSeriesNavigation();
loadHash();
