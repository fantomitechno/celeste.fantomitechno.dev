import type { Category, Map } from '@prisma/client';
import { prisma } from './prisma';

export const isFullCleared = (map: Map) => {
	const berryCleared = map.collectedberries == map.containsBerries;
	const cassetteCleared = !map.containsCassette || map.collectedCassette;
	const heartCleared = !map.containsHeart || map.collectedHeart;
	const moonBerryCleared = !map.containsMoonBerry || map.collectedMoonBerry;

	return berryCleared && cassetteCleared && heartCleared && moonBerryCleared;
};

export const isRainbowCleared = async (category: Category) => {
	const deathlessCleared = await prisma.map.count({
		where: {
			categoryId: category.id,
			campaignId: category.campaignId,
			deathlessOn: {
				not: null
			}
		}
	});

	const maps = await prisma.map.count({
		where: {
			categoryId: category.id,
			campaignId: category.campaignId
		}
	});

	return deathlessCleared == maps;
};
