// ═══════════════════════════════════════════════════
// PADEN COSMETICS — Product Data
// ═══════════════════════════════════════════════════

const PRODUCTS = [
  // ── Lip Tints ──
  {
    id: 'dark-paradise-lip-tint-12',
    name: 'Dark Paradise Lip Tint',
    shade: 'No 12',
    category: 'lip-tint',
    price: 229,
    originalPrice: 389,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_946c20458f3e05aaa45925e0069bd5c4.jpeg',
    description: 'Yoğun pigmentli, uzun süre kalıcı lip tint. Dudaklarınıza doğal bir renk geçişi sağlar.',
    tags: ['bestseller']
  },
  {
    id: 'west-coast-lip-tint-13',
    name: 'West Coast Lip Tint',
    shade: 'No 13',
    category: 'lip-tint',
    price: 229,
    originalPrice: 389,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_23baffb60f631ff78401ddbf8c47b595.jpeg',
    description: 'Batı sahillerinden ilham alan sıcak tonlu lip tint. Hafif formülü ile gün boyu konfor.',
    tags: []
  },
  {
    id: 'lethe-lip-tint-5',
    name: 'Lethe Lip Tint',
    shade: 'No 5',
    category: 'lip-tint',
    price: 229,
    originalPrice: 389,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_d6597ce67dc1e85dc587bc572529d932.jpeg',
    description: 'Mitolojiden ilham alan, unutulmaz bir renk deneyimi. Kadifemsi dokusu ile dudaklarınızda ipeksi his.',
    tags: []
  },
  {
    id: 'cherry-cola-lip-tint-1',
    name: 'Cherry Cola Lip Tint',
    shade: 'No 1',
    category: 'lip-tint',
    price: 229,
    originalPrice: 389,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_f9f77418a7f0cda8e1cd3f0fda5d352f.jpeg',
    description: 'Klasik kiraz kola tonlarında cesur lip tint. İlk sürüşte yoğun renk payoff.',
    tags: ['bestseller']
  },

  // ── Lipsticks ──
  {
    id: 'coastline-lipstick-130',
    name: 'Coastline Lipstick',
    shade: 'No 130',
    category: 'lipstick',
    price: 299,
    originalPrice: 449,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_23baffb60f631ff78401ddbf8c47b595.jpeg',
    description: 'Kremsi formülü ile dudaklarda pürüzsüz bir görünüm. Sahil esintisi tonlarında sofistike bir renk.',
    tags: []
  },
  {
    id: 'scarlet-lipstick-120',
    name: 'Scarlet Lipstick',
    shade: 'No 120',
    category: 'lipstick',
    price: 299,
    originalPrice: 449,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_3b39ac85f652375e548d821b63e9e900.jpeg',
    description: 'Ateşli kırmızının en cesur tonu. Yoğun pigment, mat bitiş, gün boyu kalıcılık.',
    tags: ['bestseller']
  },
  {
    id: 'katherine-lipstick',
    name: 'Katherine Lipstick',
    shade: '',
    category: 'lipstick',
    price: 299,
    originalPrice: 449,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_4c14bf5b936a99370ceea008c3a43f8b.jpeg',
    description: 'Zamansız bir klasik. Kremsi dokusu ve zengin renk payoff ile her anınıza eşlik eder.',
    tags: []
  },
  {
    id: 'carolina-lipstick',
    name: 'Carolina Lipstick',
    shade: '',
    category: 'lipstick',
    price: 299,
    originalPrice: 449,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_b053faddbb5337f07f5d160e0c3a6a6e.jpeg',
    description: 'Güney güzelliğinden ilham alan sıcak tonlar. Dudaklarda kadifemsi mat bitiş.',
    tags: []
  },
  {
    id: 'bonnie-lipstick',
    name: 'Bonnie Lipstick',
    shade: '',
    category: 'lipstick',
    price: 299,
    originalPrice: 449,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_a56c2065937e659677ab3d1c1bca2818.jpeg',
    description: 'Cesur ve baştan çıkarıcı. İkonik formülü ile kusursuz dudak görünümü.',
    tags: []
  },
  {
    id: 'hekate-siyah-ruj',
    name: 'Hekate Siyah Ruj',
    shade: '',
    category: 'lipstick',
    price: 299,
    originalPrice: 479,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_ae073a94ed9311b39c0adde86c7b3a13.jpeg',
    description: 'Karanlığın tanrıçasından ilham alan cesur siyah ruj. Gotik ruhunuzu yansıtın.',
    tags: ['limited']
  },

  // ── Lip Gloss ──
  {
    id: 'celeste-lip-gloss',
    name: 'Celeste Lip Gloss',
    shade: '',
    category: 'lip-gloss',
    price: 299,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_cbdcce3d80f4d6b80805ad8466fe346b.jpeg',
    description: 'Gökyüzünden ilham alan ışıltılı lip gloss. Yapışkan olmayan formülü ile gün boyu parlaklık.',
    tags: []
  },
  {
    id: 'kirke-lip-gloss',
    name: 'Kirke Lip Gloss',
    shade: '',
    category: 'lip-gloss',
    price: 299,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_ea8a7f3ec366734e5832ed7c0bac5106.jpeg',
    description: 'Büyüleyici parlaklık. Nemlendirici formülü ile dudakları beslerken ışıltı katar.',
    tags: []
  },

  // ── Likit Ruj ──
  {
    id: 'monica-likit-ruj',
    name: 'Monica Likit Ruj',
    shade: '',
    category: 'likit-ruj',
    price: 299,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_d6597ce67dc1e85dc587bc572529d932.jpeg',
    description: 'Ultra mat bitiş, ultra kalıcı formül. Tek sürüşte tam kaplama.',
    tags: []
  },

  // ── Lip & Cheek ──
  {
    id: 'sunny-lip-cheek',
    name: 'Sunny Lip & Cheek',
    shade: '',
    category: 'lip-cheek',
    price: 349,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_f9f77418a7f0cda8e1cd3f0fda5d352f.jpeg',
    description: 'Güneşten öpülmüş gibi doğal bir parlaklık. Hem dudak hem yanak için çok amaçlı kullanım.',
    tags: []
  },
  {
    id: 'kissed-lip-cheek',
    name: 'Kissed Lip & Cheek',
    shade: '',
    category: 'lip-cheek',
    price: 349,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_8f00cd4f314ba9e5bf0b4dfeb8956e5c.jpeg',
    description: 'Öpücük pembesi tonlarında çok amaçlı ürün. Doğal, taze bir görünüm için.',
    tags: []
  },

  // ── Face ──
  {
    id: 'peachy-likit-allik',
    name: 'Peachy Likit Allık',
    shade: '',
    category: 'face',
    price: 299,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_843dfe207e1652b8a2abfd9d82eecb7a.jpeg',
    description: 'Şeftali tonlarında doğal görünümlü likit allık. Kolayca sürülür, doğal bir ışıltı bırakır.',
    tags: []
  },
  {
    id: 'asteria-beyaz-fondoten',
    name: 'Beyaz Fondöten Asteria',
    shade: '',
    category: 'face',
    price: 549,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_92422b58306fe35e2351975c8aa48d60.jpeg',
    description: 'Porselen cilt görünümü için özel formül. Hafif doku, orta-yüksek kapatıcılık.',
    tags: ['new']
  },
  {
    id: 'iconic-concealer',
    name: 'Iconic Concealer',
    shade: '',
    category: 'face',
    price: 299,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_7d5057f527d80fc214684bdcb11444c7.jpeg',
    description: 'Yüksek kapatıcılık, hafif formül. Göz altı ve kusurları anında gizler.',
    tags: []
  },

  // ── Eyes ──
  {
    id: 'allure-far',
    name: 'Allure Far Paleti',
    shade: '',
    category: 'eyes',
    price: 249,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_946c20458f3e05aaa45925e0069bd5c4.jpeg',
    description: 'Büyüleyici renk geçişleri için tasarlanmış far paleti. Mat ve simli tonlar bir arada.',
    tags: []
  },
  {
    id: 'paint-it-black-far',
    name: 'Paint it Black Far',
    shade: '',
    category: 'eyes',
    price: 249,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_06729e2f99e6aecfc5d6b46b9434aec7.jpeg',
    description: 'Yoğun siyah tonlarında dramatik göz makyajı paleti. Smokey eye için ideal.',
    tags: []
  },
  {
    id: 'fairy-dust-far',
    name: 'Fairy Dust Far',
    shade: '',
    category: 'eyes',
    price: 249,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_4aaa147b23595ac9532aa63d71dedebd.jpeg',
    description: 'Peri tozu ışıltısında büyülü far paleti. Işıltılı ve parlak tonlar.',
    tags: ['new']
  },

  // ── Parfüm ──
  {
    id: 'tease-edp-50ml',
    name: 'Tease EDP',
    shade: '50ML',
    category: 'parfum',
    price: 579,
    originalPrice: 899,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_05d001975121d0b77074e6184e135da7.jpeg',
    description: 'Baştan çıkarıcı ve gizemli. Üst notalarda bergamot, orta notalarda yasemin, alt notalarda misk.',
    tags: ['bestseller']
  },
  {
    id: 'flora-333-edp-60ml',
    name: 'Flora 333 EDP',
    shade: '60ML',
    category: 'parfum',
    price: 579,
    originalPrice: 899,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_ff3f6faf92289845f3871ecda863a235.jpeg',
    description: 'Çiçek bahçesinden ilham alan büyüleyici koku. Gül, şakayık ve vanilya notaları.',
    tags: []
  },

  // ── Body Mist ──
  {
    id: 'pure-angel-body-mist',
    name: 'Pure Angel Body Mist',
    shade: '',
    category: 'body-mist',
    price: 389,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_a38a0d3760da53f97003b7b5e8ab9760.jpeg',
    description: 'Hafif ve ferah vücut spreyi. Temiz ve masum notalarla gün boyu tazelik.',
    tags: []
  },
  {
    id: 'blossom-body-mist',
    name: 'Blossom Body Mist',
    shade: '',
    category: 'body-mist',
    price: 389,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_ff3f6faf92289845f3871ecda863a235.jpeg',
    description: 'Bahar çiçeklerinin büyüsü. Hafif ve romantik bir koku deneyimi.',
    tags: []
  },
  {
    id: 'seduce-body-mist',
    name: 'Seduce Body Mist',
    shade: '',
    category: 'body-mist',
    price: 389,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_c649f404637595dcb2c24543266a8029.jpeg',
    description: 'Baştan çıkarıcı ve yoğun. Gece çıkışları için mükemmel bir koku.',
    tags: []
  },

  // ── Sets & Specials ──
  {
    id: 'lana-del-rey-lip-tint-set',
    name: "4'lü Lana Del Rey Lip Tint Seti",
    shade: '',
    category: 'set',
    price: 879,
    originalPrice: 1556,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_de9b71522998ce4debd1125900f80c8b.jpeg',
    description: 'En sevilen 4 lip tint bir arada. Lana Del Rey ilhamıyla özel koleksiyon.',
    tags: ['bestseller', 'limited']
  },
  {
    id: 'gotik-advent-takvimi',
    name: 'Gotik Advent Takvimi',
    shade: '',
    category: 'set',
    price: 2500,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_fa5dab22a5bc6f190dd44c9be919b4e0.jpeg',
    description: 'Karanlık ve büyüleyici advent takvimi. Her gün yeni bir sürpriz kozmetik ürün.',
    tags: ['limited']
  },
  {
    id: 'advent-takvimi',
    name: 'Advent Takvimi',
    shade: '',
    category: 'set',
    price: 2500,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_de9b71522998ce4debd1125900f80c8b.jpeg',
    description: 'Klasik advent takvimi. 24 gün boyunca sürpriz kozmetik ürünlerle dolu.',
    tags: ['limited']
  },
  {
    id: 'parfum-advent-takvimi',
    name: 'Parfüm Advent Takvimi',
    shade: '',
    category: 'set',
    price: 1549,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_05d001975121d0b77074e6184e135da7.jpeg',
    description: 'Koku tutkunları için özel advent takvimi. Mini parfümlerle dolu büyüleyici takvim.',
    tags: ['limited']
  },
  {
    id: 'avantajli-hediye-kutusu',
    name: 'Avantajlı Hediye Kutusu',
    shade: '',
    category: 'set',
    price: 1750,
    originalPrice: null,
    image: 'https://cdn.shopier.app/pictures_mid/padenscosmetics_04db6e41fe637fcffa76425377c5a2f4.jpeg',
    description: 'En sevilen ürünlerden oluşan özel hediye kutusu. Sevdiklerinize mükemmel bir hediye.',
    tags: []
  }
];

// Category labels for display
const CATEGORY_LABELS = {
  'lip-tint': 'Lip Tint',
  'lipstick': 'Ruj',
  'lip-gloss': 'Lip Gloss',
  'likit-ruj': 'Likit Ruj',
  'lip-cheek': 'Lip & Cheek',
  'face': 'Yüz',
  'eyes': 'Göz',
  'parfum': 'Parfüm',
  'body-mist': 'Body Mist',
  'set': 'Set & Özel'
};
