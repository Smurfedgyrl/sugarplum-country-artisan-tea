const catalog = window.TEA_CATALOG;
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
  "hojicha-chocolate": "metro-green/hojicha-chocolate.webp",
  "atlantico-lime": "metro-green/atlantico-lime.webp",
  "blackcurrant-cassis": "metro-green/blackcurrant-cassis.webp",
  "blue-mango": "metro-green/blue-mango.webp",
  "blue-suede-shoes": "metro-green/blue-suede-shoes.webp",
  "bohemian-raspberry": "metro-green/bohemian-raspberry.webp",
  "caramel-apple-crumble": "metro-green/caramel-apple-crumble.webp",
  "cinnamon-sibu": "metro-green/cinnamon-sibu.webp",
  "coconut-dream": "metro-green/coconut-dream.webp",
  "crime-of-passion": "metro-green/crime-of-passion.webp",
  "cucumber-melon-green": "metro-green/cucumber-melon-green.webp",
  "golden-apple-spice": "metro-green/golden-apple-spice.webp",
  "granny-green-apple": "metro-green/granny-green-apple.webp",
  "guava-comoros": "metro-green/guava-comoros.webp",
  "island-earl-grey": "metro-green/island-earl-grey.webp",
  "key-lime-pie": "metro-green/key-lime-pie.webp",
  "long-island-strawberry": "metro-green/long-island-strawberry.webp",
  "sencha-kyoto-cherry-rose": "metro-green/sencha-kyoto-cherry-rose.webp",
  "shanghai-lychee-jasmine": "metro-green/shanghai-lychee-jasmine.webp",
  "tamarind-lychee-green": "metro-green/tamarind-lychee-green.webp",
  "vanilla-pumpkin-swirl": "metro-green/vanilla-pumpkin-swirl.webp",
  "watermelon-lime": "metro-green/watermelon-lime.webp",
  "blueberry-green": "metro-green/blueberry-green.webp",
  "blueberry-pie": "metro-green/blueberry-pie.webp",
  "cream-earl-grey-green": "metro-green/cream-earl-grey-green.webp",
  "earl-grey-green": "metro-green/earl-grey-green.webp",
  "irish-eyes-green-tea": "metro-green/irish-eyes-green-tea.webp",
  "lemon-green": "metro-green/lemon-green.webp",
  "maple-green": "metro-green/maple-green.webp",
  "monk-s-blend-green": "metro-green/monks-blend-green.webp",
  "pomegranate-hibiscus": "metro-green/pomegranate-hibiscus.webp",
  "strawberry-green": "metro-green/strawberry-green.webp",
  "vanilla-bean-dream": "metro-green/vanilla-bean-dream.webp",
  "almond": "adagio-black-refresh/almond-macro.webp",
  "apricot": "adagio-black-refresh/apricot-macro.webp",
  "april-in-paris": "adagio-black-refresh/april-in-paris-macro.webp",
  "assam-harmony": "adagio-black-refresh/assam-harmony-macro.webp",
  "assam-melody": "adagio-black-refresh/assam-melody-macro.webp",
  "black-cherry": "adagio-black-refresh/black-cherry-macro.webp",
  "black-forest-cake": "adagio-black-refresh/black-forest-cake-macro.webp",
  "black-jasmine-song": "adagio-black-refresh/black-jasmine-song-macro.webp",
  "blackberry": "adagio-black-refresh/blackberry-macro.webp",
  "blueberry": "adagio-black-refresh/blueberry-macro.webp",
  "brigadoon-breakfast": "adagio-black-refresh/brigadoon-breakfast-macro.webp",
  "butterscotch": "adagio-black-refresh/butterscotch-macro.webp",
  "campfire-s-mores": "adagio-black-refresh/campfire-s-mores-macro.webp",
  "candy-apple": "adagio-black-refresh/candy-apple-macro.webp",
  "candy-cane": "adagio-black-refresh/candy-cane-macro.webp",
  "caramel": "adagio-black-refresh/caramel-macro.webp",
  "caramel-cr-me-br-l-e": "adagio-black-refresh/caramel-creme-brulee-macro.webp",
  "ceylon-sonata": "adagio-black-refresh/ceylon-sonata-macro.webp",
  "chocolate": "adagio-black-refresh/chocolate-macro.webp",
  "chocolate-chip": "adagio-black-refresh/chocolate-chip-macro.webp",
  "chocolate-truffle": "adagio-black-refresh/chocolate-truffle-macro.webp",
  "christmas": "adagio-black-refresh/christmas-macro.webp",
  "cinnamon": "adagio-black-refresh/cinnamon-macro.webp",
  "coconut": "adagio-black-refresh/coconut-macro.webp",
  "cranberry": "adagio-black-refresh/cranberry-macro.webp",
  "cream": "adagio-black-refresh/cream-macro.webp",
  "currant": "adagio-black-refresh/currant-macro.webp",
  "english-breakfast": "adagio-black-refresh/english-breakfast-macro.webp",
  "forest-berries": "adagio-black-refresh/forest-berries-macro.webp",
  "ginger-peach": "adagio-black-refresh/ginger-peach-macro.webp",
  "gingerbread": "adagio-black-refresh/gingerbread-macro.webp",
  "grapefruit": "adagio-black-refresh/grapefruit-macro.webp",
  "half-caff-brekkie": "adagio-black-refresh/half-caff-brekkie-macro.webp",
  "hazelnut": "adagio-black-refresh/hazelnut-macro.webp",
  "hibiscus": "adagio-black-refresh/hibiscus-macro.webp",
  "irish-breakfast": "adagio-black-refresh/irish-breakfast-macro.webp",
  "kentucky-bourbon": "adagio-black-refresh/kentucky-bourbon-macro.webp",
  "kringles-krush": "adagio-black-refresh/kringles-krush-macro.webp",
  "lapsang-souchong": "adagio-black-refresh/lapsang-souchong-macro.webp",
  "lemon-soleil": "adagio-black-refresh/lemon-soleil-macro.webp",
  "mango": "adagio-black-refresh/mango-macro.webp",
  "orange": "adagio-black-refresh/orange-macro.webp",
  "orange-spice": "adagio-black-refresh/orange-spice-macro.webp",
  "passionfruit": "adagio-black-refresh/passionfruit-macro.webp",
  "peach": "adagio-black-refresh/peach-macro.webp",
  "pumpkin-spice": "adagio-black-refresh/pumpkin-spice-macro.webp",
  "raspberry": "adagio-black-refresh/raspberry-macro.webp",
  "scottish-breakfast": "adagio-black-refresh/scottish-breakfast-macro.webp",
  "strawberry": "adagio-black-refresh/strawberry-macro.webp",
  "summer-rose": "adagio-black-refresh/summer-rose-macro.webp",
  "sweet-cinnamon-spice": "adagio-black-refresh/sweet-cinnamon-spice-macro.webp",
  "sweet-potato-pie": "adagio-black-refresh/sweet-potato-pie-macro.webp",
  "thai-tea": "adagio-black-refresh/thai-tea-macro.webp",
  "tiger-eye": "adagio-black-refresh/tiger-eye-macro.webp",
  "valentines": "adagio-black-refresh/valentines-macro.webp",
  "vanilla": "adagio-black-refresh/vanilla-macro.webp",
  "chestnut": "adagio-black-refresh/chestnut-macro.webp",
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
  "earl-grey-rooibos": "rooibos-earl-grey-metro-approved.png",
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
  "nutcracker": "rooibos-nutcracker-metro-approved.png",
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
  "dandelion-detox": "metro-wellness/dandelion-detox.webp",
  "enertea": "metro-wellness/enertea.webp",
  "focus-pocus": "metro-wellness/focus-pocus.webp",
  "hangover-helper": "metro-wellness/hangover-helper.webp",
  "head-harmony": "metro-wellness/head-harmony.webp",
  "heidi-s-lemon-ginger-tonic": "metro-wellness/heidis-lemon-ginger-tonic.webp",
  "hibiscus-mint": "metro-wellness/hibiscus-mint.webp",
  "jet-lag-awake-herbal": "metro-wellness/jet-lag-awake-herbal.webp",
  "lavender-lemonade": "metro-wellness/lavender-lemonade.webp",
  "lavender-mint": "metro-wellness/lavender-mint.webp",
  "lemon-ginger-cinnamon": "metro-wellness/lemon-ginger-cinnamon.webp",
  "lemon-mate": "metro-wellness/lemon-mate.webp",
  "on-the-waterfront": "metro-wellness/on-the-waterfront.webp",
  "rosemary-mint-eucalyptus": "metro-wellness/rosemary-mint-eucalyptus.webp",
  "sangria": "metro-wellness/sangria.webp",
  "spiced-mullein": "metro-wellness/spiced-mullein.webp",
  "turmeric-solace": "metro-wellness/turmeric-solace.webp",
  "wellness-balance": "metro-wellness/wellness-balance.webp",
  "wellness-energy": "metro-wellness/wellness-energy.webp",
  "wellness-serenity": "metro-wellness/wellness-serenity.webp",
  "apple-ginger-botanical": "metro-wellness/apple-ginger-botanical.webp",
  "ayurvedic-calming": "metro-wellness/ayurvedic-calming.webp",
  "ayurvedic-total-body": "metro-wellness/ayurvedic-total-body.webp",
  "belly-becalm": "metro-wellness/belly-becalm.webp",
  "camomile-lemongrass": "metro-wellness/camomile-lemongrass.webp",
  "camomile-mint": "metro-wellness/camomile-mint.webp",
  "cranberry-bark": "metro-wellness/cranberry-bark.webp",
  "anthony-cleopatra-black-tea-hearts": "metro-wellness/anthony-cleopatra-black-tea-hearts.webp",
  "romeo-juliet-green-tea-hearts": "metro-wellness/romeo-juliet-green-tea-hearts.webp",
  "ginger-turmeric": "metro-wellness/ginger-turmeric.webp",
  "head-to-toes": "metro-wellness/head-to-toes.webp",
  "soothing-roots": "metro-wellness/soothing-roots.webp",
  "tranquil-turmeric": "metro-wellness/tranquil-turmeric.webp",
  "collagen-booster": "metro-wellness/collagen-booster.webp",
  "cucumber-lemon-refresher": "metro-wellness/cucumber-lemon-refresher.webp",
  "golden-glow": "metro-wellness/golden-glow.webp",
  "ayurvedic-purify": "metro-wellness/ayurvedic-purify.webp",
  "cleanse-refresh": "metro-wellness/cleanse-refresh.webp",
  "senna-quick-start": "metro-wellness/senna-quick-start.webp",
  "ylg-nutri-slimming-green-oolong": "metro-wellness/ylg-nutri-slimming-green-oolong.webp",
  "breathe-deep": "metro-wellness/breathe-deep.webp",
  "cold-bgone": "metro-wellness/cold-bgone.webp",
  "cranberry-echinacea": "metro-wellness/cranberry-echinacea.webp",
  "flu-fighter": "metro-wellness/flu-fighter.webp",
  "sick-day": "metro-wellness/sick-day.webp",
  "spicy-ginger-pineapple": "metro-wellness/spicy-ginger-pineapple.webp",
  "zesty-tulsi": "metro-wellness/zesty-tulsi.webp",
  "digestive-blue": "metro-wellness/digestive-blue.webp",
  "gut-feeling": "metro-wellness/gut-feeling.webp",
  "berry-guarana-mate": "metro-wellness/berry-guarana-mate.webp",
  "citrus-blossom": "metro-wellness/citrus-blossom.webp",
  "jet-lag-awake-strawberry": "metro-wellness/jet-lag-awake-strawberry.webp",
  "power-up-citrus-twist": "metro-wellness/power-up-citrus-twist.webp",
  "bamboo-camomile": "metro-wellness/bamboo-camomile.webp",
  "crimson-peach-bloom": "metro-wellness/crimson-peach-bloom.webp",
  "ayurvedic-immune": "metro-wellness/ayurvedic-immune.webp",
  "immunity-berry": "metro-wellness/immunity-berry.webp",
  "huh": "metro-wellness/huh.webp",
  "calming-de-stress": "metro-wellness/calming-de-stress.webp",
  "calming-tulsi": "metro-wellness/calming-tulsi.webp",
  "raspberry-lemon-verbena": "metro-wellness/raspberry-lemon-verbena.webp",
  "stress-less": "metro-wellness/stress-less.webp",
  "mindful-moringa": "metro-wellness/mindful-moringa.webp",
  "lullaby": "metro-wellness/lullaby.webp",
  "poets-wellness-vanilla-lavender-tea": "metro-wellness/poets-wellness-vanilla-lavender-tea.webp",
  "sweet-dreams": "metro-wellness/sweet-dreams.webp",
  "womens-flourishing-matrix": "metro-wellness/womens-flourishing-matrix-v3.jpg",
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
  "caribbean-kick": "adagio-black-refresh/caribbean-kick-macro.webp",
  "across-a-crowded-room": "metro-flavored-black/across-a-crowded-room-styled.webp",
  "alpen-mulled-wine": "metro-flavored-black/alpen-mulled-wine-styled.webp",
  "apple": "metro-flavored-black/apple-styled.webp",
  "apple-spice": "metro-flavored-black/apple-spice-styled.webp",
  "arctic-raspberry": "metro-flavored-black/arctic-raspberry-styled.webp",
  "blarney-blend": "metro-flavored-black/blarney-blend-styled.webp",
  "blood-orange-black-tea": "metro-flavored-black/blood-orange-styled.webp",
  "blue-lady": "metro-flavored-black/blue-lady-styled.webp",
  "boysenberry": "metro-flavored-black/boysenberry-styled.webp",
  "brandied-apple": "metro-flavored-black/brandied-apple-styled.webp",
  "brazilian-guava": "metro-flavored-black/brazilian-guava-styled.webp",
  "buttered-rum": "metro-flavored-black/buttered-rum-styled.webp",
  "canadian-butter-tart": "metro-flavored-black/canadian-butter-tart-styled.webp",
  "caramel-cherry-cheesecake": "metro-flavored-black/caramel-cherry-cheesecake-styled.webp",
  "cardamom": "metro-flavored-black/cardamom-styled.webp",
  "chili-chocolate": "metro-flavored-black/chili-chocolate-styled.webp",
  "chocolate-orange": "metro-flavored-black/chocolate-orange-styled.webp",
  "christmas-blend": "metro-flavored-black/christmas-blend-styled.webp",
  "ciao-amaretto": "metro-flavored-black/ciao-amaretto-styled.webp",
  "clementine-clove": "metro-flavored-black/clementine-clove-styled.webp",
  "cookies-and-cream": "metro-flavored-black/cookies-and-cream-styled.webp",
  "cranberry-orange": "metro-flavored-black/cranberry-orange-styled.webp",
  "elderberry": "metro-flavored-black/elderberry-styled.webp",
  "farmer-s-market-kettle-corn": "metro-flavored-black/farmer-s-market-kettle-corn-styled.webp",
  "frosty-plum-spice": "metro-flavored-black/frosty-plum-spice-styled.webp",
  "peaches-and-cream": "metro-flavored-black/peaches-and-cream-styled.webp",
  "german-gingerbread": "metro-flavored-black/german-gingerbread-styled.webp",
  "ginger-mango": "metro-flavored-black/ginger-mango-styled.webp",
  "grand-marnier": "metro-flavored-black/grand-marnier-styled.webp",
  "harvest-spice": "metro-flavored-black/harvest-spice-styled.webp",
  "hazelnut-vanilla": "metro-flavored-black/hazelnut-vanilla-styled.webp",
  "holiday-winter-spice": "metro-flavored-black/holiday-winter-spice-styled.webp",
  "honey": "metro-flavored-black/honey-styled.webp",
  "icewine": "metro-flavored-black/icewine-styled.webp",
  "irish-cream": "metro-flavored-black/irish-cream-styled.webp",
  "jamaican-rum": "metro-flavored-black/jamaican-rum-styled.webp",
  "key-lime": "metro-flavored-black/key-lime-styled.webp",
  "le-marche-spice": "metro-flavored-black/le-marche-spice-styled.webp",
  "lemon": "metro-flavored-black/lemon-styled.webp",
  "lemon-cake": "metro-flavored-black/lemon-cake-styled.webp",
  "lemon-ginger": "metro-flavored-black/lemon-ginger-styled.webp",
  "licorice": "metro-flavored-black/licorice-styled.webp",
  "mango-mist": "metro-flavored-black/mango-mist-styled.webp",
  "maple-cream": "metro-flavored-black/maple-cream-styled.webp",
  "maple-earl-grey": "metro-flavored-black/maple-earl-grey-styled.webp",
  "maple-peach": "metro-flavored-black/maple-peach-styled.webp",
  "menage-a-tea": "metro-flavored-black/menage-a-tea-styled.webp",
  "monk-s-blend": "metro-flavored-black/monk-s-blend-styled.webp",
  "morning-sunshine": "metro-flavored-black/morning-sunshine-styled.webp",
  "mountain-huckleberry": "metro-flavored-black/mountain-huckleberry-styled.webp",
  "mulled-spice": "metro-flavored-black/mulled-spice-styled.webp",
  "orange-vanilla": "metro-flavored-black/orange-vanilla-styled.webp",
  "papaya": "metro-flavored-black/papaya-styled.webp",
  "pear": "metro-flavored-black/pear-styled.webp",
  "pecan-tart": "metro-flavored-black/pecan-tart-styled.webp",
  "pina-colada-black-tea": "metro-flavored-black/pina-colada-styled.webp",
  "pineapple": "metro-flavored-black/pineapple-styled.webp",
  "pink-grapefruit": "metro-flavored-black/pink-grapefruit-styled.webp",
  "plum-pear": "metro-flavored-black/plum-pear-styled.webp",
  "pomegranate-rosehip": "metro-flavored-black/pomegranate-rosehip-styled.webp",
  "raspberry-honey": "metro-flavored-black/raspberry-honey-styled.webp",
  "rhubarb-cream": "metro-flavored-black/rhubarb-cream-styled.webp",
  "rocky-horror-spice": "metro-flavored-black/rocky-horror-spice-styled.webp",
  "santa-s-milk-plus-cookies": "metro-flavored-black/santa-s-milk-plus-cookies-styled.webp",
  "sasi-hot-ginger": "metro-flavored-black/sasi-hot-ginger-styled.webp",
  "strawberry-daiquiri": "metro-flavored-black/strawberry-daiquiri-styled.webp",
  "strawberry-honey": "metro-flavored-black/strawberry-honey-styled.webp",
  "strawberry-shortcake": "metro-flavored-black/strawberry-shortcake-styled.webp",
  "sugar-shack-smokey-maple": "metro-flavored-black/sugar-shack-smokey-maple-styled.webp",
  "swiss-hot-chocolate": "metro-flavored-black/swiss-hot-chocolate-styled.webp",
  "vanilla-cream": "metro-flavored-black/vanilla-cream-styled.webp",
  "vanilla-lavender-bundt-cake": "metro-flavored-black/vanilla-lavender-bundt-cake-styled.webp",
  "vanilla-and-cinnamon": "metro-flavored-black/vanilla-and-cinnamon-styled.webp",
  "very-merry-cherry": "metro-flavored-black/very-merry-cherry-styled.webp",
  "vienna-eggnog": "metro-flavored-black/vienna-eggnog-styled.webp",
  "white-chocolate-mousse": "metro-flavored-black/white-chocolate-mousse-styled.webp",
  "citrus-sage": "tea-final/citrus-sage-v1.png",
  "rosemary-eucalyptus": "tea-final/rosemary-eucalyptus-v1.png",
  "poet-s-wellness-vanilla-lavender-tea": "herbal-lavender-lemon-filler.webp"
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
  const imageVersion = image.startsWith("metro-wellness/") ? "?v=1" : "";
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
  const cardSeries = teaBelongsToSeries(tea, currentSeries) ? currentSeries : tea.series;
  return `<article class="comparison-card" data-open-tea="${tea.slug}" style="--tea-card-background:url('assets/${seriesCardArtwork[cardSeries] || "victorian-tea-postcard-bg.webp"}')">
    <div class="drag-handle" aria-label="Drag this tea card">Drag to compare</div>
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

function openTea(slug, updateHash = true, anchor = null) {
  const tea = teas.find(item => item.slug === slug);
  if (!tea) return showNotice("That tea is not in the current website launch collection.");
  if (!dialog.open) {
    detail.innerHTML = `<div class="comparison-grid"></div><div class="open-teas-tray"><button class="open-teas-toggle" type="button" aria-expanded="false">Open teas</button><div class="comparison-tabs" role="tablist" aria-label="Open tea cards"></div></div>`;
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

document.addEventListener("click", event => {
  if (!dialog.open || dialog.classList.contains("parked")) return;
  if (event.target.closest(".comparison-card, .product-info-modal, .open-teas-tray")) return;
  const activeCard = detail.querySelector(".comparison-card.active");
  const tray = detail.querySelector(".open-teas-tray");
  if (activeCard && tray) {
    const rect = activeCard.getBoundingClientRect();
    tray.style.left = `${Math.max(18, rect.right - 180)}px`;
    tray.style.top = `${Math.max(18, rect.top + 12)}px`;
  }
  dialog.classList.add("parked");
}, true);

seriesMenu.addEventListener("click", event => {
  const button = event.target.closest("[data-series]");
  if (button) chooseSeries(button.dataset.series);
});
collectionSeriesGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-series]");
  if (button) chooseSeries(button.dataset.series);
});
detail.addEventListener("click", event => {
  const openTeasToggle = event.target.closest(".open-teas-toggle");
  if (openTeasToggle) {
    const tray = openTeasToggle.closest(".open-teas-tray");
    const expanded = tray.classList.toggle("expanded");
    openTeasToggle.setAttribute("aria-expanded", String(expanded));
    return;
  }
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
    teaTab.closest(".open-teas-tray")?.classList.remove("expanded");
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

let dragState = null;
detail.addEventListener("pointerdown", event => {
  const card = event.target.closest(".comparison-card");
  const handle = event.target.closest(".drag-handle");
  if (!card || !handle || (event.button !== undefined && event.button !== 0)) return;
  const rect = card.getBoundingClientRect();
  dragState = {
    card,
    pointerId: event.pointerId,
    dx: event.clientX - rect.left,
    dy: event.clientY - rect.top
  };
  handle.setPointerCapture?.(event.pointerId);
  activateTeaCard(card.dataset.openTea);
  card.classList.add("dragging");
  event.preventDefault();
  event.stopPropagation();
});
window.addEventListener("pointermove", event => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  const {card, dx, dy} = dragState;
  const maxLeft = Math.max(0, window.innerWidth - card.offsetWidth);
  const maxTop = Math.max(0, window.innerHeight - card.offsetHeight);
  card.style.left = `${Math.max(0, Math.min(maxLeft, event.clientX - dx))}px`;
  card.style.top = `${Math.max(0, Math.min(maxTop, event.clientY - dy))}px`;
  event.preventDefault();
}, true);
function finishCardDrag(event) {
  if (!dragState || (event.pointerId !== undefined && event.pointerId !== dragState.pointerId)) return;
  dragState.card.classList.remove("dragging");
  dragState = null;
}
window.addEventListener("pointerup", finishCardDrag, true);
window.addEventListener("pointercancel", finishCardDrag, true);

// The catalog is embedded in Wix. Clicking the surrounding site moves focus
// outside this frame, so park the open card just as an ordinary window falls
// behind the page. Its Open teas tray remains available for restoration.
window.addEventListener("blur", () => {
  if (!dialog.open || dialog.classList.contains("parked") || dragState) return;
  dialog.classList.add("parked");
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

