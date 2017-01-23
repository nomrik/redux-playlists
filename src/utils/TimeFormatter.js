function convertDecimalMinutesToDisplayFormat(decimalMinutes) {
	let parts = decimalMinutes.toFixed(2).toString().split('.');
	let minutes = parts[0];
	let seconds = Math.round(parts[1] * 0.6);
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	return `${minutes}:${seconds}`;
}

export function convertMillisecondsToDisplayFormat(num) {
	let decimalMinutes = (num / 1000.0 / 60);
	return convertDecimalMinutesToDisplayFormat(decimalMinutes);
}

export function convertSecondsToDisplayFormat(num) {
	let decimalMinutes = num / 60;
	return convertDecimalMinutesToDisplayFormat(decimalMinutes);
}
