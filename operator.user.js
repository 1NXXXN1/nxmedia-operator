// ==UserScript==
// @name            NXMEDIA
// @namespace       nx-media
// @author          NX
// @description     Watch movies on IMDB, TMDB, Kinopoisk and Letterboxd!
// @version         3.1.0
// @icon            https://raw.githubusercontent.com/1NXXXN1/nxmedia-operator/refs/heads/main/favicon.png
// @updateURL       https://github.com/1NXXXN1/nxmedia-operator/raw/refs/heads/main/operator.user.js
// @downloadURL     https://github.com/1NXXXN1/nxmedia-operator/raw/refs/heads/main/operator.user.js
// @run-at          document-idle
// @grant           GM.info
// @grant           GM.setValue
// @grant           GM.getValue
// @grant           GM.openInTab
// @grant           GM.deleteValue
// @match           *://www.kinopoisk.ru/*
// @match           *://*.imdb.com/title/*
// @match           *://www.themoviedb.org/movie/*
// @match           *://www.themoviedb.org/tv/*
// @match           *://letterboxd.com/film/*
// @match           *://nxmedia.uz/*

// ==/UserScript==

(function () {

	// Current version of the script
	const VERSION = GM.info?.script?.version;

	// Banner image
	const BANNER_IMAGE = 'data:image/webp;base64,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';

	// URL to the player
	const PLAYER_URL = 'https://nxmedia.uz/';

	// ID of the banner, attached to the page
	const BANNER_ID = 'nx-media-banner';

	// URL Matchers
	const KINOPOISK_MATCHER = /kinopoisk\.ru\/(film|series)\/.*/;
	const IMDB_MATCHER = /imdb\.com\/title\/tt\.*/;
	const TMDB_MATCHER = /themoviedb\.org\/(movie|tv)\/\.*/;
	const LETTERBOXD_MATCHER = /letterboxd\.com\/film\/\.*/;
	const MATCHERS = [KINOPOISK_MATCHER, IMDB_MATCHER, TMDB_MATCHER, LETTERBOXD_MATCHER];

	// Logging utility
	const logger = {
		info: (...args) => console.info('[Operator Script]', ...args),
		warn: (...args) => console.warn('[Operator Script]', ...args),
		error: (...args) => console.error('[Operator Script]', ...args),
	}

	let previousUrl = '/';

	/**
	 * Initialize banner on the page
	 */
	async function initBanner() {
		const observer = new MutationObserver(() => updateBanner());
		observer.observe(document, { subtree: true, childList: true });
		updateBanner();
	}

	/**
	 * Update banner based on the current movie data on page
	 */
	function updateBanner() {
		const url = getCurrentURL();

		// Skip to prevent unnecessary updates
		if (url === previousUrl) return;

		// Check if URL matches
		const urlMatches = MATCHERS.some((matcher) => url.match(matcher));
		if (!urlMatches) return removeBanner();

		// Check if title is present
		const extractedTitle = extractTitle();
		if (!extractedTitle) return removeBanner();

		// Movie found, now we can stop searching
		previousUrl = url;
		attachBanner();
	}

	/**
	 * Extract movie data from the page
	 */
	function extractMovieData() {
		const url = getCurrentURL();

		// Movie title
		const title = extractTitle();
		if (!title) return null;

		// Kinopoisk ID
		if (url.match(KINOPOISK_MATCHER)) {
			const id = url.split('/').at(4);
			return { kinopoisk: id, title };
		}

		// IMDB ID
		if (url.match(IMDB_MATCHER)) {
			const id = url.split('/').at(4);
			return { imdb: id, title };
		}

		// TMDB ID
		if (url.match(TMDB_MATCHER)) {
			const id = url.split('/').at(4).split('-').at(0);
			return { tmdb: id, title };
		}

		// IMDB ID from Letterboxd
		if (url.match(LETTERBOXD_MATCHER)) {
			const elements = document.querySelectorAll('a');
			const elementsArray = Array.from(elements);

			// Find IMDB ID
			const imdbLink = elementsArray.find((link) => link?.href?.match(IMDB_MATCHER));
			if (imdbLink) {
				const imdbId = imdbLink.href.split('/').at(4);
				if (imdbId) return { imdb: imdbId, title };
			}

			// Find TMDB ID
			const tmdbLink = elementsArray.find((link) => link?.href?.match(TMDB_MATCHER));
			if (tmdbLink) {
				const tmdbId = tmdbLink.href.split('/').at(4)?.split('-')?.at(0);
				if (tmdbId) return { tmdbId: tmdbId, title };
			}

			return null;
		}

		return null;
	}

	/**
	 * Get current URL.
	 * @returns {string} Current url without query parameters and hashes.
	 */
	function getCurrentURL() {
		return location.origin + location.pathname;
	}

	/**
	 * Extract movie title from the page
	 * @returns {string} The extracted title
	 */
	function extractTitle() {
		try {
			const titleElement = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]');
			if (!titleElement) return null;

			const title = titleElement?.content?.trim();
			if (!title) return null;

			// Skip default Kinopoisk title
			if (title.startsWith('Кинопоиск.')) return null;

			// Remove title attachment from IMDB
			if (title.includes('⭐')) {
				return title.split('⭐').at(0).trim();
			}

			// Any other IMDB attachment
			if (title.endsWith('- IMDb') && title.includes(')')) {
				const lastParenthesisIndex = title.lastIndexOf(')');
				return title.slice(0, lastParenthesisIndex + 1).trim();
			}

			return title;
		} catch (error) {
			return null;
		}
	}

	/**
	 * Add banner element to the page
	 */
	function attachBanner() {
		if (document.getElementById(BANNER_ID)) return;

		const banner = document.createElement('button');
		banner.id = BANNER_ID;
		banner.style.all = 'unset';
		banner.style.backgroundImage = `url(${BANNER_IMAGE})`;
		banner.style.backgroundSize = 'contain';
		banner.style.backgroundRepeat = 'no-repeat';
		banner.style.width = '32px';
		banner.style.height = '128px';
		banner.style.top = '-48px';
		banner.style.left = '8px';
		banner.style.opacity = '0';
		banner.style.outline = 'none';
		banner.style.cursor = 'pointer';
		banner.style.position = 'fixed';
		banner.style.zIndex = '9999999999';
		banner.style.transition = 'opacity 0.15s ease, top 0.15s ease';
		banner.style.filter = 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))';

		// Events
		banner.addEventListener('mouseover', () => (banner.style.top = '-12px'));
		banner.addEventListener('mouseout', () => (banner.style.top = '-24px'));
		banner.addEventListener('click', () => openPlayer());
		banner.addEventListener('mousedown', (event) => event.button === 1 && openPlayer(true));

		setTimeout(() => {
			banner.style.top = '-24px';
			banner.style.opacity = '1';
		}, 300);

		document.body.appendChild(banner);
	}

	/**
	 * Remove banner from the page
	 */
	function removeBanner() {
		document.getElementById(BANNER_ID)?.remove();
	}

	/**
	 * Open player with the extracted data
	 * @param {boolean} loadInBackground If true, page will be opened in background
	 */
	async function openPlayer(loadInBackground = false) {
		const data = extractMovieData();
		if (!data) return logger.error('Failed to extract movie data');

		await GM.setValue('movie-data', data);

		logger.info('Opening player for movie', data);
		GM.openInTab(PLAYER_URL, loadInBackground);
	}

	/**
	 * Init player with the extracted data.
	 * Executed on the player page only.
	 */
	async function initPlayer() {
		const data = await GM.getValue('movie-data', {});
		await GM.deleteValue('movie-data');

		// Skip initialization if no data
		if (!data || Object.keys(data).length === 0) return;

		// Stringify data twice to prevent XSS and automatically escape quotes
		const dataSerialized = JSON.stringify(JSON.stringify(data));
		const versionSerialized = JSON.stringify(VERSION);

		// Inject data to the player
		const scriptElement = document.createElement('script');
		scriptElement.innerHTML = `globalThis.init(JSON.parse(${dataSerialized}), ${versionSerialized});`;
		document.body.appendChild(scriptElement);

		logger.info('Injected movie data:', data);
	}

	// Init player or banner
	logger.info('Script executed');
	location.href.includes(PLAYER_URL) ? initPlayer() : initBanner();
})();
