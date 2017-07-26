import axios from 'axios';
import {convertMillisecondsToDisplayFormat} from './TimeFormatter';

const baseURL = 'https://api.spotify.com/v1'

// function normalizeResponse(response) {
// 	let { data: { tracks: { items } } } = response;
// 	let normalizedResponse = {};
// 	items.forEach(item => {
// 		normalizedResponse[item.id] = {
// 			id: item.id,
// 			name: item.name,
// 			album: item.album.name,
// 			artists: item.artists.map(artist => artist.name),
// 			duration: convertMillisecondsToDisplayFormat(item.duration_ms),
// 			previewUrl: item.preview_url,
// 			albumImage: item.album.images.length > 0 ? item.album.images[0].url : ''
// 		}
// 	})
// 	return normalizedResponse;
// }

class SpotifyHelper {
	constructor({token}) {
		this.client = axios.create({
			baseURL,
			headers: {Authorization: 'Bearer ' + token}
		});
	}

	search(query) {
		let url = `/search/?q=${query}&type=track&market=US`;
		return this.client.get(url).then(response => this.normalizeResponse(response));
	}

	normalizeResponse(response){
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
}

export default SpotifyHelper;
