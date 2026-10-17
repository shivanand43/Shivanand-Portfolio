import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../../context/SiteContentContext';
import { profileData } from '../../data/profile';
import styles from './VisitorTracker.module.css';

const DEFAULT_CONTACT = {
  email: profileData.email || 'shivanandpatil55550@gmail.com',
  emailjs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
};

function getEmailJsConfig(contact = DEFAULT_CONTACT) {
  const emailjsCfg = contact?.emailjs ?? DEFAULT_CONTACT.emailjs;
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || emailjsCfg?.serviceId,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || emailjsCfg?.templateId,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || emailjsCfg?.publicKey,
  };
}

/** Step 1 — Try browser GPS (most accurate). Returns { coords, error } or null. */
function getBrowserCoords() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('VisitorTracker: Geolocation is not supported by this browser.');
      return resolve({ error: 'Geolocation not supported by browser' });
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log('VisitorTracker: GPS success', pos.coords);
        resolve({
          coords: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
          error: null,
        });
        // Cache the successful GPS location for future fallback
        try {
          localStorage.setItem(
            'lastGpsLocation',
            JSON.stringify({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
              timestamp: Date.now(),
            })
          );
        } catch (e) {
          console.warn('VisitorTracker: Failed to cache GPS location', e);
        }
      },
      async (err) => {
        console.warn(
          'VisitorTracker: GPS failed/denied. Code:',
          err.code,
          'Message:',
          err.message
        );
        // Attempt to use cached location if recent (within 24h)
        try {
          const cached = localStorage.getItem('lastGpsLocation');
          if (cached) {
            const data = JSON.parse(cached);
            const ageHours = (Date.now() - data.timestamp) / (1000 * 60 * 60);
            if (ageHours <= 24) {
              console.log('VisitorTracker: Using cached GPS location', data);
              return resolve({
                coords: { lat: data.lat, lon: data.lon, accuracy: data.accuracy },
                error: null,
              });
            }
          }
        } catch (e) {
          console.warn('VisitorTracker: Failed to read cached GPS location', e);
        }
        // No valid cache, return error
        resolve({
          coords: null,
          error: `Code ${err.code} — ${err.message}`,
        });
      },
      { timeout: 30000, maximumAge: 0, enableHighAccuracy: true }
    );
  });
}

/** Step 2 — Reverse geocode GPS coords → full address via OpenStreetMap Nominatim (free). */
async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1&email=shivanandpatil55550@gmail.com`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) return null;
    const d = await res.json();
    const a = d.address || {};
    return {
      displayName: d.display_name || 'N/A',
      road: a.road || a.pedestrian || a.footway || a.suburb || '',
      suburb: a.suburb || a.neighbourhood || a.quarter || '',
      city: a.city || a.town || a.village || a.county || '',
      district: a.state_district || a.county || '',
      state: a.state || '',
      country: a.country || '',
      postcode: a.postcode || 'N/A',
    };
  } catch {
    return null;
  }
}

// Step 3 — IP-based fallback (city-level, no GPS permission needed).
async function getIpLocation() {
  try {
    const res = await fetch('https://ipinfo.io/json');
    if (!res.ok) throw new Error('IP lookup failed');
    const d = await res.json();
    const [lat, lon] = d.loc ? d.loc.split(',') : [null, null];
    return {
      ip: d.ip || 'N/A',
      city: d.city || 'N/A',
      region: d.region || 'N/A',
      country: d.country || 'N/A',
      postal: d.postal || 'N/A',
      isp: d.org || 'N/A',
      latitude: lat ? Number(lat) : null,
      longitude: lon ? Number(lon) : null,
    };
  } catch {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (!res.ok) throw new Error();
      const d = await res.json();
      return {
        ip: d.ip || 'N/A',
        city: d.city || 'N/A',
        region: d.region || 'N/A',
        country: d.country_name || 'N/A',
        postal: d.postal || 'N/A',
        isp: d.org || 'N/A',
        latitude: d.latitude,
        longitude: d.longitude,
      };
    } catch {
      return null;
    }
  }
}

/** Build the location section of the email. */
async function buildLocationString() {
  const result = await getBrowserCoords();

  if (result && result.coords) {
    const coords = result.coords;
    const geo = await reverseGeocode(coords.lat, coords.lon);
    if (geo) {
      const addrParts = [
        geo.road,
        geo.suburb,
        geo.city,
        geo.district,
        geo.state,
        geo.country,
      ]
        .filter(Boolean)
        .join(', ');
      return (
        `📍 GPS LOCATION (High Accuracy ±${Math.round(coords.accuracy)}m)\n` +
        `   Full Address : ${addrParts}\n` +
        `   Pincode      : ${geo.postcode}\n` +
        `   Display Name : ${geo.displayName}\n` +
        `   Coordinates  : ${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}\n` +
        `   Maps Link    : https://maps.google.com/?q=${coords.lat},${coords.lon}`
      );
    }
  }

  // Fallback to IP
  const gpsError = result?.error || 'Unknown error';
  const ip = await getIpLocation();
  if (ip) {
    const mapsQuery =
      ip.latitude && ip.longitude
        ? `https://maps.google.com/?q=${ip.latitude},${ip.longitude}`
        : `https://maps.google.com/?q=${encodeURIComponent(
            ip.city + ', ' + ip.country
          )}`;

    return (
      `📍 IP-BASED LOCATION (Approximate — GPS failed: ${gpsError})\n` +
      `   City/Region  : ${ip.city}, ${ip.region}\n` +
      `   Country      : ${ip.country}\n` +
      `   Postal Code  : ${ip.postal}\n` +
      `   IP Address   : ${ip.ip}\n` +
      `   ISP          : ${ip.isp}\n` +
      `   Maps Link    : ${mapsQuery}`
    );
  }

  return `📍 Location: Could not be determined (GPS failed: ${gpsError} + IP lookup failed)`;
}

export default function VisitorTracker() {
  const { content, profile } = useSiteContent();
  const location = useLocation();
  const inputRef = useRef(null);
  const [geoPermission, setGeoPermission] = useState('prompt');
  const [locationRequested, setLocationRequested] = useState(false);

  const CONTACT = {
    ...DEFAULT_CONTACT,
    email: profile?.email || DEFAULT_CONTACT.email,
    ...content?.contact,
    emailjs: {
      ...DEFAULT_CONTACT.emailjs,
      ...content?.contact?.emailjs,
    },
  };

  const { serviceId, templateId, publicKey } = getEmailJsConfig(CONTACT);

  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(
    () => !sessionStorage.getItem('visitor_name')
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((p) => {
        setGeoPermission(p.state);
        p.onchange = () => setGeoPermission(p.state);
      });
    }
  }, []);

  useEffect(() => {
    if (showModal && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [showModal]);

  const requestLocationPermission = async () => {
    setLocationRequested(true);
    await getBrowserCoords();
  };

  useEffect(() => {
    if (showModal && !locationRequested) {
      requestLocationPermission();
    }
  }, [showModal, locationRequested]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(false);
  };

  const handleSubmit = async (isSkip = false) => {
    if (submitting) return;
    const visitorName = isSkip ? 'Anonymous' : name.trim() || 'Anonymous';
    sessionStorage.setItem('visitor_name', visitorName);

    // Save visitor log locally for Admin Dashboard as well
    try {
      const existing = JSON.parse(
        localStorage.getItem('shivanand_portfolio_visitors') || '[]'
      );
      localStorage.setItem(
        'shivanand_portfolio_visitors',
        JSON.stringify([
          {
            id: Date.now().toString(),
            visitorName,
            path: location.pathname,
            device: /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent)
              ? 'Mobile'
              : 'Desktop',
            timestamp: new Date().toISOString(),
          },
          ...existing,
        ])
      );
    } catch {
      // Ignore storage error
    }

    if (!serviceId || !templateId || !publicKey) {
      setShowModal(false);
      return;
    }

    setSubmitting(true);

    const locationString = await buildLocationString();

    const templateParams = {
      name: 'Portfolio Visitor Alert',
      email: 'visitor-tracker@shivanandpatil.com',
      subject: `🔔 ${visitorName} visited your profile — ${new Date().toLocaleDateString(
        'en-IN'
      )}`,
      message:
        `Hello ${profile?.name || 'Shivanand'},\n\n` +
        `👋 ${visitorName} visited your portfolio!\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🕐 Time     : ${new Date().toLocaleString('en-IN')}\n` +
        `📄 Page     : ${window.location.origin}${location.pathname}${location.search}\n` +
        `🔗 Referrer : ${document.referrer || 'Direct / Bookmark'}\n` +
        `🖥️ Device   : ${navigator.userAgent}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `${locationString}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Cheers,\nPortfolio Tracker`,
      to_email: CONTACT.email,
      visitor_name: visitorName,
    };

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });
      if (res.ok) console.log('VisitorTracker: Email sent.');
      else console.warn('VisitorTracker: Email failed', await res.text());
    } catch (err) {
      console.warn('VisitorTracker: Email error', err);
    } finally {
      setSubmitting(false);
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className={styles.vtOverlay}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome modal"
    >
      <div className={styles.vtModal}>
        {/* Gold header */}
        <div className={styles.vtHeader}>
          <span className={styles.vtHeaderIcon}>👋</span>
          <span className={styles.vtHeaderTitle}>Welcome!</span>
        </div>

        {/* White body */}
        <div className={styles.vtBody}>
          <p className={styles.vtGreeting}>Hi there!</p>
          <p className={styles.vtDesc}>
            You&apos;re visiting <strong>{profile?.name || 'Shivanand'}&apos;s Portfolio</strong>.
            <br />
            Mind sharing your name so {profile?.name?.split(' ')[0] || 'Shivanand'} knows who
            stopped by?
          </p>

          <div className={styles.vtInputWrap}>
            <span className={styles.vtInputIcon}>✦</span>
            <input
              ref={inputRef}
              id="visitor-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your name…"
              className={styles.vtInput}
              maxLength={60}
              autoComplete="off"
            />
          </div>

          <button
            id="visitor-submit-btn"
            type="button"
            onClick={() => handleSubmit(false)}
            className={styles.vtBtn}
            disabled={submitting}
          >
            {submitting ? 'Sending…' : 'Continue →'}
          </button>

          <p className={styles.vtSkip} onClick={() => handleSubmit(true)}>
            Skip — continue anonymously
          </p>
        </div>
      </div>
    </div>
  );
}