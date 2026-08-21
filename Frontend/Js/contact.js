/**
 * Nkwen Traders - Contact Page Interactivity & Live Map
 * 
 * Features:
 * 1. Live Interactive Map of Nkwen, Bamenda, Cameroon with exact coordinates
 * 2. Real-time Latitude & Longitude HUD tracking
 * 3. Interactive markers for key Nkwen landmarks & Showroom
 * 4. Contact form validation and submission feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    initNkwenLiveMap();
    initContactForm();
});

/**
 * Initializes the Leaflet Live Map centered on Nkwen, Bamenda, Cameroon
 * with exact latitude and longitude coordinates.
 */
function initNkwenLiveMap() {
    const mapElement = document.getElementById('nkwenLiveMap');
    const coordsDisplay = document.getElementById('coordsValue');
    const resetBtn = document.getElementById('resetMapBtn');

    if (!mapElement || typeof L === 'undefined') {
        console.warn('Leaflet or map container is unavailable.');
        return;
    }

    // Exact Coordinates of Nkwen, Bamenda, NW Region, Cameroon
    const NKWEN_COORDINATES = {
        lat: 5.9631,
        lng: 10.1591,
        zoom: 14
    };

    // Initialize Map with custom options
    const map = L.map('nkwenLiveMap', {
        center: [NKWEN_COORDINATES.lat, NKWEN_COORDINATES.lng],
        zoom: NKWEN_COORDINATES.zoom,
        zoomControl: true,
        scrollWheelZoom: false // Prevent accidental page scroll hijacking
    });

    // Add high quality OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Custom Showroom Amber Pin HTML Icon
    const showroomIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
            <div class="map-pin-inner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // Custom Landmark Pin HTML Icon
    const landmarkIcon = L.divIcon({
        className: 'custom-map-pin landmark-pin',
        html: `
            <div class="map-pin-inner" style="width:24px;height:24px;border-color:#FDB022;background:#1E293B;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FDB022" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="12 8 8 12 12 16 16 12 12 8"></polygon>
                </svg>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24]
    });

    // 1. Primary Marker: NkweN Traders Showroom
    const showroomMarker = L.marker([NKWEN_COORDINATES.lat, NKWEN_COORDINATES.lng], {
        icon: showroomIcon
    }).addTo(map);

    showroomMarker.bindPopup(`
        <div class="map-popup-card">
            <div class="popup-title">NkweN Traders Showroom</div>
            <div class="popup-desc">Main Showroom & Customer Service Hub</div>
            <div class="popup-coords">Lat: 5.9631° N | Lng: 10.1591° E</div>
        </div>
    `).openPopup();

    // 2. Additional Coordinates & Landmarks in Nkwen, Bamenda
    const nkwenLandmarks = [
        {
            name: "Nkwen Central Market",
            lat: 5.9608,
            lng: 10.1652,
            desc: "Historic Trading & Commerce Center"
        },
        {
            name: "Mile 2 Nkwen Hub",
            lat: 5.9550,
            lng: 10.1530,
            desc: "Commercial Avenue Access Point"
        },
        {
            name: "Mile 3 Nkwen Junction",
            lat: 5.9710,
            lng: 10.1680,
            desc: "Nkwen Transit & Logistics Route"
        },
        {
            name: "Nkwen Palace Area",
            lat: 5.9785,
            lng: 10.1742,
            desc: "Cultural Heritage Center of Nkwen"
        }
    ];

    nkwenLandmarks.forEach(landmark => {
        const marker = L.marker([landmark.lat, landmark.lng], { icon: landmarkIcon }).addTo(map);
        marker.bindPopup(`
            <div class="map-popup-card">
                <div class="popup-title">${landmark.name}</div>
                <div class="popup-desc">${landmark.desc}</div>
                <div class="popup-coords">${landmark.lat.toFixed(4)}° N, ${landmark.lng.toFixed(4)}° E</div>
            </div>
        `);
    });

    // Real-time Coordinate tracking on map hover / move
    map.on('mousemove', (e) => {
        if (coordsDisplay) {
            coordsDisplay.textContent = `${e.latlng.lat.toFixed(4)}° N, ${e.latlng.lng.toFixed(4)}° E`;
        }
    });

    // Reset coordinates display on mouseout
    map.on('mouseout', () => {
        if (coordsDisplay) {
            const center = map.getCenter();
            coordsDisplay.textContent = `${center.lat.toFixed(4)}° N, ${center.lng.toFixed(4)}° E`;
        }
    });

    // Update coordinates when map is panned/moved
    map.on('move', () => {
        if (coordsDisplay) {
            const center = map.getCenter();
            coordsDisplay.textContent = `${center.lat.toFixed(4)}° N, ${center.lng.toFixed(4)}° E`;
        }
    });

    // Reset Map View Button Handler
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            map.flyTo([NKWEN_COORDINATES.lat, NKWEN_COORDINATES.lng], NKWEN_COORDINATES.zoom, {
                duration: 1.2
            });
            showroomMarker.openPopup();
        });
    }

    // Invalidate map size after container is fully rendered for crisp tiles
    setTimeout(() => {
        map.invalidateSize();
    }, 250);
}

/**
 * Initializes the Contact Form validation and interactive submission.
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitContactBtn');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    const fields = {
        firstName: {
            input: document.getElementById('firstName'),
            error: document.getElementById('firstNameError'),
            validator: val => val.trim().length >= 2,
            errorMsg: 'Please enter your first name (at least 2 characters).'
        },
        lastName: {
            input: document.getElementById('lastName'),
            error: document.getElementById('lastNameError'),
            validator: val => val.trim().length >= 2,
            errorMsg: 'Please enter your last name (at least 2 characters).'
        },
        email: {
            input: document.getElementById('emailAddress'),
            error: document.getElementById('emailAddressError'),
            validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
            errorMsg: 'Please provide a valid email address.'
        },
        subject: {
            input: document.getElementById('subjectSelect'),
            error: document.getElementById('subjectError'),
            validator: val => Boolean(val && val.trim() !== ''),
            errorMsg: 'Please select an inquiry topic.'
        },
        message: {
            input: document.getElementById('messageText'),
            error: document.getElementById('messageError'),
            validator: val => val.trim().length >= 10,
            errorMsg: 'Message must be at least 10 characters long.'
        }
    };

    // Live validation on blur & input
    Object.values(fields).forEach(field => {
        if (!field.input) return;

        const clearError = () => {
            const group = field.input.closest('.form-group');
            if (group) group.classList.remove('has-error');
            if (field.error) field.error.textContent = '';
        };

        field.input.addEventListener('input', clearError);
        field.input.addEventListener('change', clearError);
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset feedback
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        // Validate each field
        Object.values(fields).forEach(field => {
            if (!field.input) return;
            const group = field.input.closest('.form-group');
            const valid = field.validator(field.input.value);

            if (!valid) {
                isValid = false;
                if (group) group.classList.add('has-error');
                if (field.error) field.error.textContent = field.errorMsg;
            } else {
                if (group) group.classList.remove('has-error');
                if (field.error) field.error.textContent = '';
            }
        });

        if (!isValid) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Please correct the highlighted fields before submitting.';
            return;
        }

        // Show loading state on button
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite; margin-right: 8px;">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
            </svg>
            <span>SENDING...</span>
        `;

        // Simulate network submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Success feedback
            feedback.className = 'form-feedback success';
            feedback.innerHTML = `<strong>Thank you, ${fields.firstName.input.value}!</strong> Your message has been sent successfully. Our team in Nkwen will contact you shortly.`;

            // Reset form
            form.reset();

            // Clear feedback message after 8 seconds
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 8000);
        }, 1200);
    });
}
