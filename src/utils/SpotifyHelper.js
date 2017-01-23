import axios from 'axios';

const baseUrl = 'https://api.spotify.com/v1'

function convertMillisecondsToDisplayFormat(num) {
	let parts = (num / 1000.0 / 60).toFixed(2).toString().split('.');
	let minutes = parts[0];
	let seconds = Math.round(parts[1] * 0.6);
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${minutes}:${seconds}`;
}

function normalizeResponse(response) {
	let { data: { tracks: { items } } } = response;
	let normalizedResponse = {};
	items.forEach(item => {
		normalizedResponse[item.id] = {
			id: item.id,
			name: item.name,
			album: item.album.name,
			artists: item.artists.map(artist => artist.name),
			duration: convertMillisecondsToDisplayFormat(item.duration_ms),
			previewUrl: item.preview_url,
			albumImage: item.album.images.length > 0 ? item.album.images[0].url : ''
		}
	})
	return normalizedResponse;
}

const SpotifyHelper = {

	search(query) {
		let url = `${baseUrl}/search/?q=${query}&type=track`;
		return axios.get(url).then(response => normalizeResponse(response));
	}

};

export default SpotifyHelper;
