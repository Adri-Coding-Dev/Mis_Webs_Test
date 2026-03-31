// ─── NAV scroll effect ────────────────────────────────────────
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── Hamburger menu ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── Menu tabs ────────────────────────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    menuCards.forEach(card => {
      card.classList.toggle('active', card.dataset.cat === cat);
    });
  });
});

// ─── Reveal on scroll ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ─── EMAILJS CONFIG ───────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'Jy1NNYYSWEaDl3AXs';   // Account → API Keys → Public Key
const EMAILJS_SERVICE_ID  = 'service_c0yqhww';      // Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_qy8xxkg';     // Email Templates → Template ID
// El email destino se configura directamente en la plantilla de EmailJS (To Email).
// ─────────────────────────────────────────────────────────────

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ─── Toast helper ─────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(() => t.classList.remove('show'), 4500);
}

// ─── Field validation ─────────────────────────────────────────
function validateField(el, msg) {
  const val = el.value.trim();
  const grp = el.closest('.form-group');
  let errEl = grp.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.className = 'field-error';
    grp.appendChild(errEl);
  }
  if (!val) {
    el.classList.add('invalid');
    errEl.textContent = msg;
    return false;
  }
  el.classList.remove('invalid');
  errEl.textContent = '';
  return true;
}

// ─── Format date to Spanish locale ───────────────────────────
function formatDate(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return parseInt(d) + ' de ' + months[parseInt(m) - 1] + ' de ' + y;
}

// ─── Build email HTML body ────────────────────────────────────
// Uses string concatenation (not template literals) to prevent the HTML parser
// from misinterpreting closing tags like </style>, </head>, </body>, </html>
// that appear inside the JS string as real document-level closing tags.
function buildEmailHtml(data) {
  var notasHtml = data.notas
    ? '<div class="row"><div class="cell" style="flex:1">'
      + '<div class="cell-label">Notas especiales</div>'
      + '<div class="notes-box"><p>' + data.notas + '</p></div>'
      + '</div></div>'
    : '';

  var css = ''
    + 'body{margin:0;padding:0;background:#f0e8d5;font-family:Georgia,serif;}'
    + '.wrap{max-width:580px;margin:32px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(46,26,14,.15);}'
    + '.header{background:#2e1a0e;padding:36px 40px 28px;text-align:center;}'
    + '.header-eyebrow{font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c9a96e;margin-bottom:10px;}'
    + '.header-title{font-family:\'Playfair Display\',Georgia,serif;font-size:36px;font-weight:700;color:#f5efe0;line-height:1;margin:0;}'
    + '.header-title em{font-style:italic;color:#d4a96a;}'
    + '.header-sub{font-family:\'Cinzel\',serif;font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:#8b5e3c;margin-top:10px;}'
    + '.divider{display:flex;align-items:center;justify-content:center;gap:8px;margin:6px 0 0;}'
    + '.divider hr{width:40px;border:none;border-top:1px solid #5c3317;}'
    + '.divider span{color:#d4a96a;font-size:10px;}'
    + '.badge{display:inline-block;background:#d4a96a;color:#2e1a0e;font-family:\'Cinzel\',serif;font-size:9px;letter-spacing:.15em;text-transform:uppercase;padding:5px 16px;border-radius:50px;margin-top:16px;}'
    + '.body{padding:36px 40px;}'
    + '.greeting{font-size:15px;color:#5c3317;margin-bottom:20px;line-height:1.6;}'
    + '.greeting strong{color:#2e1a0e;}'
    + '.card{background:#faf6ee;border-radius:8px;border:1px solid #e0d5bc;overflow:hidden;margin-bottom:24px;}'
    + '.card-head{background:#5c3317;padding:12px 20px;display:flex;align-items:center;gap:10px;}'
    + '.card-head-icon{width:28px;height:28px;background:#d4a96a;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}'
    + '.card-head-icon svg{width:14px;height:14px;fill:#2e1a0e;}'
    + '.card-head-title{font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#f5efe0;}'
    + '.card-body{padding:20px;}'
    + '.row{display:flex;gap:0;border-bottom:1px solid #e0d5bc;}'
    + '.row:last-child{border-bottom:none;}'
    + '.cell{padding:10px 16px;flex:1;}'
    + '.cell-label{font-family:\'Cinzel\',serif;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#8b5e3c;margin-bottom:3px;}'
    + '.cell-value{font-size:14px;color:#2e1a0e;line-height:1.4;}'
    + '.notes-box{background:#fff;border:1px solid #e0d5bc;border-radius:6px;padding:14px 16px;margin-top:4px;}'
    + '.notes-box p{font-size:14px;color:#5c3317;font-style:italic;line-height:1.6;margin:0;}'
    + '.cta{text-align:center;margin:20px 0 8px;}'
    + '.cta a{display:inline-block;background:#5c3317;color:#f5efe0;font-family:\'Cinzel\',serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;padding:14px 32px;border-radius:4px;text-decoration:none;}'
    + '.footer-strip{background:#2e1a0e;padding:20px 40px;text-align:center;}'
    + '.footer-strip p{font-family:\'Cinzel\',serif;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#7a5c42;margin:3px 0;}'
    + '.footer-strip a{color:#c9a96e;text-decoration:none;}'
    + '@media(max-width:500px){'
    + '.body{padding:24px 20px;}.header{padding:28px 20px 20px;}'
    + '.row{flex-direction:column;}.cell{padding:8px 12px;}'
    + '.footer-strip{padding:16px 20px;}'
    + '}';

  return '<!DOCTYPE html>'
    + '<html lang="es">'
    + '<head>'
    +   '<meta charset="UTF-8"/>'
    +   '<meta name="viewport" content="width=device-width,initial-scale=1"/>'
    +   '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cinzel:wght@400;600&display=swap" rel="stylesheet"/>'
    +   '<style>' + css + '<\/style>'
    + '<\/head>'
    + '<body>'
    + '<div class="wrap">'
    +   '<div class="header">'
    +     '<div class="header-eyebrow">\u00b7 Restaurante \u00b7<\/div>'
    +     '<div class="header-title">La <em>Encina<\/em><\/div>'
    +     '<div class="divider"><hr\/><span>\u2726<\/span><hr\/><\/div>'
    +     '<div class="header-sub">Cocina de Ra\u00edz \u00b7 Desde 1987<\/div>'
    +     '<div class="badge">Nueva Solicitud de Reserva<\/div>'
    +   '<\/div>'
    +   '<div class="body">'
    +     '<p class="greeting">Has recibido una nueva solicitud de reserva a trav\u00e9s de la web. A continuaci\u00f3n encontrar\u00e1s todos los detalles del cliente para gestionar la reserva.<\/p>'
    +     '<div class="card">'
    +       '<div class="card-head">'
    +         '<div class="card-head-icon"><svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"\/><\/svg><\/div>'
    +         '<div class="card-head-title">Datos del Cliente<\/div>'
    +       '<\/div>'
    +       '<div class="card-body">'
    +         '<div class="row">'
    +           '<div class="cell"><div class="cell-label">Nombre<\/div><div class="cell-value">' + data.nombre + '<\/div><\/div>'
    +           '<div class="cell"><div class="cell-label">Tel\u00e9fono<\/div><div class="cell-value">' + data.telefono + '<\/div><\/div>'
    +         '<\/div>'
    +       '<\/div>'
    +     '<\/div>'
    +     '<div class="card">'
    +       '<div class="card-head">'
    +         '<div class="card-head-icon"><svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"\/><\/svg><\/div>'
    +         '<div class="card-head-title">Detalles de la Reserva<\/div>'
    +       '<\/div>'
    +       '<div class="card-body">'
    +         '<div class="row">'
    +           '<div class="cell"><div class="cell-label">Fecha<\/div><div class="cell-value">' + formatDate(data.fecha) + '<\/div><\/div>'
    +           '<div class="cell"><div class="cell-label">Hora<\/div><div class="cell-value">' + data.hora + '<\/div><\/div>'
    +         '<\/div>'
    +         '<div class="row">'
    +           '<div class="cell"><div class="cell-label">Comensales<\/div><div class="cell-value">' + data.personas + '<\/div><\/div>'
    +         '<\/div>'
    +         notasHtml
    +       '<\/div>'
    +     '<\/div>'
    +     '<div class="cta"><a href="tel:' + data.telefono.replace(/\s/g, '') + '">\uD83D\uDCDE Llamar al cliente para confirmar<\/a><\/div>'
    +   '<\/div>'
    +   '<div class="footer-strip">'
    +     '<p>La Encina \u00b7 Cocina de Ra\u00edz<\/p>'
    +     '<p>Calle del Roble, 14 \u00b7 28001 Madrid<\/p>'
    +     '<p><a href="tel:+34911234567">+34 91 123 45 67<\/a><\/p>'
    +   '<\/div>'
    + '<\/div>'
    + '<\/body>'
    + '<\/html>';
}

// ─── Form submit handler ──────────────────────────────────────
document.getElementById('submitBtn').addEventListener('click', async () => {
  const nombre   = document.getElementById('f-nombre');
  const telefono = document.getElementById('f-telefono');
  const fecha    = document.getElementById('f-fecha');
  const hora     = document.getElementById('f-hora');
  const personas = document.getElementById('f-personas');
  const notas    = document.getElementById('f-notas');
  const btn      = document.getElementById('submitBtn');

  // Validate required fields
  const v1 = validateField(nombre,   'Por favor, introduce tu nombre');
  const v2 = validateField(telefono, 'Por favor, introduce tu teléfono');
  const v3 = validateField(fecha,    'Selecciona una fecha');
  const v4 = validateField(hora,     'Selecciona una hora');
  const v5 = validateField(personas, 'Indica el número de personas');
  if (!v1 || !v2 || !v3 || !v4 || !v5) return;

  // Loading state
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span>Enviando reserva…';

  const data = {
    nombre:   nombre.value.trim(),
    telefono: telefono.value.trim(),
    fecha:    fecha.value,
    hora:     hora.value,
    personas: personas.value,
    notas:    notas.value.trim(),
  };

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_name:       'Equipo La Encina',
      from_name:     data.nombre,
      from_phone:    data.telefono,
      reserva_fecha: formatDate(data.fecha),
      reserva_hora:  data.hora,
      reserva_pax:   data.personas,
      reserva_notas: data.notas || 'Sin notas adicionales',
      html_body:     buildEmailHtml(data),
    });

    btn.innerHTML = '✓ ¡Reserva enviada! Te llamamos pronto';
    btn.style.background = 'var(--brown-d)';
    btn.style.color = 'var(--warm1)';
    showToast('✓ Solicitud enviada correctamente. ¡Nos ponemos en contacto contigo!', 'success');

    // Reset form after 3s
    setTimeout(() => {
      [nombre, telefono, fecha, notas].forEach(el => el.value = '');
      hora.value = '';
      personas.value = '';
      btn.disabled = false;
      btn.textContent = 'Solicitar Reserva';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);

  } catch (err) {
    console.error('EmailJS error:', err);
    btn.disabled = false;
    btn.textContent = 'Solicitar Reserva';
    showToast('✗ Error al enviar. Llámanos al +34 91 123 45 67', 'error');
  }
});
