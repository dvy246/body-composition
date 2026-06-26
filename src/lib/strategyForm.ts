import { cmToIn, inToCm, kgToLb, lbToKg, round } from './engines';

export function autoFillBodyFat() {
	const savedBf = typeof localStorage !== 'undefined' ? localStorage.getItem('bodycompos.estimatedBodyFat') : null;
	if (!savedBf) return;
	const input = document.getElementById('bodyFat') as HTMLInputElement | null;
	if (!input || input.dataset.autofilled) return;
	input.value = savedBf;
	input.dataset.autofilled = 'true';
	const msg = document.createElement('p');
	msg.className = 'text-xs text-success font-medium mt-1.5';
	msg.textContent = 'Estimated body fat imported successfully.';
	input.parentElement?.appendChild(msg);
	setTimeout(() => msg.remove(), 4000);
}

export function setStrategyUnit(
	unit: string,
	currentUnit: string,
	form: HTMLFormElement | null,
): string {
	if (unit === currentUnit || !form) return currentUnit;

	const height = Number(form.height.value);
	const weight = Number(form.weight.value);

	if (unit === 'imperial') {
		form.height.value = String(round(cmToIn(height), 1));
		form.weight.value = String(round(kgToLb(weight), 1));
		form.height.min = '47';
		form.height.max = '91';
		form.weight.min = '77';
		form.weight.max = '551';
	} else {
		form.height.value = String(round(inToCm(height), 1));
		form.weight.value = String(round(lbToKg(weight), 1));
		form.height.min = '120';
		form.height.max = '230';
		form.weight.min = '35';
		form.weight.max = '250';
	}

	applyUnitLabels(unit);

	return unit;
}

export function setStrategyUnitWithCircumferences(
	unit: string,
	currentUnit: string,
	form: HTMLFormElement | null,
): string {
	if (unit === currentUnit || !form) return currentUnit;

	const height = Number(form.height.value);
	const weight = Number(form.weight.value);
	const waist = Number((form as any).waist?.value);
	const neck = Number((form as any).neck?.value);
	const hip = Number((form as any).hip?.value);

	if (unit === 'imperial') {
		form.height.value = String(round(cmToIn(height), 1));
		form.weight.value = String(round(kgToLb(weight), 1));
		if (waist) (form as any).waist.value = String(round(cmToIn(waist), 1));
		if (neck) (form as any).neck.value = String(round(cmToIn(neck), 1));
		if (hip) (form as any).hip.value = String(round(cmToIn(hip), 1));
		form.height.min = '47';
		form.height.max = '91';
		form.weight.min = '77';
		form.weight.max = '551';
		if ((form as any).waist) { (form as any).waist.min = '16'; (form as any).waist.max = '87'; }
		if ((form as any).neck) { (form as any).neck.min = '8'; (form as any).neck.max = '31'; }
		if ((form as any).hip) { (form as any).hip.min = '16'; (form as any).hip.max = '87'; }
	} else {
		form.height.value = String(round(inToCm(height), 1));
		form.weight.value = String(round(lbToKg(weight), 1));
		if (waist) (form as any).waist.value = String(round(inToCm(waist), 1));
		if (neck) (form as any).neck.value = String(round(inToCm(neck), 1));
		if (hip) (form as any).hip.value = String(round(inToCm(hip), 1));
		form.height.min = '120';
		form.height.max = '230';
		form.weight.min = '35';
		form.weight.max = '250';
		if ((form as any).waist) { (form as any).waist.min = '40'; (form as any).waist.max = '220'; }
		if ((form as any).neck) { (form as any).neck.min = '20'; (form as any).neck.max = '80'; }
		if ((form as any).hip) { (form as any).hip.min = '40'; (form as any).hip.max = '220'; }
	}

	applyUnitLabels(unit);

	return unit;
}

function updatePlaceholders(unit: string) {
	const h = document.getElementById('height') as HTMLInputElement | null;
	const w = document.getElementById('weight') as HTMLInputElement | null;
	const wa = document.getElementById('waist') as HTMLInputElement | null;
	const n = document.getElementById('neck') as HTMLInputElement | null;
	const hi = document.getElementById('hip') as HTMLInputElement | null;
	if (h) h.placeholder = unit === 'metric' ? 'e.g. 175' : 'e.g. 5\'9"';
	if (w) w.placeholder = unit === 'metric' ? 'e.g. 82' : 'e.g. 180';
	if (wa) wa.placeholder = unit === 'metric' ? 'e.g. 88' : 'e.g. 35';
	if (n) n.placeholder = unit === 'metric' ? 'e.g. 38' : 'e.g. 15';
	if (hi) hi.placeholder = unit === 'metric' ? 'e.g. 95' : 'e.g. 37';
}

function applyUnitLabels(unit: string) {
	updatePlaceholders(unit);
	document.querySelectorAll('[data-strategy-unit]').forEach((button) =>
		button.setAttribute('aria-pressed', String(button.getAttribute('data-strategy-unit') === unit))
	);
	document.querySelectorAll('[data-strategy-height-unit]').forEach((label) =>
		label.textContent = unit === 'metric' ? '(cm)' : '(in)'
	);
	document.querySelectorAll('[data-strategy-weight-unit]').forEach((label) =>
		label.textContent = unit === 'metric' ? '(kg)' : '(lb)'
	);
}

export function saveAssessment(data: Record<string, unknown>) {
	localStorage.setItem('bodycompos.latestAssessment', JSON.stringify(data));
	localStorage.removeItem('bodycompos.estimatedBodyFat');

	const history = JSON.parse(localStorage.getItem('bodycompos.assessments') || '[]');
	history.unshift(data);
	localStorage.setItem('bodycompos.assessments', JSON.stringify(history.slice(0, 12)));
}
