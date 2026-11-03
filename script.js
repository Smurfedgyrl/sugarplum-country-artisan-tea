const catalog = window.TEA_CATALOG;
const mobileBrowserIdentity = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
  || navigator.userAgentData?.mobile === true;
const mobileLayoutIdentity = mobileBrowserIdentity
  || window.matchMedia("(max-width: 650px)").matches
  || window.matchMedia("(hover: none) and (pointer: coarse)").matches;

if (mobileLayoutIdentity && !document.querySelector('link[data-mobile-tea-styles]')) {
  const mobileStyles = document.createElement("link");
  mobileStyles.rel = "stylesheet";
  mobileStyles.href = "mobile.css?v=8";
  mobileStyles.dataset.mobileTeaStyles = "true";
  document.head.appendChild(mobileStyles);
}

// Keep customer-facing full-pound prices in sync with the store's whole-dollar
// full-pound discount. Other sizes and already-whole-dollar prices are unchanged.
catalog.teas.forEach((tea) => {
  tea.sizes?.forEach((size) => {
    const price = Number(size.price);
    if (
      size.name === "Full Pound" &&
      Number.isFinite(price) &&
      Math.round(price * 100) % 100 === 50
    ) {
      size.price = Math.floor(price).toFixed(2);
    }
  });
});
const teas = catalog.teas.filter((tea) => tea.catalogVisibility !== "master-only");
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

function isMobileTeaUI() {
  return mobileLayoutIdentity;
}
const title = document.querySelector("#series-title");
const seriesCopy = document.querySelector("#series-copy");
const breadcrumbSeries = document.querySelector("#breadcrumb-series");
const showingSeries = document.querySelector("#showing-series");

const seriesDescriptions = {
  "Black Tea": "Rich, full-bodied teas ranging from classic and malty to fruit-filled, floral, and dessert-inspired.",
  "Green Tea": "Fresh, graceful teas ranging from softly floral and fruity to toasted, minty, and dessert-inspired.",
  "Oolong Tea": "Layered, aromatic teas balancing floral lift, smooth body, gentle roast, and lingering sweetness.",
  "White Tea": "Delicate, elegant teas with soft floral, fruit, honeyed, and naturally refreshing notes.",
  "Rooibos": "Naturally caffeine-free South African red and green rooibos infusions with smooth, cozy, fruity, and dessert-like character.",
  "Honeybush": "Naturally caffeine-free South African honeybush infusions with mellow body, gentle sweetness, fruit, spice, and dessert-like character.",
  "Herbal Tea": "Colorful caffeine-free botanical blends filled with fruits, flowers, herbs, spice, and comforting flavor.",
  "Chai": "Warmly spiced blends with aromatic depth, cozy sweetness, and satisfying character served hot or iced.",
  "Earl Grey": "Distinctive bergamot teas ranging from timeless classics to creamy, floral, and imaginative interpretations.",
  "Matcha": "Vibrant Japanese-style green tea selections with smooth energy, concentrated flavor, and versatile preparation.",
  "Pu-Erh Tea": "Earthy, deeply rounded teas with smooth body, aged character, and richly layered flavor.",
  "Darjeeling": "Elegant high-grown teas celebrated for their bright aroma, refined body, and distinctive muscatel character.",
  "Seasonal Exclusives": "Limited-calendar teas released for particular seasons, special harvests, holidays, or rare events. Availability changes throughout the year.",
  "Zodiac Collection": "A whimsical celestial collection pairing each zodiac sign with its own expressive tea blend.",
  "Decaf Tea": "Comforting decaffeinated favorites created for full flavor with significantly less caffeine.",
  "Wellness": "Purposeful botanical blends selected for comforting rituals, balanced flavor, and everyday well-being."
};

const themeNames = {
  "Black Tea":"black","Green Tea":"green","Oolong Tea":"oolong","White Tea":"white",
  "Rooibos":"rooibos","Honeybush":"rooibos","Herbal Tea":"herbal","Chai":"chai","Earl Grey":"earl",
  "Matcha":"matcha","Pu-Erh Tea":"puerh","Darjeeling":"darjeeling","Seasonal Exclusives":"black","Zodiac Collection":"zodiac",
  "Decaf Tea":"decaf","Wellness":"wellness"
};

const seriesArtwork = {
  "Black Tea":"black.webp","Green Tea":"green.webp","Oolong Tea":"oolong.webp","White Tea":"white.webp",
  "Rooibos":"rooibos.webp","Honeybush":"rooibos.webp","Herbal Tea":"herbal.webp","Chai":"chai.webp","Earl Grey":"earl.webp",
  "Matcha":"matcha.webp","Pu-Erh Tea":"puerh.webp","Darjeeling":"darjeeling.webp","Seasonal Exclusives":"seasonal-exclusives-v1.png","Zodiac Collection":"zodiac.webp",
  "Decaf Tea":"decaf.webp","Wellness":"wellness.webp"
};

const seriesCardArtwork = {
  "Black Tea":"victorian-tea-postcard-bg.webp", "Green Tea":"green-tea-postcard-bg.webp",
  "Oolong Tea":"oolong-tea-postcard-bg.webp", "White Tea":"white-tea-postcard-bg.webp",
  "Rooibos":"rooibos-tea-postcard-bg.webp", "Honeybush":"honeybush-tea-postcard-bg-v1.png", "Herbal Tea":"herbal-tea-postcard-bg.webp",
  "Chai":"chai-tea-postcard-bg.webp", "Earl Grey":"earl-grey-postcard-bg.webp",
  "Matcha":"matcha-postcard-bg.webp", "Pu-Erh Tea":"puerh-postcard-bg.webp",
  "Darjeeling":"darjeeling-postcard-bg.webp", "Seasonal Exclusives":"seasonal-exclusives-postcard-bg-v1.png", "Zodiac Collection":"zodiac-postcard-bg.webp",
  "Decaf Tea":"decaf-postcard-bg.webp", "Wellness":"wellness-postcard-bg.webp"
};

const knownImages = {
  "hojicha-chocolate": "tea-photos/green/hojicha-chocolate.webp",
  "atlantico-lime": "tea-photos/green/atlantico-lime.webp",
  "blackcurrant-cassis": "tea-photos/green/blackcurrant-cassis.webp",
  "blue-mango": "tea-photos/green/blue-mango.webp",
  "blue-suede-shoes": "tea-photos/green/blue-suede-shoes.webp",
  "bohemian-raspberry": "tea-photos/green/bohemian-raspberry.webp",
  "caramel-apple-crumble": "tea-photos/green/caramel-apple-crumble.webp",
  "cinnamon-sibu": "tea-photos/green/cinnamon-sibu.webp",
  "coconut-dream": "tea-photos/green/coconut-dream.webp",
  "crime-of-passion": "tea-photos/green/crime-of-passion.webp",
  "cucumber-melon-green": "tea-photos/green/cucumber-melon-green.webp",
  "golden-apple-spice": "tea-photos/green/golden-apple-spice.webp",
  "granny-green-apple": "tea-photos/green/granny-green-apple.webp",
  "guava-comoros": "tea-photos/green/guava-comoros.webp",
  "island-earl-grey": "tea-photos/green/island-earl-grey.webp",
  "key-lime-pie": "tea-photos/green/key-lime-pie.webp",
  "long-island-strawberry": "tea-photos/green/long-island-strawberry.webp",
  "sencha-kyoto-cherry-rose": "tea-photos/green/sencha-kyoto-cherry-rose.webp",
  "shanghai-lychee-jasmine": "tea-photos/green/shanghai-lychee-jasmine.webp",
  "tamarind-lychee-green": "tea-photos/green/tamarind-lychee-green.webp",
  "vanilla-pumpkin-swirl": "tea-photos/green/vanilla-pumpkin-swirl.webp",
  "watermelon-lime": "tea-photos/green/watermelon-lime.webp",
  "blueberry-green": "tea-photos/green/blueberry-green.webp",
  "blueberry-pie": "tea-photos/green/blueberry-pie.webp",
  "cream-earl-grey-green": "tea-photos/green/cream-earl-grey-green.webp",
  "earl-grey-green": "tea-photos/green/earl-grey-green.webp",
  "irish-eyes-green-tea": "tea-photos/green/irish-eyes-green-tea.webp",
  "lemon-green": "tea-photos/green/lemon-green.webp",
  "maple-green": "tea-photos/green/maple-green.webp",
  "monk-s-blend-green": "tea-photos/green/monks-blend-green.webp",
  "pomegranate-hibiscus": "tea-photos/green/pomegranate-hibiscus.webp",
  "strawberry-green": "tea-photos/green/strawberry-green.webp",
  "vanilla-bean-dream": "tea-photos/green/vanilla-bean-dream.webp",
  "almond": "tea-photos/black/almond-macro.webp",
  "apricot": "tea-photos/black/apricot-macro.webp",
  "april-in-paris": "tea-photos/black/april-in-paris-macro.webp",
  "assam-harmony": "tea-photos/black/assam-harmony-macro.webp",
  "assam-melody": "tea-photos/black/assam-melody-macro.webp",
  "black-cherry": "tea-photos/black/black-cherry-macro.webp",
  "black-forest-cake": "tea-photos/black/black-forest-cake-macro.webp",
  "black-jasmine-song": "tea-photos/black/black-jasmine-song-macro.webp",
  "blackberry": "tea-photos/black/blackberry-macro.webp",
  "blueberry": "tea-photos/black/blueberry-macro.webp",
  "brigadoon-breakfast": "tea-photos/black/brigadoon-breakfast-macro.webp",
  "butterscotch": "tea-photos/black/butterscotch-macro.webp",
  "campfire-s-mores": "tea-photos/black/campfire-s-mores-macro.webp",
  "candy-apple": "tea-photos/black/candy-apple-macro.webp",
  "candy-cane": "tea-photos/black/candy-cane-macro.webp",
  "caramel": "tea-photos/black/caramel-macro.webp",
  "caramel-cr-me-br-l-e": "tea-photos/black/caramel-creme-brulee-macro.webp",
  "ceylon-sonata": "tea-photos/black/ceylon-sonata-macro.webp",
  "chocolate": "tea-photos/black/chocolate-macro.webp",
  "chocolate-chip": "tea-photos/black/chocolate-chip-macro.webp",
  "chocolate-truffle": "tea-photos/black/chocolate-truffle-macro.webp",
  "christmas": "tea-photos/black/christmas-macro.webp",
  "cinnamon": "tea-photos/black/cinnamon-macro.webp",
  "coconut": "tea-photos/black/coconut-macro.webp",
  "cranberry": "tea-photos/black/cranberry-macro.webp",
  "cream": "tea-photos/black/cream-macro.webp",
  "currant": "tea-photos/black/currant-macro.webp",
  "english-breakfast": "tea-photos/black/english-breakfast-macro.webp",
  "forest-berries": "tea-photos/black/forest-berries-macro.webp",
  "ginger-peach": "tea-photos/black/ginger-peach-macro.webp",
  "gingerbread": "tea-photos/black/gingerbread-macro.webp",
  "grapefruit": "tea-photos/black/grapefruit-macro.webp",
  "half-caff-brekkie": "tea-photos/black/half-caff-brekkie-macro.webp",
  "hazelnut": "tea-photos/black/hazelnut-macro.webp",
  "hibiscus": "tea-photos/black/hibiscus-macro.webp",
  "irish-breakfast": "tea-photos/black/irish-breakfast-macro.webp",
  "kentucky-bourbon": "tea-photos/black/kentucky-bourbon-macro.webp",
  "kringles-krush": "tea-photos/black/kringles-krush-macro.webp",
  "lapsang-souchong": "tea-photos/black/lapsang-souchong-macro.webp",
  "lemon-soleil": "tea-photos/black/lemon-soleil-macro.webp",
  "mango": "tea-photos/black/mango-macro.webp",
  "orange": "tea-photos/black/orange-macro.webp",
  "orange-spice": "tea-photos/black/orange-spice-macro.webp",
  "passionfruit": "tea-photos/black/passionfruit-macro.webp",
  "peach": "tea-photos/black/peach-macro.webp",
  "pumpkin-spice": "tea-photos/black/pumpkin-spice-macro.webp",
  "raspberry": "tea-photos/black/raspberry-macro.webp",
  "scottish-breakfast": "tea-photos/black/scottish-breakfast-macro.webp",
  "strawberry": "tea-photos/black/strawberry-macro.webp",
  "summer-rose": "tea-photos/black/summer-rose-macro.webp",
  "sweet-cinnamon-spice": "tea-photos/black/sweet-cinnamon-spice-macro.webp",
  "sweet-potato-pie": "tea-photos/black/sweet-potato-pie-macro.webp",
  "thai-tea": "tea-photos/black/thai-tea-macro.webp",
  "tiger-eye": "tea-photos/black/tiger-eye-macro.webp",
  "valentines": "tea-photos/black/valentines-macro.webp",
  "vanilla": "tea-photos/black/vanilla-macro.webp",
  "chestnut": "tea-photos/black/chestnut-macro.webp",
  "autumn-mist-green": "green-autumn-mist-filler.webp",
  "blueberry-peach-cobbler-green": "green-blueberry-peach-cobbler-filler.webp",
  "calypso-green": "green-calypso-filler.webp",
  "cherry-green": "green-cherry-filler.webp",
  "citrus-mint-green": "green-citrus-mint-filler.webp",
  "cocomint-green": "green-cocomint-filler.webp",
  "cranberry-nut-muffin-green": "green-cranberry-nut-muffin-filler.webp",
  "ginseng-green": "green-ginseng-filler.webp",
  "lemon-meringue-green": "green-lemon-meringue-filler.webp",
  "lychee-rose-green": "green-lychee-rose-filler.webp",
  "melonberry-green": "green-melonberry-filler.webp",
  "pomegranate-green": "green-pomegranate-filler.webp",
  "vanilla-green": "green-vanilla-filler.webp",
  "apricot-green": "apricot-green.jpg",
  "citron-green": "citron-green.jpg",
  "mango-green": "mango-green.jpg",
  "raspberry-green": "raspberry-green.jpg",
  "almond-oolong": "oolong-almond-filler.webp",
  "blackberry-sage-oolong": "oolong-blackberry-sage-filler.webp",
  "cherry-marzipan-oolong": "oolong-cherry-marzipan-filler.webp",
  "grapefruit-oolong": "oolong-grapefruit-filler.webp",
  "maple-creme-oolong": "oolong-maple-creme-filler.webp",
  "peach-oolong": "oolong-peach-filler.webp",
  "vanilla-oolong": "oolong-vanilla-filler.webp",
  "maple-french-toast-oolong":"oolong-maple-french-toast-filler.webp",
  "cinnamon-oolong":"oolong-cinnamon-filler.webp",
  "oolong-goji-berry":"oolong-goji-berry-filler.webp",
  "oolong-grapefruit-rose":"oolong-grapefruit-rose-filler.webp",
  "oolong-jadore-mango":"oolong-jadore-mango-filler.webp",
  "oolong-loire-valley-peach":"oolong-loire-valley-peach-filler.webp",
  "oolong-royal-empress":"oolong-royal-empress-filler.webp",
  "oolong-st-james-strawberry":"oolong-st-james-strawberry-filler.webp",
  "oolong-sweet-watermelon":"oolong-sweet-watermelon-filler.webp",
  "buddhas-dream": "white-buddhas-dream-filler.webp",
  "fuzzy-navel": "white-fuzzy-navel-filler.webp",
  "white-blueberry": "white-blueberry-filler.webp",
  "white-eternal-spring": "white-eternal-spring-filler.webp",
  "white-grapefruit": "white-grapefruit-filler.webp",
  "white-peach": "white-peach-filler.webp",
  "white-pear": "white-pear-filler.webp",
  "white-peony": "white-peony-filler.webp",
  "white-strawberry": "white-strawberry-filler.webp",
  "white-strawberry-basil": "white-strawberry-basil-filler.webp",
  "white-symphony": "white-symphony-filler.webp",
  "white-tangerine": "white-tangerine-filler.webp",
  "white-toasted-coconut": "white-toasted-coconut-filler.webp",
  "white-tropics": "white-tropics-filler.webp",
  "almond-cardamom-cake": "rooibos-almond-cardamom-cake-filler.webp",
  "a-raspberry-in-paris-rooibos": "rooibos-raspberry-in-paris.webp",
  "almond-amaretto-biscotti-rooibos": "rooibos-almond-amaretto-biscotti.webp",
  "almond-rocker-rooibos": "rooibos-almond-rocker.webp",
  "apple-ginger-rooibos": "rooibos-apple-ginger.webp",
  "baked-apple-rooibos": "rooibos-baked-apple.webp",
  "banana-muffin-rooibos": "rooibos-banana-muffin.webp",
  "belgian-chocolate-rooibos": "rooibos-belgian-chocolate.webp",
  "berry-fields": "rooibos-berry-fields.webp",
  "blueberry-bang-rooibos": "rooibos-blueberry-bang.png",
  "bora-bora-mango-rooibos": "rooibos-bora-bora-mango.png",
  "bourbon-street-vanilla": "rooibos-bourbon-street-vanilla.png",
  "cape-cod-cranberry-rooibos": "rooibos-cape-cod-cranberry.png",
  "carrot-cake-rooibos": "rooibos-carrot-cake.png",
  "cherry-rose-rooibos": "rooibos-cherry-rose.png",
  "chocolate-mint-rooibos": "rooibos-chocolate-mint.png",
  "cinnamon-chacha-rooibos": "rooibos-cinnamon-chacha.png",
  "corsican-pear-spice-rooibos": "rooibos-corsican-pear-spice.png",
  "cream-earl-grey-rooibos": "rooibos-cream-earl-grey.png",
  "creme-au-caramel-rooibos": "rooibos-creme-au-caramel.png",
  "dutch-licorice-rooibos": "rooibos-dutch-licorice.png",
  "earl-grey-rooibos": "rooibos-earl-grey-approved.png",
  "florida-orange-rooibos": "rooibos-florida-orange-approved.png",
  "georgia-peach-rooibos": "rooibos-georgia-peach-approved.png",
  "gibraltar-black-currant-rooibos": "rooibos-gibraltar-black-currant-approved.png",
  "ginger-bounce-rooibos": "rooibos-ginger-bounce-approved.png",
  "godiva-roche-rooibos": "rooibos-godiva-roche-approved.png",
  "golden-pineapple-chocolate": "rooibos-golden-pineapple-chocolate-approved.png",
  "hawaiian-colada-rooibos": "rooibos-hawaiian-colada-approved.png",
  "hunny-rooibos": "rooibos-hunny-approved.png",
  "le-marche-spice-rooibos": "rooibos-le-marche-spice-approved.png",
  "lugano-palamisu-rooibos": "rooibos-lugano-palamisu-approved.png",
  "mocha-rocha-rooibos": "rooibos-mocha-rocha-approved.png",
  "nutcracker": "rooibos-nutcracker-approved.png",
  "pecan-pie-rooibos": "rooibos-pecan-pie-approved.png",
  "provence-rooibos": "rooibos-provence-approved.png",
  "pumpkin-spice-rooibos": "rooibos-pumpkin-spice-approved.png",
  "rainbow-rooibos": "rooibos-rainbow-approved.png",
  "root-beer-rooibos": "rooibos-root-beer-approved.png",
  "spring-in-place-de-la-madeleine": "rooibos-spring-madeleine-approved.png",
  "strawberry-tingle-rooibos": "rooibos-strawberry-tingle-approved.png",
  "sunshine-lemon-rooibos": "rooibos-sunshine-lemon-approved.png",
  "thai-lemon-ginger-rooibos": "rooibos-thai-lemon-ginger-approved.png",
  "tuscany-pear-rooibos": "rooibos-tuscany-pear-approved.png",
  "white-swiss-truffle-rooibos": "rooibos-white-swiss-truffle-approved.png",
  "winter-palace-marzipan-rooibos": "rooibos-winter-palace-marzipan-approved.png",
  "cranberry-cream": "rooibos-cranberry-cream-filler.webp",
  "green-rooibos": "rooibos-green-rooibos-filler.webp",
  "green-rooibos-blueberry": "rooibos-green-rooibos-blueberry-filler.webp",
  "green-rooibos-bonita": "rooibos-green-rooibos-bonita-filler.webp",
  "green-rooibos-citron": "rooibos-green-rooibos-citron-filler.webp",
  "green-rooibos-key-west": "rooibos-green-rooibos-key-west-filler.webp",
  "green-rooibos-paradiso": "rooibos-green-rooibos-paradiso-filler.webp",
  "honeybush": "rooibos-honeybush-filler.webp",
  "honeybush-apricot": "rooibos-honeybush-apricot-filler.webp",
  "honeybush-banana-nut": "rooibos-honeybush-banana-nut-filler.webp",
  "honeybush-blueberry-pancake": "rooibos-honeybush-blueberry-pancake-filler.webp",
  "honeybush-chocolate": "rooibos-honeybush-chocolate-filler.webp",
  "honeybush-hazelnut": "rooibos-honeybush-hazelnut-filler.webp",
  "honeybush-mango": "rooibos-honeybush-mango-filler.webp",
  "honeybush-vanilla": "rooibos-honeybush-vanilla-filler.webp",
  "honeybush-wild-berry": "rooibos-honeybush-wild-berry-filler.webp",
  "honeybush-peach": "rooibos-honeybush-peach-filler.webp",
  "raspberry-honeybush": "rooibos-raspberry-honeybush-filler.webp",
  "malabar-decaf-chai": "chai-malabar-decaf-filler.webp",
  "burnt-sugar-chai": "chai-burnt-sugar-filler.webp",
  "maple-chai": "chai-maple-filler.webp",
  "night-of-the-iguana-chocolate-chai": "chai-night-iguana-filler.webp",
  "sleepy-hollow-pumpkin-chai": "chai-sleepy-hollow-filler.webp",
  "vanilla-chai": "chai-vanilla-filler.webp",
  "genmaicha-chai": "chai-genmaicha-filler.webp",
  "green-tea-chai": "chai-green-tea-filler.webp",
  "orchard-fresh-chai": "chai-orchard-fresh-filler.webp",
  "cinnamon-bun-rooibos-chai": "chai-cinnamon-bun-rooibos-filler.webp",
  "izmir-chai-spice": "chai-izmir-filler.webp",
  "roasted-mate-chai": "chai-roasted-mate-filler.webp",
  "rooibos-masala-chai": "chai-rooibos-masala-filler.webp",
  "bangalore-rose-chai": "chai-bangalore-rose-filler.webp",
  "cochin-masala-chai": "chai-cochin-masala-filler.webp",
  "guarana-chai": "chai-guarana-filler.webp",
  "indian-spiced-chai": "chai-indian-spiced-filler.webp",
  "kama-sutra-chai": "chai-kama-sutra-filler.webp",
  "lemongrass-chai": "chai-lemongrass-filler.webp",
  "krampus-tea": "rooibos-krampus-tea-filler.webp",
  "rooibos": "rooibos-rooibos-filler.webp",
  "rooibos-almond": "rooibos-rooibos-almond-filler.webp",
  "rooibos-caramel": "rooibos-rooibos-caramel-filler.webp",
  "rooibos-cinnamon-apple": "rooibos-rooibos-cinnamon-apple-filler.webp",
  "rooibos-cinnamon-roll": "rooibos-rooibos-cinnamon-roll-filler.webp",
  "rooibos-cocomint": "rooibos-rooibos-cocomint-filler.webp",
  "rooibos-lemon-cloud": "rooibos-rooibos-lemon-cloud-filler.webp",
  "rooibos-nutcracker": "rooibos-rooibos-nutcracker-filler.webp",
  "rooibos-orange": "rooibos-rooibos-orange-filler.webp",
  "rooibos-peach": "rooibos-rooibos-peach-filler.webp",
  "rooibos-pecan-turtle": "rooibos-rooibos-pecan-turtle-filler.webp",
  "rooibos-vanilla": "rooibos-rooibos-vanilla-filler.webp",
  "white-chocolate-peppermint": "rooibos-white-chocolate-peppermint-filler.webp",
  "always-nuts": "herbal-always-nuts-filler.webp",
  "berry-blast": "herbal-berry-blast-filler.webp",
  "berry-blues": "herbal-berry-blues-filler.webp",
  "berry-creme-compote": "herbal-berry-creme-compote-filler.webp",
  "blood-orange": "herbal-blood-orange-filler.webp",
  "bonfire": "herbal-bonfire-filler.webp",
  "cha-cha": "herbal-cha-cha-filler.webp",
  "chamomile": "herbal-chamomile-filler.webp",
  "chicoriccino": "herbal-chicoriccino-filler.webp",
  "citrus-mate": "herbal-citrus-mate-filler.webp",
  "dewy-cherry": "herbal-dewy-cherry-filler.webp",
  "double-ginger": "herbal-double-ginger-filler.webp",
  "dragon-fruit-dream": "herbal-dragon-fruit-dream-filler.webp",
  "foxtrot": "herbal-foxtrot-filler.webp",
  "fruit-medley": "herbal-fruit-medley-filler.webp",
  "greek-mountain-tea": "herbal-greek-mountain-tea-filler.webp",
  "key-lime-herbal": "herbal-key-lime-herbal-filler.webp",
  "kona-pineapple": "herbal-kona-pineapple-filler.webp",
  "lavender-lemon": "herbal-lavender-lemon-filler.webp",
  "lemongrass": "herbal-lemongrass-filler.webp",
  "lemongrass-ginger": "herbal-lemongrass-ginger-filler.webp",
  "mango-melange": "herbal-mango-melange-filler.webp",
  "mocha-nut-mate": "herbal-mocha-nut-mate-filler.webp",
  "passionfruit-tango": "herbal-passionfruit-tango-filler.webp",
  "peach-bellini": "herbal-peach-bellini-filler.webp",
  "peach-serenity": "herbal-peach-serenity-filler.webp",
  "peppermint": "herbal-peppermint-filler.webp",
  "pina-colada": "herbal-pina-colada-filler.webp",
  "pomegranate-grove": "herbal-pomegranate-grove-filler.webp",
  "raspberry-patch": "herbal-raspberry-patch-filler.webp",
  "samurai-mate": "herbal-samurai-mate-filler.webp",
  "sour-apple": "herbal-sour-apple-filler.webp",
  "spearmint": "herbal-spearmint-filler.webp",
  "strawberry-lemonade": "herbal-strawberry-lemonade-filler.webp",
  "summer-night": "herbal-summer-night-filler.webp",
  "toasted-mate": "herbal-toasted-mate-filler.webp",
  "turmeric-bliss": "herbal-turmeric-bliss-filler.webp",
  "watermelon-cooler": "herbal-watermelon-cooler-filler.webp",
  "wild-strawberry": "herbal-wild-strawberry-filler.webp",
  "yerba-mate": "herbal-yerba-mate-filler.webp",
  "yuletide-toddy": "herbal-yuletide-toddy-filler.webp",
  "chaga-chai": "chai-chaga-chai-filler.webp",
  "chocolate-chai": "chai-chocolate-chai-filler.webp",
  "chocolate-chai-pu-erh": "chai-chocolate-chai-pu-erh-filler.webp",
  "cinnamon-rooibos-chai": "chai-cinnamon-rooibos-chai-filler.webp",
  "golden-turmeric-chai": "chai-golden-turmeric-chai-filler.webp",
  "green-chai": "chai-green-chai-filler.webp",
  "honeybush-pumpkin-chai": "chai-honeybush-pumpkin-chai-filler.webp",
  "masala-chai": "chai-masala-chai-filler.webp",
  "mindful-mint-chai": "chai-mindful-mint-chai-filler.webp",
  "raja-oolong-chai": "chai-raja-oolong-chai-filler.webp",
  "rooibos-vanilla-chai": "chai-rooibos-vanilla-chai-filler.webp",
  "spiced-apple-chai": "chai-spiced-apple-chai-filler.webp",
  "thai-chai": "chai-thai-chai-filler.webp",
  "tri-pepper-chai": "chai-tri-pepper-chai-filler.webp",
  "white-ayurvedic-chai": "chai-white-ayurvedic-chai-filler.webp",
  "white-chai": "chai-white-chai-filler.webp",
  "earl-grey-bella-luna": "earl-grey-bella-luna-filler.webp",
  "earl-grey-bravo": "earl-grey-bravo-filler.webp",
  "earl-grey-green": "earl-grey-green-filler.webp",
  "earl-grey-lavender": "earl-grey-lavender-filler.webp",
  "earl-grey-moonlight": "earl-grey-moonlight-filler.webp",
  "earl-grey-supreme": "earl-grey-supreme-filler.webp",
  "rooibos-earl-grey": "earl-grey-rooibos-filler.webp",
  "white-earl-grey": "earl-grey-white-filler.webp",
  "matcha": "matcha-matcha-filler.webp",
  "matcha-blueberry": "matcha-blueberry-filler.webp",
  "matcha-chocolate": "matcha-chocolate-filler.webp",
  "matcha-cinnamon-apple": "matcha-cinnamon-apple-filler.webp",
  "matcha-mocha": "matcha-mocha-filler.webp",
  "matcha-peach": "matcha-peach-filler.webp",
  "matcha-raspberry": "matcha-raspberry-filler.webp",
  "uji-matcha": "matcha-uji-filler.webp",
  "pu-erh-chorange": "pu-erh-chorange-filler.webp",
  "pu-erh-coffee": "pu-erh-coffee-filler.webp",
  "pu-erh-dante": "pu-erh-dante-filler.webp",
  "pu-erh-hazelberry": "pu-erh-hazelberry-filler.webp",
  "pu-erh-spice": "pu-erh-spice-filler.webp",
  "pu-erh-tahiti": "pu-erh-tahiti-filler.webp",
  "chocolate-macaroon-pu-erh": "pu-erh-chocolate-macaroon-filler.webp",
  "coffee-or-tea-pu-erh": "pu-erh-coffee-or-tea-filler.webp",
  "cream-earl-grey-pu-erh": "pu-erh-cream-earl-grey-filler.webp",
  "creme-brulee-pu-erh": "pu-erh-creme-brulee-filler.webp",
  "ethiopian-mocha-pu-erh": "pu-erh-ethiopian-mocha-filler.webp",
  "french-vanilla-pu-erh": "pu-erh-french-vanilla-filler.webp",
  "pumpkin-spice-pu-erh": "pu-erh-pumpkin-spice-filler.webp",
  "scottish-caramel-pu-erh": "pu-erh-scottish-caramel-filler.webp",
  "british-earl-white": "white-british-earl-filler.webp",
  "cloud-forest-rainbow-white": "white-cloud-forest-rainbow-filler.webp",
  "cream-earl-grey-white": "white-cream-earl-grey-filler.webp",
  "monks-blend-white": "white-monks-blend-filler.webp",
  "oasis-mango-white": "white-oasis-mango-filler.webp",
  "ontario-icewine-white": "white-ontario-icewine-filler.webp",
  "peach-apricot-white": "white-peach-apricot-filler.webp",
  "pomegranate-madagascar-white": "white-pomegranate-madagascar-filler.webp",
  "sakura-cherry-rose-white": "white-sakura-cherry-rose-filler.webp",
  "tangiers-lemon-white": "white-tangiers-lemon-filler.webp",
  "white-guava-guava-and-pomegranate": "white-guava-pomegranate-filler.webp",
  "casablanca-mint": "darjeeling-casablanca-mint-filler.webp",
  "spring-darjeeling": "darjeeling-spring-filler.webp",
  "white-darjeeling": "darjeeling-white-filler.webp",
  "darjeeling-blueberry":"darjeeling-blueberry-filler.webp",
  "darjeeling-cream-earl-grey":"darjeeling-cream-earl-grey-filler.webp",
  "darjeeling-earl-grey":"darjeeling-earl-grey-filler.webp",
  "darjeeling-ginger-peach":"darjeeling-ginger-peach-filler.webp",
  "darjeeling-monks-blend":"darjeeling-monks-blend-filler.webp",
  "darjeeling-peach-apricot":"darjeeling-peach-apricot-filler.webp",
  "darjeeling-strawberry":"darjeeling-strawberry-filler.webp",
  "aquarius": "zodiac-aquarius-filler.webp",
  "aries": "zodiac-aries-filler.webp",
  "cancer": "zodiac-cancer-filler.webp",
  "capricorn": "zodiac-capricorn-filler.webp",
  "gemini": "zodiac-gemini-filler.webp",
  "leo": "zodiac-leo-filler.webp",
  "libra": "zodiac-libra-filler.webp",
  "pisces": "zodiac-pisces-filler.webp",
  "sagittarius": "zodiac-sagittarius-filler.webp",
  "scorpio": "zodiac-scorpio-filler.webp",
  "taurus": "zodiac-taurus-filler.webp",
  "virgo": "zodiac-virgo-filler.webp",
  "decaf-apricot": "decaf-apricot-filler.webp",
  "decaf-blueberry": "decaf-blueberry-filler.webp",
  "decaf-breakfast": "decaf-breakfast-filler.webp",
  "decaf-ceylon": "decaf-ceylon-filler.webp",
  "decaf-chai": "decaf-chai-filler.webp",
  "decaf-chocolate-truffle": "decaf-chocolate-truffle-filler.webp",
  "decaf-cream": "decaf-cream-filler.webp",
  "decaf-earl-grey": "decaf-earl-grey-filler.webp",
  "decaf-hazelnut-cinnamon-creme": "decaf-hazelnut-cinnamon-creme-filler.webp",
  "decaf-mango": "decaf-mango-filler.webp",
  "decaf-orange": "decaf-orange-filler.webp",
  "decaf-peach": "decaf-peach-filler.webp",
  "decaf-raspberry": "decaf-raspberry-filler.webp",
  "decaf-strawberry": "decaf-strawberry-filler.webp",
  "decaf-vanilla": "decaf-vanilla-filler.webp",
  "dandelion-detox": "tea-photos/wellness/dandelion-detox.webp",
  "enertea": "tea-photos/wellness/enertea.webp",
  "focus-pocus": "tea-photos/wellness/focus-pocus.webp",
  "hangover-helper": "tea-photos/wellness/hangover-helper.webp",
  "head-harmony": "tea-photos/wellness/head-harmony.webp",
  "heidi-s-lemon-ginger-tonic": "tea-photos/wellness/heidis-lemon-ginger-tonic.webp",
  "hibiscus-mint": "tea-photos/wellness/hibiscus-mint.webp",
  "jet-lag-awake-herbal": "tea-photos/wellness/jet-lag-awake-herbal.webp",
  "lavender-lemonade": "tea-photos/wellness/lavender-lemonade.webp",
  "lavender-mint": "tea-photos/wellness/lavender-mint.webp",
  "lemon-ginger-cinnamon": "tea-photos/wellness/lemon-ginger-cinnamon.webp",
  "lemon-mate": "tea-photos/wellness/lemon-mate.webp",
  "on-the-waterfront": "tea-photos/wellness/on-the-waterfront.webp",
  "rosemary-mint-eucalyptus": "tea-photos/wellness/rosemary-mint-eucalyptus.webp",
  "sangria": "tea-photos/wellness/sangria.webp",
  "spiced-mullein": "tea-photos/wellness/spiced-mullein.webp",
  "turmeric-solace": "tea-photos/wellness/turmeric-solace.webp",
  "wellness-balance": "tea-photos/wellness/wellness-balance.webp",
  "wellness-energy": "tea-photos/wellness/wellness-energy.webp",
  "wellness-serenity": "tea-photos/wellness/wellness-serenity.webp",
  "apple-ginger-botanical": "tea-photos/wellness/apple-ginger-botanical.webp",
  "ayurvedic-calming": "tea-photos/wellness/ayurvedic-calming.webp",
  "ayurvedic-total-body": "tea-photos/wellness/ayurvedic-total-body.webp",
  "belly-becalm": "tea-photos/wellness/belly-becalm.webp",
  "camomile-lemongrass": "tea-photos/wellness/camomile-lemongrass.webp",
  "camomile-mint": "tea-photos/wellness/camomile-mint.webp",
  "cranberry-bark": "tea-photos/wellness/cranberry-bark.webp",
  "anthony-cleopatra-black-tea-hearts": "tea-photos/wellness/anthony-cleopatra-black-tea-hearts.webp",
  "romeo-juliet-green-tea-hearts": "tea-photos/wellness/romeo-juliet-green-tea-hearts.webp",
  "ginger-turmeric": "tea-photos/wellness/ginger-turmeric.webp",
  "head-to-toes": "tea-photos/wellness/head-to-toes.webp",
  "soothing-roots": "tea-photos/wellness/soothing-roots.webp",
  "tranquil-turmeric": "tea-photos/wellness/tranquil-turmeric.webp",
  "collagen-booster": "tea-photos/wellness/collagen-booster.webp",
  "cucumber-lemon-refresher": "tea-photos/wellness/cucumber-lemon-refresher.webp",
  "golden-glow": "tea-photos/wellness/golden-glow.webp",
  "ayurvedic-purify": "tea-photos/wellness/ayurvedic-purify.webp",
  "cleanse-refresh": "tea-photos/wellness/cleanse-refresh.webp",
  "senna-quick-start": "tea-photos/wellness/senna-quick-start.webp",
  "ylg-nutri-slimming-green-oolong": "tea-photos/wellness/ylg-nutri-slimming-green-oolong.webp",
  "breathe-deep": "tea-photos/wellness/breathe-deep.webp",
  "cold-bgone": "tea-photos/wellness/cold-bgone.webp",
  "cranberry-echinacea": "tea-photos/wellness/cranberry-echinacea.webp",
  "flu-fighter": "tea-photos/wellness/flu-fighter.webp",
  "sick-day": "tea-photos/wellness/sick-day.webp",
  "spicy-ginger-pineapple": "tea-photos/wellness/spicy-ginger-pineapple.webp",
  "zesty-tulsi": "tea-photos/wellness/zesty-tulsi.webp",
  "digestive-blue": "tea-photos/wellness/digestive-blue.webp",
  "gut-feeling": "tea-photos/wellness/gut-feeling.webp",
  "berry-guarana-mate": "tea-photos/wellness/berry-guarana-mate.webp",
  "citrus-blossom": "tea-photos/wellness/citrus-blossom.webp",
  "jet-lag-awake-strawberry": "tea-photos/wellness/jet-lag-awake-strawberry.webp",
  "power-up-citrus-twist": "tea-photos/wellness/power-up-citrus-twist.webp",
  "bamboo-camomile": "tea-photos/wellness/bamboo-camomile.webp",
  "crimson-peach-bloom": "tea-photos/wellness/crimson-peach-bloom.webp",
  "ayurvedic-immune": "tea-photos/wellness/ayurvedic-immune.webp",
  "immunity-berry": "tea-photos/wellness/immunity-berry.webp",
  "huh": "tea-photos/wellness/huh.webp",
  "calming-de-stress": "tea-photos/wellness/calming-de-stress.webp",
  "calming-tulsi": "tea-photos/wellness/calming-tulsi.webp",
  "raspberry-lemon-verbena": "tea-photos/wellness/raspberry-lemon-verbena.webp",
  "stress-less": "tea-photos/wellness/stress-less.webp",
  "mindful-moringa": "tea-photos/wellness/mindful-moringa.webp",
  "lullaby": "tea-photos/wellness/lullaby.webp",
  "poet-s-wellness-vanilla-lavender-tea": "tea-photos/wellness/poets-wellness-vanilla-lavender-tea.webp",
  "sweet-dreams": "tea-photos/wellness/sweet-dreams.webp",
  "womens-flourishing-matrix": "tea-photos/wellness/womens-flourishing-matrix-v3.jpg",
  "40-winks": "wellness-40-winks-filler.webp",
  "breathe-well": "wellness-breathe-well-filler.webp",
  "daydream": "wellness-daydream-filler.webp",
  "elderberry-wine": "wellness-elderberry-wine-filler.webp",
  "great-expectations": "wellness-great-expectations-filler.webp",
  "happy-belly": "wellness-happy-belly-filler.webp",
  "jump-start": "wellness-jump-start-filler.webp",
  "mamma-mia": "wellness-mamma-mia-filler.webp",
  "minty-comfort": "wellness-minty-comfort-filler.webp",
  "moringa": "wellness-moringa-filler.webp",
  "red-tent": "wellness-red-tent-filler.webp",
  "skinny-tea": "wellness-skinny-tea-filler.webp",
  "speedy-recovery": "wellness-speedy-recovery-filler.webp",
  "tea-tox": "wellness-tea-tox-filler.webp",
  "throat-therapy": "wellness-throat-therapy-filler.webp",
  "caribbean-kick": "tea-photos/black/caribbean-kick-macro.webp",
  "across-a-crowded-room": "tea-photos/flavored-black/across-a-crowded-room-styled.webp",
  "alpen-mulled-wine": "tea-photos/flavored-black/alpen-mulled-wine-styled.webp",
  "apple": "tea-photos/flavored-black/apple-styled.webp",
  "apple-spice": "tea-photos/flavored-black/apple-spice-styled.webp",
  "arctic-raspberry": "tea-photos/flavored-black/arctic-raspberry-styled.webp",
  "blarney-blend": "tea-photos/flavored-black/blarney-blend-styled.webp",
  "blood-orange-black-tea": "tea-photos/flavored-black/blood-orange-styled.webp",
  "blue-lady": "tea-photos/flavored-black/blue-lady-styled.webp",
  "boysenberry": "tea-photos/flavored-black/boysenberry-styled.webp",
  "brandied-apple": "tea-photos/flavored-black/brandied-apple-styled.webp",
  "brazilian-guava": "tea-photos/flavored-black/brazilian-guava-styled.webp",
  "buttered-rum": "tea-photos/flavored-black/buttered-rum-styled.webp",
  "canadian-butter-tart": "tea-photos/flavored-black/canadian-butter-tart-styled.webp",
  "caramel-cherry-cheesecake": "tea-photos/flavored-black/caramel-cherry-cheesecake-styled.webp",
  "cardamom": "tea-photos/flavored-black/cardamom-styled.webp",
  "chili-chocolate": "tea-photos/flavored-black/chili-chocolate-styled.webp",
  "chocolate-orange": "tea-photos/flavored-black/chocolate-orange-styled.webp",
  "christmas-blend": "tea-photos/flavored-black/christmas-blend-styled.webp",
  "ciao-amaretto": "tea-photos/flavored-black/ciao-amaretto-styled.webp",
  "clementine-clove": "tea-photos/flavored-black/clementine-clove-styled.webp",
  "cookies-and-cream": "tea-photos/flavored-black/cookies-and-cream-styled.webp",
  "cranberry-orange": "tea-photos/flavored-black/cranberry-orange-styled.webp",
  "elderberry": "tea-photos/flavored-black/elderberry-styled.webp",
  "farmer-s-market-kettle-corn": "tea-photos/flavored-black/farmer-s-market-kettle-corn-styled.webp",
  "frosty-plum-spice": "tea-photos/flavored-black/frosty-plum-spice-styled.webp",
  "peaches-and-cream": "tea-photos/flavored-black/peaches-and-cream-styled.webp",
  "german-gingerbread": "tea-photos/flavored-black/german-gingerbread-styled.webp",
  "ginger-mango": "tea-photos/flavored-black/ginger-mango-styled.webp",
  "grand-marnier": "tea-photos/flavored-black/grand-marnier-styled.webp",
  "harvest-spice": "tea-photos/flavored-black/harvest-spice-styled.webp",
  "hazelnut-vanilla": "tea-photos/flavored-black/hazelnut-vanilla-styled.webp",
  "holiday-winter-spice": "tea-photos/flavored-black/holiday-winter-spice-styled.webp",
  "honey": "tea-photos/flavored-black/honey-styled.webp",
  "icewine": "tea-photos/flavored-black/icewine-styled.webp",
  "irish-cream": "tea-photos/flavored-black/irish-cream-styled.webp",
  "jamaican-rum": "tea-photos/flavored-black/jamaican-rum-styled.webp",
  "key-lime": "tea-photos/flavored-black/key-lime-styled.webp",
  "le-marche-spice": "tea-photos/flavored-black/le-marche-spice-styled.webp",
  "lemon": "tea-photos/flavored-black/lemon-styled.webp",
  "lemon-cake": "tea-photos/flavored-black/lemon-cake-styled.webp",
  "lemon-ginger": "tea-photos/flavored-black/lemon-ginger-styled.webp",
  "licorice": "tea-photos/flavored-black/licorice-styled.webp",
  "mango-mist": "tea-photos/flavored-black/mango-mist-styled.webp",
  "maple-cream": "tea-photos/flavored-black/maple-cream-styled.webp",
  "maple-earl-grey": "tea-photos/flavored-black/maple-earl-grey-styled.webp",
  "maple-peach": "tea-photos/flavored-black/maple-peach-styled.webp",
  "menage-a-tea": "tea-photos/flavored-black/menage-a-tea-styled.webp",
  "monk-s-blend": "tea-photos/flavored-black/monk-s-blend-styled.webp",
  "morning-sunshine": "tea-photos/flavored-black/morning-sunshine-styled.webp",
  "mountain-huckleberry": "tea-photos/flavored-black/mountain-huckleberry-styled.webp",
  "mulled-spice": "tea-photos/flavored-black/mulled-spice-styled.webp",
  "orange-vanilla": "tea-photos/flavored-black/orange-vanilla-styled.webp",
  "papaya": "tea-photos/flavored-black/papaya-styled.webp",
  "pear": "tea-photos/flavored-black/pear-styled.webp",
  "pecan-tart": "tea-photos/flavored-black/pecan-tart-styled.webp",
  "pina-colada-black-tea": "tea-photos/flavored-black/pina-colada-styled.webp",
  "pineapple": "tea-photos/flavored-black/pineapple-styled.webp",
  "pink-grapefruit": "tea-photos/flavored-black/pink-grapefruit-styled.webp",
  "plum-pear": "tea-photos/flavored-black/plum-pear-styled.webp",
  "pomegranate-rosehip": "tea-photos/flavored-black/pomegranate-rosehip-styled.webp",
  "raspberry-honey": "tea-photos/flavored-black/raspberry-honey-styled.webp",
  "rhubarb-cream": "tea-photos/flavored-black/rhubarb-cream-styled.webp",
  "rocky-horror-spice": "tea-photos/flavored-black/rocky-horror-spice-styled.webp",
  "santa-s-milk-plus-cookies": "tea-photos/flavored-black/santa-s-milk-plus-cookies-styled.webp",
  "sasi-hot-ginger": "tea-photos/flavored-black/sasi-hot-ginger-styled.webp",
  "strawberry-daiquiri": "tea-photos/flavored-black/strawberry-daiquiri-styled.webp",
  "strawberry-honey": "tea-photos/flavored-black/strawberry-honey-styled.webp",
  "strawberry-shortcake": "tea-photos/flavored-black/strawberry-shortcake-styled.webp",
  "sugar-shack-smokey-maple": "tea-photos/flavored-black/sugar-shack-smokey-maple-styled.webp",
  "swiss-hot-chocolate": "tea-photos/flavored-black/swiss-hot-chocolate-styled.webp",
  "vanilla-cream": "tea-photos/flavored-black/vanilla-cream-styled.webp",
  "vanilla-lavender-bundt-cake": "tea-photos/flavored-black/vanilla-lavender-bundt-cake-styled.webp",
  "vanilla-and-cinnamon": "tea-photos/flavored-black/vanilla-and-cinnamon-styled.webp",
  "very-merry-cherry": "tea-photos/flavored-black/very-merry-cherry-styled.webp",
  "vienna-eggnog": "tea-photos/flavored-black/vienna-eggnog-styled.webp",
  "white-chocolate-mousse": "tea-photos/flavored-black/white-chocolate-mousse-styled.webp",
  "citrus-sage": "tea-final/citrus-sage-v1.png",
  "rosemary-eucalyptus": "tea-final/rosemary-eucalyptus-v1.png",
};

let currentSeries = "Green Tea";

const seriesFallbackImages = {
  "Black Tea": "black-assam-melody-filler.webp",
  "Green Tea": "citron-green.jpg",
  "Oolong Tea": "oolong-peach-filler.webp",
  "White Tea": "white-peach-filler.webp",
  "Rooibos": "chai-cinnamon-rooibos-chai-filler.webp",
  "Honeybush": "chai-cinnamon-rooibos-chai-filler.webp",
  "Herbal Tea": "herbal-lavender-lemon-filler.webp",
  "Chai": "chai-masala-chai-filler.webp",
  "Earl Grey": "earl-grey-supreme-filler.webp",
  "Matcha": "citron-green.jpg",
  "Pu-Erh Tea": "black-chocolate-filler.webp",
  "Darjeeling": "darjeeling-casablanca-mint-filler.webp",
  "Seasonal Exclusives": "black-candy-cane-filler.webp",
  "Zodiac Collection": "herbal-lavender-lemon-filler.webp",
  "Decaf Tea": "decaf-earl-grey-filler.webp",
  "Wellness": "herbal-lavender-lemon-filler.webp"
};

function showNotice(message) {
  notice.textContent = message;
  notice.classList.add("show");
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => notice.classList.remove("show"), 2600);
}

function formatPrice(value) {
  if (!value || String(value).toUpperCase() === "TBD") return "Temporarily unavailable";
  return String(value).startsWith("$") ? value : "$" + value;
}

function teaImage(tea, detailView = false) {
  const className = detailView ? "detail-photo" : "tea-image";
  const fallback = seriesFallbackImages[tea.series] || "herbal-lavender-lemon-filler.webp";
  const image = detailView && tea.slug === "apricot-green" ? "apricot-green-hero.jpg" : (knownImages[tea.slug] || fallback);
  const imageVersion = image.startsWith("tea-photos/wellness/") ? "?v=2" : "";
  return `<div class="${className}"><img src="assets/${image}${imageVersion}" data-fallback="assets/${fallback}" alt="${tea.name} loose-leaf tea" /></div>`;
}

document.addEventListener("error", event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || !image.dataset.fallback || image.dataset.fallbackApplied) return;
  image.dataset.fallbackApplied = "true";
  image.src = image.dataset.fallback;
}, true);

function availabilityClass(tea) {
  return tea.availability.toLowerCase().includes("season") ? "seasonal" :
    tea.availability.toLowerCase().includes("unavailable") ? "unavailable" : "";
}

function teaHaystack(tea) {
  return [tea.name, tea.series, ...(tea.secondarySeries || []), tea.description, tea.ingredients, tea.flavors.join(" "), tea.search, tea.clarification].join(" ").toLowerCase();
}

function teaBelongsToSeries(tea, series) {
  return tea.series === series || (tea.secondarySeries || []).includes(series);
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
    const total = teas.filter(tea => teaBelongsToSeries(tea, name)).length;
    return `<button type="button" data-series="${name}"><span>${name}</span><small>${total} teas</small></button>`;
  }).join("");
  collectionSeriesGrid.innerHTML = seriesList.map(name => {
    const total = teas.filter(tea => teaBelongsToSeries(tea, name)).length;
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

const cautionSymbols = {allergy: "*", medical: "**", stimulant: "***", dietary: "****"};
const cautionLabels = {allergy: "Allergy concern", medical: "Ingredient note", stimulant: "High caffeine or stimulant ingredients", dietary: "Dietary exception or added sugar"};

function teaCautionMarker(tea) {
  return "";
}

function teaAvailabilityCautionMarker(tea, includeLink = false) {
  const codes = tea.cautionCodes || [];
  if (!codes.length) return "";
  const label = codes.map(code => cautionLabels[code]).join(", ");
  const symbols = codes.map(code => cautionSymbols[code]).join(" ");
  const link = `<button class="disclaimer-jump" type="button" data-open-product-info="${tea.slug}">More information</button>`;
  return `<span class="availability-caution-marker" aria-label="Important product information: ${label}" title="${label}">${symbols}</span>${includeLink ? link : ""}`;
}

function placeNearAnchor(element, anchor, options = {}) {
  const margin = options.margin || 18;
  const anchorRect = anchor?.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  const fallbackLeft = options.fallbackLeft ?? margin;
  const fallbackTop = options.fallbackTop ?? margin;
  let left = fallbackLeft;
  let top = fallbackTop;

  if (anchorRect) {
    left = anchorRect.left + (anchorRect.width - elementRect.width) / 2;
    top = options.below
      ? anchorRect.bottom + 10
      : anchorRect.top - Math.min(options.lift || 110, elementRect.height * .22);

    if (options.below && top + elementRect.height > viewportHeight - margin) {
      top = anchorRect.top - elementRect.height - 10;
    }
  }

  element.style.left = `${Math.max(margin, Math.min(left, viewportWidth - elementRect.width - margin))}px`;
  element.style.top = `${Math.max(margin, Math.min(top, viewportHeight - elementRect.height - margin))}px`;
}

function openProductInfo(tea, anchor = null) {
  const codes = tea.cautionCodes || [];
  const cleanNotice = notice => notice.replace(/^[A-Z][A-Z -]+:\s*/, "");
  const specific = codes.map((code, index) => `<p><b>${cautionSymbols[code]} ${cautionLabels[code]}:</b> ${cleanNotice(tea.cautionNotices[index])}</p>`).join("");
  document.querySelector("#product-info-title").textContent = `${tea.name} — product information`;
  document.querySelector("#product-info-copy").innerHTML = specific;
  const modal = document.querySelector("#product-info-modal");
  const panel = modal.querySelector(".product-info-panel");
  modal.hidden = false;
  requestAnimationFrame(() => placeNearAnchor(panel, anchor, { below: true, margin: 16 }));
}

function teaCautionNotices(tea) {
  const codes = tea.cautionCodes || [];
  const specific = codes.map((code, index) => `<p><b>${cautionLabels[code]}:</b> ${tea.cautionNotices[index]}</p>`).join("");
  return `<details class="ingredient-caution${codes.length ? " has-specific-caution" : ""}"><summary>Important product information</summary><div class="ingredient-caution-list">${specific}<p class="tea-advisory">These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent disease. Review ingredients and consult a healthcare professional when appropriate. <a href="mailto:sugarplumcountry@gmail.com?subject=Tea%20Ingredient%20Question%20-%20${encodeURIComponent(tea.name)}">Questions? Please contact us</a>; we are happy to help you review the product information.</p></div></details>`;
}

function renderCards() {
  const term = search.value.trim().toLowerCase();
  const status = availability.value;
  const results = teas.filter(tea => {
    if (!teaBelongsToSeries(tea, currentSeries)) return false;
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
        <h2>${tea.name}${teaCautionMarker(tea)}</h2>
        <p class="flavors">${tea.flavors.slice(0, 3).join(" · ") || "Artisan loose-leaf tea"}</p>
        <p><span class="badge ${availabilityClass(tea)}">${tea.availability}</span>${teaAvailabilityCautionMarker(tea)}</p>
        <button class="view-tea" type="button" data-slug="${tea.slug}"><span class="desktop-view-label">View Tea</span><span class="mobile-view-label">View details, sizes &amp; pricing</span></button>
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
  const availableRelated = tea.related
    .filter(name => teas.some(item => item.name.toLowerCase() === name.toLowerCase()))
    .slice(0, 3);
  if (availableRelated.length < 3) {
    const flavorWords = new Set(tea.flavors.map(flavor => flavor.toLowerCase()));
    const fallbacks = teas
      .filter(item => item.slug !== tea.slug && !availableRelated.some(name => name.toLowerCase() === item.name.toLowerCase()))
      .map(item => ({
        item,
        score: (teaBelongsToSeries(item, tea.series) ? 4 : 0)
          + item.flavors.filter(flavor => flavorWords.has(flavor.toLowerCase())).length
      }))
      .filter(candidate => candidate.score > 0)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));
    fallbacks.slice(0, 3 - availableRelated.length).forEach(candidate => availableRelated.push(candidate.item.name));
  }
  const cardSeries = teaBelongsToSeries(tea, currentSeries) ? currentSeries : tea.series;
  return `<article class="comparison-card" data-open-tea="${tea.slug}" style="--tea-card-background:url('assets/${seriesCardArtwork[cardSeries] || "victorian-tea-postcard-bg.webp"}')">
    <button class="mobile-back-to-series" type="button" data-close-tea="${tea.slug}">← Back to ${cardSeries}</button>
    <button class="close-tea" type="button" data-close-tea="${tea.slug}" aria-label="Close ${tea.name}">×</button>
    <div class="detail-layout">
      ${teaImage(tea, true)}
      <div class="detail-copy">
        <p class="breadcrumb">Artisan Tea Collection <span>/</span> ${tea.series} <span>/</span> ${tea.name}</p>
        <h2>${tea.name}${teaCautionMarker(tea)}</h2>
        <p class="detail-tags">${tea.series} · ${tea.flavors.slice(0, 3).join(" · ")}</p>
        <p><span class="badge ${availabilityClass(tea)}">${tea.availability}</span>${teaAvailabilityCautionMarker(tea, true)}</p>
        <p class="availability-message"><em>${tea.availability === "Available to Order" ? "Hand-packed in shop. Please allow approximately 3–5 business days for preparation." : tea.message}</em>${tea.return ? `<br><strong>Estimated return: ${tea.return}</strong>` : ""}</p>
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
        <div class="cart-row"><select aria-label="Quantity"><option>1</option><option>2</option><option>3</option></select><button class="add-to-cart" type="button" ${allPricesReady ? "" : "disabled"}>${allPricesReady ? "ADD TO CART" : "TEMPORARILY UNAVAILABLE"}</button><p class="tea-bag-note">Biodegradable tea bags sold separately.<span>Tea accessories coming soon.</span></p></div>
        <div class="related"><h3>Related Teas</h3><div class="related-links">${availableRelated.map(name => `<button type="button" data-related="${name}">${name}</button>`).join("") || "<p>Related selections will be added as the collection grows.</p>"}</div></div>
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

function alignMobileTeaToTop(slug) {
  if (!isMobileTeaUI()) return;
  const dialogTop = Number.parseFloat(dialog.style.getPropertyValue("--mobile-dialog-top")) || 0;
  const resetToProductTop = () => {
    const card = detail.querySelector(`[data-open-tea="${slug}"]`);
    if (!card?.classList.contains("active")) return;
    dialog.scrollTop = 0;
    window.scrollTo({ top: dialogTop, left: 0, behavior: "auto" });
  };

  // Mobile browsers sometimes preserve the position of the tapped catalog
  // button after the product view is inserted. Reset after layout and again
  // after image/layout settling so every tea starts at its photo and title.
  document.activeElement?.blur?.();
  requestAnimationFrame(() => requestAnimationFrame(resetToProductTop));
  window.setTimeout(resetToProductTop, 80);
  window.setTimeout(resetToProductTop, 240);
}

function openTea(slug, updateHash = true, anchor = null) {
  const tea = teas.find(item => item.slug === slug);
  if (!tea) return showNotice("That tea is not in the current website launch collection.");
  if (isMobileTeaUI()) {
    dialog.style.setProperty("--mobile-dialog-top", `${Math.max(0, window.scrollY)}px`);
    document.body.classList.add("mobile-detail-open");
  }
  if (!dialog.open) {
    detail.innerHTML = `<div class="comparison-grid"></div>`;
    dialog.show();
  }
  dialog.classList.remove("parked");
  dialog.classList.remove("minimized");
  comparisonToggle.textContent = "Minimize";
  comparisonToggle.setAttribute("aria-expanded", "true");
  const comparisonGrid = detail.querySelector(".comparison-grid");
  const existing = comparisonGrid.querySelector(`[data-open-tea="${slug}"]`);
  if (!existing) {
    comparisonGrid.insertAdjacentHTML("beforeend", teaDetailCard(tea));
    const added = comparisonGrid.lastElementChild;
    const offset = (comparisonGrid.children.length - 1) * 34;
    placeNearAnchor(added, anchor, { fallbackLeft: 24 + offset, fallbackTop: 18 + offset, lift: 145 });
    refreshTeaTabs();
  } else if (anchor) {
    placeNearAnchor(existing, anchor, { lift: 145 });
  }
  activateTeaCard(slug, updateHash);
  alignMobileTeaToTop(slug);
}

function loadHash() {
  const hash = location.hash.slice(1);
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
  if (button) openTea(button.dataset.slug, true, button);
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
  const productInfo = event.target.closest("[data-open-product-info]");
  if (productInfo) {
    const tea = teas.find(item => item.slug === productInfo.dataset.openProductInfo);
    if (tea) openProductInfo(tea, productInfo);
    return;
  }
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
    dialog.classList.remove("parked");
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
    if (found) openTea(found.slug, true, related); else showNotice("That related tea is not in the current website launch collection.");
  }
});

dialog.querySelector(".close").addEventListener("click", () => dialog.close());
const productInfoModal = document.querySelector("#product-info-modal");
if (productInfoModal) productInfoModal.addEventListener("click", event => {
  if (event.target.matches("[data-close-product-info], .product-info-backdrop")) productInfoModal.hidden = true;
});
comparisonToggle.addEventListener("click", () => {
  const minimized = dialog.classList.toggle("minimized");
  comparisonToggle.textContent = minimized ? "Open Comparison" : "Minimize";
  comparisonToggle.setAttribute("aria-expanded", String(!minimized));
});
dialog.addEventListener("close", () => {
  detail.innerHTML = "";
  dialog.style.removeProperty("--mobile-dialog-top");
  document.body.classList.remove("mobile-detail-open");
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

