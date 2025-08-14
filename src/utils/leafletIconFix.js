import L from 'leaflet';

// 📌 Leaflet Default Icon Fix
// This workaround ensures default marker icons load correctly in Vite-based apps.

// Leaflet Default Icon Fix for Vite:
// Leaflet’s default marker icon URLs don’t resolve correctly in Vite-built apps,
// causing icons not to display properly. This code overrides the default icon URL resolution,
// using explicit URLs that Vite can process during build time,
// so the default Leaflet marker icons load and show correctly.

// Source/Reference: Community-shared fix for Leaflet + Vite compatibility.
// Original discussion and solution here: https://stackoverflow.com/a/70173788
// Note: This code was copied from the community solution and adapted for this project.


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
});
