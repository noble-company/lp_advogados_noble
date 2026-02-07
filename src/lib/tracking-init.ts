/**
 * Tracking Initialization
 * 
 * Dynamically initializes Google Tag Manager and Meta Pixel
 * using environment variables.
 */

/**
 * Initialize Google Tag Manager
 */
export function initGTM(): void {
  const gtmId = import.meta.env.VITE_GTM_ID;
  
  if (!gtmId) {
    console.warn("GTM not initialized - VITE_GTM_ID environment variable is missing");
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js'
  });

  // Create and inject GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  // Create noscript iframe for GTM
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);

  console.log(`✅ GTM initialized with ID: ${gtmId}`);
}

/**
 * Initialize Meta Pixel (Facebook)
 */
export function initMetaPixel(): void {
  const pixelId = import.meta.env.VITE_PIXEL_ID;
  
  if (!pixelId) {
    console.warn("Meta Pixel not initialized - VITE_PIXEL_ID environment variable is missing");
    return;
  }

  // Initialize fbq
  if (window.fbq) return; // Already initialized
  
  const n = window.fbq = function(...args: any[]) {
    if (n.callMethod) {
      n.callMethod.apply(n, args);
    } else {
      n.queue.push(args);
    }
  } as any;
  
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  // Create and inject Meta Pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  // Initialize pixel and track PageView
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');

  // Create noscript image for Meta Pixel
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.insertBefore(noscript, document.body.firstChild);

  console.log(`✅ Meta Pixel initialized with ID: ${pixelId}`);
}

/**
 * Initialize all tracking scripts
 */
export function initTracking(): void {
  if (typeof window === 'undefined') return;
  
  initGTM();
  initMetaPixel();
}
