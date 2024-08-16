export const toTime = (text: string) => {
	let time = 0;

	const [rawTime, ms] = text.split('.');
	time += Number(ms);

	const rawTimes = rawTime.split(':').map(Number).reverse();
	const defaltMultiplier = 1000;

	for (let i = 0; i < rawTimes.length; i++) {
		time += rawTimes[i] * defaltMultiplier * Math.pow(60, i);
	}

	return time;
};

export const fromTime = (time: number | null) => {
	if (time == null) return;
	let text = '';
	const hours = Math.floor(time / (60 * 60 * 1000));
	time = time % (60 * 60 * 1000);

	const minutes = Math.floor(time / (60 * 1000));
	let minutesTime = '';
	if (minutes < 10 && hours) minutesTime += '0';
	minutesTime += `${minutes}`;
	time = time % (60 * 1000);

	const seconds = Math.floor(time / 1000);
	let secondsTime = '';
	if (seconds < 10) secondsTime += '0';
	secondsTime += `${seconds}`;
	time = time % 1000;

	const ms = time;
	let msTime = '';
	if (ms < 100) msTime += '0';
	if (ms < 10) msTime += '0';
	msTime += `${ms}`;

	if (hours) text += `${hours}:`;
	text += `${minutesTime}:${secondsTime}.${msTime}`;
	return text;
};
