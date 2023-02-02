import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { calculateRatio, destringRgb, getLuminance, hexToRgb, hexToTailwindRgbString, rgbToHex } from './colors';

describe('Colors.ts', () => {
	it('Converts between hex and RGB properly', async () => {
		expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
		expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
		expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
		expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
		expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
		expect(hexToRgb('#FFFF00')).toEqual({ r: 255, g: 255, b: 0 });
		expect(hexToRgb('#00FFFF')).toEqual({ r: 0, g: 255, b: 255 });
		expect(hexToRgb('#FF00FF')).toEqual({ r: 255, g: 0, b: 255 });
	});

	it('Converts between RGB and hex properly', async () => {
		expect(rgbToHex(0, 0, 0)).toEqual('#000000');
		expect(rgbToHex(255, 255, 255)).toEqual('#FFFFFF');
		expect(rgbToHex(255, 0, 0)).toEqual('#FF0000');
		expect(rgbToHex(0, 255, 0)).toEqual('#00FF00');
		expect(rgbToHex(0, 0, 255)).toEqual('#0000FF');
		expect(rgbToHex(255, 255, 0)).toEqual('#FFFF00');
		expect(rgbToHex(0, 255, 255)).toEqual('#00FFFF');
		expect(rgbToHex(255, 0, 255)).toEqual('#FF00FF');
	});
	it('Converts between hex and Tailwind RGB strings properly', async () => {
		expect(hexToTailwindRgbString('#000000')).toEqual('0 0 0');
		expect(hexToTailwindRgbString('#FFFFFF')).toEqual('255 255 255');
		expect(hexToTailwindRgbString('#FF0000')).toEqual('255 0 0');
		expect(hexToTailwindRgbString('#00FF00')).toEqual('0 255 0');
		expect(hexToTailwindRgbString('#0000FF')).toEqual('0 0 255');
		expect(hexToTailwindRgbString('#FFFF00')).toEqual('255 255 0');
		expect(hexToTailwindRgbString('#00FFFF')).toEqual('0 255 255');
		expect(hexToTailwindRgbString('#FF00FF')).toEqual('255 0 255');
	});

	it('Takes an RGB and returns the calculated luminance', async () => {
		expect(getLuminance({ r: 0, g: 0, b: 0 })).toEqual(0);
		expect(getLuminance({ r: 255, g: 255, b: 255 })).toEqual(1);
		expect(getLuminance({ r: 255, g: 0, b: 0 })).toEqual(0.2126);
		expect(getLuminance({ r: 0, g: 255, b: 0 })).toEqual(0.7152);
		expect(getLuminance({ r: 0, g: 0, b: 255 })).toEqual(0.0722);
		expect(getLuminance({ r: 255, g: 255, b: 0 })).toEqual(0.9278);
		expect(getLuminance({ r: 0, g: 255, b: 255 })).toEqual(0.7874);
		expect(getLuminance({ r: 255, g: 0, b: 255 })).toEqual(0.2848);
	});

	it('Destrings an RGB string that includes commas, and return an RGB object', async () => {
		expect(destringRgb('0, 0, 0')).toEqual({ r: 0, g: 0, b: 0 });
		expect(destringRgb('255, 255, 255')).toEqual({ r: 255, g: 255, b: 255 });
		expect(destringRgb('255, 0, 0')).toEqual({ r: 255, g: 0, b: 0 });
		expect(destringRgb('0, 255, 0')).toEqual({ r: 0, g: 255, b: 0 });
		expect(destringRgb('0, 0, 255')).toEqual({ r: 0, g: 0, b: 255 });
		expect(destringRgb('255, 255, 0')).toEqual({ r: 255, g: 255, b: 0 });
		expect(destringRgb('0, 255, 255')).toEqual({ r: 0, g: 255, b: 255 });
		expect(destringRgb('255, 0, 255')).toEqual({ r: 255, g: 0, b: 255 });
	});

	it('Destrings an RGB string, and return an RGB object', async () => {
		expect(destringRgb('0 0 0')).toEqual({ r: 0, g: 0, b: 0 });
		expect(destringRgb('255 255 255')).toEqual({ r: 255, g: 255, b: 255 });
		expect(destringRgb('255 0 0')).toEqual({ r: 255, g: 0, b: 0 });
		expect(destringRgb('0 255 0')).toEqual({ r: 0, g: 255, b: 0 });
		expect(destringRgb('0 0 255')).toEqual({ r: 0, g: 0, b: 255 });
		expect(destringRgb('255 255 0')).toEqual({ r: 255, g: 255, b: 0 });
		expect(destringRgb('0 255 255')).toEqual({ r: 0, g: 255, b: 255 });
		expect(destringRgb('255 0 255')).toEqual({ r: 255, g: 0, b: 255 });
	});

	it('Calculates the ratio between two luminances', async () => {
		expect(calculateRatio(0, 0)).toEqual(1);
		expect(calculateRatio(1, 1)).toEqual(1);
		expect(calculateRatio(0.2126, 0.2126)).toEqual(1);
	});
});
