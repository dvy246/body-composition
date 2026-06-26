import { kgToLb, lbToKg, cmToIn, inToCm, round } from './engines';

export type Unit = 'metric' | 'imperial';

export type FormFields = {
	height: HTMLInputElement;
	weight: HTMLInputElement;
	waist?: HTMLInputElement;
	neck?: HTMLInputElement;
	hip?: HTMLInputElement;
	targetWeight?: HTMLInputElement;
	goalWeight?: HTMLInputElement;
};

const METRIC_RANGES: Record<string, [number, number]> = {
	height: [120, 230],
	weight: [35, 250],
	waist: [40, 220],
	neck: [20, 80],
	hip: [40, 220],
	targetWeight: [35, 250],
	goalWeight: [35, 250],
};

const IMPERIAL_RANGES: Record<string, [number, number]> = {
	height: [47, 91],
	weight: [77, 551],
	waist: [16, 87],
	neck: [8, 31],
	hip: [16, 87],
	targetWeight: [77, 551],
	goalWeight: [77, 551],
};

export function convertFormUnits(
	form: HTMLFormElement | null,
	from: Unit,
	to: Unit,
	fields: (keyof FormFields)[],
): void {
	if (!form || from === to) return;

	const f = form as unknown as Record<string, HTMLInputElement>;
	const convert = to === 'imperial'
		? { length: cmToIn, weight: kgToLb }
		: { length: inToCm, weight: lbToKg };
	const ranges = to === 'imperial' ? IMPERIAL_RANGES : METRIC_RANGES;

	const lengthFields = ['height', 'waist', 'neck', 'hip'];
	const weightFields = ['weight', 'targetWeight', 'goalWeight'];

	for (const key of fields) {
		const input = f[key];
		if (!input) continue;
		const val = Number(input.value);
		if (!val) continue;
		const isLength = lengthFields.includes(key);
		const fn = isLength ? convert.length : convert.weight;
		input.value = String(round(fn(val), 1));
		const range = ranges[key];
		if (range) {
			input.min = String(range[0]);
			input.max = String(range[1]);
		}
	}
}

export function updateUnitLabels(
	unit: Unit,
	attrs: { unitBtn: string; heightLabel: string; weightLabel: string },
): void {
	document.querySelectorAll(`[${attrs.unitBtn}]`).forEach((button) =>
		button.setAttribute('aria-pressed', String(button.getAttribute(attrs.unitBtn) === unit))
	);
	document.querySelectorAll(`[${attrs.heightLabel}]`).forEach((label) =>
		label.textContent = unit === 'metric' ? '(cm)' : '(in)'
	);
	document.querySelectorAll(`[${attrs.weightLabel}]`).forEach((label) =>
		label.textContent = unit === 'metric' ? '(kg)' : '(lb)'
	);
}
