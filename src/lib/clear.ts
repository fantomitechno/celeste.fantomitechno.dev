import type { Category, Map } from '@prisma/client';
import { prisma } from './prisma';

export const isFullCleared = (map: Map) => {
	const berryCleared = map.collectedberries == map.containsBerries;
	const cassetteCleared = !map.containsCassette || map.collectedCassette;
	const heartCleared = !map.containsHeart || map.collectedHeart;
	const moonBerryCleared = !map.containsMoonBerry || map.collectedMoonBerry;

	return berryCleared && cassetteCleared && heartCleared && moonBerryCleared && map.clearedOn;
};

export const isRainbowCleared = (category: Category & { maps: Map[] }) => {
	let deathlessCleared = 0;
	for (const map of category.maps) {
		if (map.deathlessOn) deathlessCleared += 1;
	}

	return deathlessCleared == category.maps.length;
};
