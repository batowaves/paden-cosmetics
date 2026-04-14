// ═══════════════════════════════════════════════════
// PADEN COSMETICS — Main Application
// ═══════════════════════════════════════════════════

(function() {
  'use strict';

  // ── Cart State ──
  let cart = JSON.parse(localStorage.getItem('paden-cart') || '[]');

  function saveCart() {
    localStorage.setItem('paden-cart', JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: product.id, qty: 1 });
    }
    saveCart();
    openCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');
    const itemsEl = document.getElementById('cartItems');
    if (!countEl) return;

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalItems > 0 ? totalItems : '';

    if (totalEl) {
      totalEl.textContent = '\u20BA' + getCartTotal().toLocaleString('tr-TR');
    }

    if (itemsEl) {
      if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="cart-empty">Sepetiniz bo\u015F</div>';
      } else {
        itemsEl.innerHTML = cart.map(item => {
          const p = PRODUCTS.find(pr => pr.id === item.id);
          if (!p) return '';
          return `
            <div class="cart-item">
              <div class="cart-item-image">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
              </div>
              <div class="cart-item-info">
                <div class="cart-item-name">${p.name}</div>
                <div class="cart-item-variant">${p.shade || CATEGORY_LABELS[p.category] || ''} &times; ${item.qty}</div>
                <div class="cart-item-price">\u20BA${(p.price * item.qty).toLocaleString('tr-TR')}</div>
                <button class="cart-item-remove" data-id="${p.id}">Kald\u0131r</button>
              </div>
            </div>
          `;
        }).join('');

        itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
          btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });
      }
    }
  }

  // ── Cart Drawer ──
  function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('cartToggle')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);

  // ── Sticky Header ──
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile Menu ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
    });
  }

  // ── Scroll Reveal ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Product Card Renderer ──
  function renderProductCard(product) {
    const discount = product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

    let badges = '';
    if (discount > 0) badges += '<span class="badge badge-sale">-' + discount + '%</span>';
    if (product.tags.includes('new')) badges += '<span class="badge badge-new">Yeni</span>';
    if (product.tags.includes('limited')) badges += '<span class="badge badge-limited">Limited</span>';
    if (product.tags.includes('bestseller')) badges += '<span class="badge badge-bestseller">\u2605 Best</span>';

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-card-badge">${badges}</div>
          <div class="product-card-quick">
            <button class="quick-add-btn" data-id="${product.id}">Sepete Ekle</button>
          </div>
        </div>
        <div class="product-card-info">
          <div class="product-card-category">${CATEGORY_LABELS[product.category] || product.category}</div>
          <div class="product-card-name">${product.name}</div>
          ${product.shade ? '<div class="product-card-shade">' + product.shade + '</div>' : ''}
          <div class="product-card-price">
            <span class="price-current">\u20BA${product.price.toLocaleString('tr-TR')}</span>
            ${product.originalPrice ? '<span class="price-original">\u20BA' + product.originalPrice.toLocaleString('tr-TR') + '</span>' : ''}
            ${discount > 0 ? '<span class="price-discount">-' + discount + '%</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ── Homepage: Render Products + Filters ──
  const productGrid = document.getElementById('productGrid');
  const filterBar = document.getElementById('filterBar');

  if (productGrid && filterBar) {
    // Build filter buttons
    const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];
    filterBar.innerHTML = categories.map(cat => {
      const label = cat === 'all' ? 'T\u00FCm\u00FC' : (CATEGORY_LABELS[cat] || cat);
      return `<button class="filter-btn${cat === 'all' ? ' active' : ''}" data-filter="${cat}">${label}</button>`;
    }).join('');

    let activeFilter = 'all';

    function renderGrid() {
      const filtered = activeFilter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeFilter);

      productGrid.innerHTML = filtered.map(renderProductCard).join('');

      // Click handlers for cards
      productGrid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.quick-add-btn')) return;
          window.location.href = 'product.html?id=' + card.dataset.id;
        });
      });

      // Quick-add buttons
      productGrid.querySelectorAll('.quick-add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const product = PRODUCTS.find(p => p.id === btn.dataset.id);
          if (product) addToCart(product);
        });
      });
    }

    // Filter click handlers
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderGrid();
    });

    // Footer category links
    document.querySelectorAll('[data-filter]').forEach(link => {
      if (link.closest('.filter-bar')) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        activeFilter = link.dataset.filter;
        filterBar.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.filter === activeFilter);
        });
        renderGrid();
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    renderGrid();
  }

  // ── Product Detail Page ──
  const detailContainer = document.getElementById('productDetail');
  if (detailContainer) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = PRODUCTS.find(p => p.id === productId);

    if (product) {
      document.title = product.name + ' \u2014 Paden Cosmetics';

      const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

      detailContainer.innerHTML = `
        <div class="product-detail-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div>
          <div class="breadcrumb">
            <a href="/">Ana Sayfa</a>
            <span class="sep">/</span>
            <a href="/#products">\u00DCr\u00FCnler</a>
            <span class="sep">/</span>
            <span>${product.name}</span>
          </div>
          <div class="detail-category">${CATEGORY_LABELS[product.category] || product.category}</div>
          <h1 class="detail-name font-display">${product.name}</h1>
          ${product.shade ? '<p class="detail-shade">' + product.shade + '</p>' : ''}
          <div class="detail-price">
            <span class="price-current">\u20BA${product.price.toLocaleString('tr-TR')}</span>
            ${product.originalPrice ? '<span class="price-original">\u20BA' + product.originalPrice.toLocaleString('tr-TR') + '</span>' : ''}
            ${discount > 0 ? '<span class="price-discount">-%' + discount + ' indirim</span>' : ''}
          </div>
          <p class="detail-description">${product.description}</p>
          <button class="add-to-cart-btn" id="addToCartBtn">Sepete Ekle</button>
          <a href="https://www.shopier.com/padenscosmetics" target="_blank" class="shopier-btn">Shopier'de Sat\u0131n Al</a>
          <div class="detail-accordion">
            <div class="accordion-item">
              <button class="accordion-trigger">\u00DCr\u00FCn Detay\u0131 <span class="icon">+</span></button>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  ${product.description}<br><br>
                  Kategori: ${CATEGORY_LABELS[product.category] || product.category}
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-trigger">Kargo Bilgisi <span class="icon">+</span></button>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  T\u00FCrkiye genelinde \u00FCcretsiz kargo. Sipari\u015Fleriniz 1-3 i\u015F g\u00FCn\u00FC i\u00E7inde kargoya verilir.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <button class="accordion-trigger">\u0130ade & De\u011Fi\u015Fim <span class="icon">+</span></button>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  A\u00E7\u0131lmam\u0131\u015F \u00FCr\u00FCnlerde 14 g\u00FCn i\u00E7inde iade kabul edilmektedir. Detayl\u0131 bilgi i\u00E7in destek@padencosmetics.com adresine ula\u015F\u0131n.
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Add to cart
      document.getElementById('addToCartBtn')?.addEventListener('click', () => addToCart(product));

      // Accordions
      detailContainer.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const item = trigger.parentElement;
          const content = item.querySelector('.accordion-content');
          const isOpen = item.classList.contains('open');

          detailContainer.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.accordion-content').style.maxHeight = '0';
          });

          if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      });
    } else {
      detailContainer.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:120px 24px;">
          <h2 class="font-display" style="font-size:2rem;margin-bottom:16px;">\u00DCr\u00FCn Bulunamad\u0131</h2>
          <a href="/" class="btn-primary">Ana Sayfaya D\u00F6n</a>
        </div>
      `;
    }
  }

  // ── Hero Canvas Particles ──
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let W, H;
    const particles = [];
    const maxParticles = 60;

    function resizeCanvas() {
      const hero = heroCanvas.closest('.hero-bg');
      W = heroCanvas.width = hero.offsetWidth;
      H = heroCanvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function spawnParticle() {
      if (particles.length >= maxParticles) return;
      particles.push({
        x: Math.random() * W,
        y: H + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.8),
        size: 1 + Math.random() * 2.5,
        life: 1,
        decay: 0.002 + Math.random() * 0.004,
        type: Math.random() > 0.6 ? 'red' : (Math.random() > 0.5 ? 'gold' : 'white')
      });
    }

    function getParticleColor(type, alpha) {
      switch (type) {
        case 'red': return `rgba(196,30,58,${alpha})`;
        case 'gold': return `rgba(201,169,110,${alpha})`;
        default: return `rgba(245,240,235,${alpha})`;
      }
    }

    let frame = 0;
    function renderParticles() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      if (frame % 3 === 0) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.6;
        const glow = p.size * 4;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        grad.addColorStop(0, getParticleColor(p.type, alpha * 0.8));
        grad.addColorStop(1, getParticleColor(p.type, 0));
        ctx.fillStyle = grad;
        ctx.fillRect(p.x - glow, p.y - glow, glow * 2, glow * 2);

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = getParticleColor(p.type, alpha);
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // ── Custom Cursor: Heartbeat ──
  if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    let cx = -100, cy = -100;
    let rx = -100, ry = -100;
    let hovering = false;
    let trail = [];
    const maxTrail = 12;

    // Trail canvas
    const trailCanvas = document.createElement('canvas');
    trailCanvas.className = 'cursor-trail-canvas';
    document.body.appendChild(trailCanvas);
    const tctx = trailCanvas.getContext('2d');

    function resizeTrail() {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    document.addEventListener('mousemove', e => {
      cx = e.clientX;
      cy = e.clientY;
      trail.push({ x: cx, y: cy, life: 1 });
      if (trail.length > maxTrail) trail.shift();
    });

    // Detect interactive elements
    const interactiveSelectors = 'a, button, .product-card, .filter-btn, .quick-add-btn, input, .cart-btn, .menu-toggle';

    document.addEventListener('mouseover', e => {
      if (e.target.closest(interactiveSelectors)) {
        hovering = true;
        cursor.classList.add('hovering');
        ring.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', e => {
      if (e.target.closest(interactiveSelectors)) {
        hovering = false;
        cursor.classList.remove('hovering');
        ring.classList.remove('hovering');
      }
    });

    // Click burst
    document.addEventListener('mousedown', () => {
      ring.classList.add('clicking');
      cursor.classList.add('clicking');
    });
    document.addEventListener('mouseup', () => {
      ring.classList.remove('clicking');
      cursor.classList.remove('clicking');
    });

    // Heartbeat state
    let beatTime = 0;
    const beatCurve = [
      // time, scale pairs — real heartbeat: lub-dub then short pause
      [0, 1], [0.1, 1.25], [0.2, 0.95], [0.32, 1.18], [0.44, 1], [0.7, 1]
    ];

    function getHeartbeatScale(t) {
      // Complete cycle every 0.7 units so the beat repeats faster
      const phase = t % 0.7;
      for (let i = 1; i < beatCurve.length; i++) {
        if (phase <= beatCurve[i][0]) {
          const prev = beatCurve[i - 1];
          const curr = beatCurve[i];
          const ratio = (phase - prev[0]) / (curr[0] - prev[0]);
          return prev[1] + (curr[1] - prev[1]) * ratio;
        }
      }
      return 1;
    }

    function animateCursor() {
      // Smooth follow for ring
      rx += (cx - rx) * 0.15;
      ry += (cy - ry) * 0.15;

      cursor.style.transform = `translate(${cx}px, ${cy}px)`;

      // Heartbeat scale on ring when hovering
      if (hovering) {
        beatTime += 0.016;
        const scale = getHeartbeatScale(beatTime);
        ring.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
        // Pulse the dot glow in sync
        const intensity = (scale - 0.95) / 0.3; // 0 to 1 range
        cursor.style.boxShadow = `0 0 ${8 + intensity * 20}px rgba(196,30,58,${0.5 + intensity * 0.5})`;
        ring.style.borderColor = `rgba(196,30,58,${0.4 + intensity * 0.5})`;
        ring.style.boxShadow = `0 0 ${intensity * 15}px rgba(196,30,58,${intensity * 0.4}), inset 0 0 ${intensity * 8}px rgba(196,30,58,${intensity * 0.15})`;
      } else {
        beatTime = 0;
        ring.style.transform = `translate(${rx}px, ${ry}px) scale(1)`;
        cursor.style.boxShadow = '0 0 8px rgba(196,30,58,0.6)';
        ring.style.borderColor = '';
        ring.style.boxShadow = '';
      }

      // Draw trail
      tctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life -= 0.06;
        if (t.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const alpha = t.life * 0.3;
        const size = t.life * (hovering ? 4 : 2.5);
        tctx.beginPath();
        tctx.arc(t.x, t.y, size, 0, Math.PI * 2);
        tctx.fillStyle = `rgba(196,30,58,${alpha})`;
        tctx.fill();
      }

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
  }

  // ── Init ──
  updateCartUI();

})();
