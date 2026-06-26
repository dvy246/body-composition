export type Sex = 'male' | 'female';
export type Goal = 'fat-loss' | 'lean-bulk' | 'aggressive-bulk' | 'recomp' | 'maintain';

export const activityFactors = {
	sedentary: 1.2,
	light: 1.375,
	moderate: 1.55,
	active: 1.725,
	athlete: 1.9,
};

export function bmi(weightKg: number, heightCm: number) {
	const h = heightCm / 100;
	return weightKg / (h * h);
}

export function mifflin({ sex, age, heightCm, weightKg }: { sex: Sex; age: number; heightCm: number; weightKg: number }) {
	return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161);
}

export function katch(weightKg: number, bodyFat: number) {
	const lean = weightKg * (1 - bodyFat / 100);
	return 370 + 21.6 * lean;
}

export function tdee(bmr: number, activity: keyof typeof activityFactors) {
	return bmr * activityFactors[activity];
}

export function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

export function round(n: number, digits = 0) {
	const p = 10 ** digits;
	return Math.round(n * p) / p;
}

export function proteinRange(weightKg: number, goal: Goal) {
	const low = goal === 'maintain' ? 1.4 : 1.6;
	const high = goal === 'aggressive-bulk' ? 2 : 2.2;
	return { low: round(weightKg * low), high: round(weightKg * high) };
}

export function calorieTarget(maintenance: number, goal: Goal) {
	const multipliers: Record<Goal, number> = {
		'fat-loss': 0.85,
		'lean-bulk': 1.08,
		'aggressive-bulk': 1.15,
		recomp: 0.98,
		maintain: 1,
	};
	return round(maintenance * multipliers[goal]);
}

export function strategyRecommendation(input: {
	bodyFat: number;
	sex?: Sex;
	trainingAge: 'beginner' | 'intermediate' | 'advanced';
	goalBias: Goal;
	proteinAdequate?: boolean;
}) {
	const scores: Record<Goal, number> = {
		'fat-loss': 15,
		'lean-bulk': 15,
		'aggressive-bulk': 8,
		recomp: 15,
		maintain: 12,
	};

	const bf = input.bodyFat;
	const sex = input.sex || 'male';
	const thresholds = sex === 'female'
		? { high: 24, midLow: 18, midHigh: 24, leanLow: 16, leanHigh: 18 }
		: { high: 20, midLow: 15, midHigh: 20, leanLow: 10, leanHigh: 15 };

	if (bf >= thresholds.high) scores['fat-loss'] += 28;
	if (bf >= thresholds.midLow && bf < thresholds.midHigh) scores.recomp += 18;
	if (bf >= thresholds.leanLow && bf < thresholds.leanHigh) scores['lean-bulk'] += 14;
	if (bf < thresholds.leanLow) scores['lean-bulk'] += 12;
	if (input.trainingAge === 'beginner') scores.recomp += 20;
	if (input.trainingAge === 'intermediate') scores['lean-bulk'] += 8;
	if (input.trainingAge === 'advanced') scores.maintain += 6;
	if (input.proteinAdequate) scores.recomp += 8;
	scores[input.goalBias] += 22;
	if (input.goalBias === 'aggressive-bulk' && bf > thresholds.midHigh) scores['aggressive-bulk'] -= 12;

	const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]) as [Goal, number][];
	const totalTop = ranked[0][1] + ranked[1][1];
	return {
		recommended: ranked[0][0],
		confidence: clamp(round((ranked[0][1] / totalTop) * 100), 52, 92),
		alternative: ranked[1][0],
		alternativeConfidence: clamp(round((ranked[1][1] / totalTop) * 100), 8, 48),
		reasons: [
			`Estimated body fat: ${bf}% (${sex})`,
			`Training age: ${input.trainingAge}`,
			`Goal preference: ${labelGoal(input.goalBias)}`,
			input.proteinAdequate ? 'Protein appears adequate for strategy support' : 'Protein adequacy was not confirmed',
		],
	};
}

export function labelGoal(goal: Goal) {
	return {
		'fat-loss': 'Cut / Fat Loss',
		'lean-bulk': 'Lean Bulk',
		'aggressive-bulk': 'Aggressive Bulk',
		recomp: 'Body Recomp',
		maintain: 'Maintenance',
	}[goal];
}

export const goalLabels: Record<Goal, string> = {
	'fat-loss': 'Cut / Fat Loss',
	'lean-bulk': 'Lean Bulk',
	'aggressive-bulk': 'Aggressive Bulk',
	recomp: 'Body Recomposition',
	maintain: 'Maintenance',
};

export function kgToLb(kg: number) { return kg * 2.2046226218; }
export function lbToKg(lb: number) { return lb / 2.2046226218; }
export function cmToIn(cm: number) { return cm / 2.54; }
export function inToCm(val: number) { return val * 2.54; }

/** Shared pace and timeline calculation for Strategy Finder and assess page */
export function paceAndTimeline(
	recommended: Goal,
	weightKg: number,
	unit: 'metric' | 'imperial' = 'metric',
	rDecay = 0.99
): { paceText: string; timelineText: string } {
	function fmt(kg: number) {
		if (unit === 'imperial') return `${round(kg * 2.2046226218, 2)} lb`;
		return `${round(kg, 2)} kg`;
	}

	if (recommended === 'fat-loss') {
		const pace = -weightKg * 0.0075;
		const target = -weightKg * 0.08;
		const term = (target * (1 - rDecay)) / pace;
		const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 16;
		return {
			paceText: `Lose ~${fmt(Math.abs(pace))}/week`,
			timelineText: `~${round(etaWeeks, 1)} weeks to reach 8% reduction`,
		};
	}
	if (recommended === 'lean-bulk') {
		const pace = weightKg * 0.002;
		const target = weightKg * 0.04;
		const term = (target * (1 - rDecay)) / pace;
		const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 24;
		return {
			paceText: `Gain ~${fmt(pace)}/week`,
			timelineText: `~${round(etaWeeks, 1)} weeks to build 4% lean mass`,
		};
	}
	if (recommended === 'aggressive-bulk') {
		const pace = weightKg * 0.004;
		const target = weightKg * 0.06;
		const term = (target * (1 - rDecay)) / pace;
		const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 16;
		return {
			paceText: `Gain ~${fmt(pace)}/week`,
			timelineText: `~${round(etaWeeks, 1)} weeks to target weight`,
		};
	}
	if (recommended === 'recomp') {
		return { paceText: 'Parity (Flat scale)', timelineText: '12 - 16 weeks (recommended phase block)' };
	}
	return { paceText: 'Flat Weight', timelineText: 'Ongoing' };
}

export function calculateAdherenceScore(checkins: any[]): number {
	if (checkins.length === 0) return 0;
	const lastCheckins = checkins.slice(0, 4); // look at last 4 logs
	const sum = lastCheckins.reduce((acc, curr) => acc + (curr.adherence || 0), 0);
	return Math.round(sum / lastCheckins.length);
}

export function calculateBodyCompScore(input: {
	weightKg: number;
	heightCm: number;
	bodyFat?: number;
	waistCm?: number;
	sex: Sex;
}): { score: number; rating: string; details: string[] } {
	const { weightKg, heightCm, bodyFat, waistCm, sex } = input;
	let scores: number[] = [];
	let details: string[] = [];

	// 1. BMI Component (screening weight relative to height)
	const wBmi = weightKg / ((heightCm / 100) ** 2);
	let bmiScore = 100;
	if (wBmi < 18.5) {
		bmiScore = 100 - (18.5 - wBmi) * 10;
		details.push("BMI indicates underweight range.");
	} else if (wBmi > 24.9) {
		bmiScore = 100 - (wBmi - 24.9) * 4;
		details.push("BMI indicates overweight range.");
	} else {
		details.push("BMI is in the healthy range (18.5 - 24.9).");
	}
	scores.push(clamp(Math.round(bmiScore), 20, 100));

	// 2. Waist-to-Height Ratio (WHtR) Component (central adiposity)
	if (waistCm) {
		const whtr = waistCm / heightCm;
		let whtrScore = 100;
		if (whtr < 0.40) {
			whtrScore = 100 - (0.40 - whtr) * 300;
			details.push(`Waist-to-height ratio (${whtr.toFixed(2)}) is low.`);
		} else if (whtr > 0.50) {
			whtrScore = 100 - (whtr - 0.50) * 400;
			details.push(`Waist-to-height ratio (${whtr.toFixed(2)}) indicates central fat accumulation.`);
		} else {
			details.push("Waist-to-height ratio is in the healthy zone (0.40 - 0.50).");
		}
		scores.push(clamp(Math.round(whtrScore), 20, 100));
	}

	// 3. Body Fat Component (relative adiposity)
	if (bodyFat) {
		let bfScore = 100;
		if (sex === 'male') {
			if (bodyFat < 8) {
				bfScore = 100 - (8 - bodyFat) * 8;
				details.push("Body fat is extremely low (risk of hormonal fatigue).");
			} else if (bodyFat > 20) {
				bfScore = 100 - (bodyFat - 20) * 3;
				details.push("Body fat is higher than optimal conditioning range.");
			} else {
				details.push("Body fat percentage is in the healthy conditioning zone.");
			}
		} else { // female
			if (bodyFat < 16) {
				bfScore = 100 - (16 - bodyFat) * 6;
				details.push("Body fat is low (risk of ammenorrhea/fatigue).");
			} else if (bodyFat > 28) {
				bfScore = 100 - (bodyFat - 28) * 3;
				details.push("Body fat is higher than optimal conditioning range.");
			} else {
				details.push("Body fat percentage is in the healthy conditioning zone.");
			}
		}
		scores.push(clamp(Math.round(bfScore), 20, 100));
	}

	const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
	let rating = "Fair";
	if (averageScore >= 85) rating = "Excellent";
	else if (averageScore >= 70) rating = "Good";
	else if (averageScore >= 50) rating = "Moderate";
	else rating = "Needs Attention";

	return { score: averageScore, rating, details };
}

export type PlateauDiagnosis = {
	plateauDetected: boolean;
	message: string;
	actionPlan: string;
	dietarySuggestions: string[];
};

export function analyzePlateau(
	checkins: any[],
	goal: Goal,
	latestAssessment: any
): PlateauDiagnosis {
	if (checkins.length < 3) {
		return {
			plateauDetected: false,
			message: "Need at least 3 weekly check-ins to perform plateau analysis.",
			actionPlan: "Keep logging your weight weekly to establish a trend database.",
			dietarySuggestions: []
		};
	}

	// Sort checkins chronologically (oldest first)
	const sorted = [...checkins].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	const first = sorted[0];
	const last = sorted[sorted.length - 1];
	const durationDays = (new Date(last.date).getTime() - new Date(first.date).getTime()) / 86400000;
	
	if (durationDays < 14) {
		return {
			plateauDetected: false,
			message: "Log history spans less than 14 days. Plateau analysis requires at least 2 weeks of logs.",
			actionPlan: "Maintain consistency and log your weight weekly under the same conditions.",
			dietarySuggestions: []
		};
	}

	// Check rate of change over the last 14-21 days
	const recentCheckins = sorted.filter(c => (new Date(last.date).getTime() - new Date(c.date).getTime()) / 86400000 <= 21);
	if (recentCheckins.length < 3) {
		return {
			plateauDetected: false,
			message: "Insufficient check-in density in the last 21 days.",
			actionPlan: "Try to log at least once per week consistently.",
			dietarySuggestions: []
		};
	}
	
	const weightStart = recentCheckins[0].weight;
	const weightEnd = recentCheckins[recentCheckins.length - 1].weight;
	const weightChange = weightEnd - weightStart;
	const avgAdherence = calculateAdherenceScore(recentCheckins);

	// Diagnose plateau based on goal
	let plateauDetected = false;
	let message = "Your weight progress is moving steadily toward your target.";
	let actionPlan = "Continue following your current strategy and calorie targets.";
	let dietarySuggestions: string[] = [];

	if (goal === 'fat-loss') {
		// Expecting weight loss. If weight change is flat (-0.2kg to +0.2kg) over 2-3 weeks
		if (Math.abs(weightChange) <= 0.25) {
			plateauDetected = true;
			if (avgAdherence >= 80) {
				message = "True Fat Loss Plateau detected. Your energy intake matches output despite high adherence.";
				actionPlan = "Your metabolism has adjusted to the deficit. Consider a minor course correction: decrease daily calorie targets by 100-150 kcal or increase daily activity (e.g., target +1,500 steps/day) to re-establish a deficit.";
				dietarySuggestions = [
					"Increase high-satiety whole foods (leafy greens, cruciferous vegetables) to suppress hunger.",
					"Keep daily protein high (1.6 - 2.2 g/kg weight) to prevent lean tissue wasting.",
					"Ensure fluid intake is at least 2.5 - 3 liters daily to regulate cellular hydration.",
					"Consider a 2-day diet break at maintenance calories if diet fatigue is high."
				];
			} else {
				message = "Consistency-related plateau detected. Adherence averages under 80%.";
				actionPlan = "Do not change your calorie targets. Focus on improving adherence consistency before adjusting calories. Plan meals ahead and track macros accurately.";
				dietarySuggestions = [
					"Focus on meal-prep to avoid high-fat convenience options.",
					"Identify eating patterns on weekends when adherence typically drops.",
					"Stay hydrated before meals to promote natural satiety."
				];
			}
		}
	} else if (goal === 'lean-bulk' || goal === 'aggressive-bulk') {
		// Expecting weight gain. If weight change is flat or negative over 2-3 weeks
		if (weightChange <= 0.1) {
			plateauDetected = true;
			if (avgAdherence >= 80) {
				message = "Muscle Gain Plateau detected. Calorie surplus is insufficient to support tissue synthesis.";
				actionPlan = "Increase your daily calorie intake by 100-150 kcal (add small snacks like nuts or yogurt) and monitor the scale for the next 2 weeks.";
				dietarySuggestions = [
					"Incorporate calorie-dense fats (olive oil, avocados, nut butters) to easily hit higher surplus targets.",
					"Consume a meal containing 30-40g protein and carbohydrates within 2 hours post-workout.",
					"Monitor training progression: make sure you are achieving progressive overload in the gym."
				];
			} else {
				message = "Consistency-related bulking plateau detected. Adherence is below 80%.";
				actionPlan = "Ensure you are consistently eating in a surplus daily. Missing meals will cancel out the calorie surplus needed for muscle synthesis.";
				dietarySuggestions = [
					"Eat on a structured schedule (e.g. 4 meals daily) to guarantee target completion.",
					"Use liquid calories (shakes containing oats, whey, fruit) to hit targets when appetite is low."
				];
			}
		}
	} else if (goal === 'recomp') {
		const bfStart = recentCheckins[0].bodyFat;
		const bfEnd = recentCheckins[recentCheckins.length - 1].bodyFat;
		if (bfStart && bfEnd && Math.abs(bfEnd - bfStart) < 0.2 && Math.abs(weightChange) <= 0.3) {
			plateauDetected = true;
			message = "Body Recomposition Plateau detected. Body fat and weight are stable.";
			actionPlan = "Recomposition progress is naturally slow. If progress has completely stalled, consider transitioning to a structured 8-12 week fat loss phase or a clean bulk phase to force physical adaptations.";
			dietarySuggestions = [
				"Verify protein is at the upper limit (2.2 g/kg weight) to maximize muscle protein synthesis.",
				"Double check portion sizes of calorie-dense fats to make sure you are not eating at a slight surplus.",
				"Assess lifting intensity: prioritize lifting close to muscular failure."
			];
		}
	}

	return { plateauDetected, message, actionPlan, dietarySuggestions };
}

export type ForecastResult = {
	pacePerWeek: number;
	etaWeeks: number | null;
	predictedCompletionDate: string | null;
	predictions: { date: string; weight: number; isProjected: boolean }[];
	status: string;
};

export function forecastProgress(checkins: any[], goalWeight: number): ForecastResult {
	const sorted = [...checkins].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
	const predictions: { date: string; weight: number; isProjected: boolean }[] = sorted.map(c => ({
		date: c.date,
		weight: c.weight,
		isProjected: false
	}));

	if (sorted.length < 2) {
		return { pacePerWeek: 0, etaWeeks: null, predictedCompletionDate: null, predictions, status: 'Need more data' };
	}

	const first = sorted[0];
	const last = sorted[sorted.length - 1];
	const days = Math.max(1, (new Date(last.date).getTime() - new Date(first.date).getTime()) / 86400000);
	
	// calculate pace in kg per week
	const pacePerWeek = ((last.weight - first.weight) / days) * 7;
	const remaining = goalWeight - last.weight;
	
	// Verify user is moving in the right direction
	const movingToward = Math.sign(remaining) === Math.sign(pacePerWeek) && Math.abs(pacePerWeek) > 0.05;
	
	let etaWeeks: number | null = null;
	let predictedCompletionDate: string | null = null;
	const rDecay = 0.99; // weekly metabolic adaptation decay factor (compounds to ~0.96 monthly)

	if (movingToward && pacePerWeek !== 0) {
		const term = (remaining * (1 - rDecay)) / pacePerWeek;
		if (term < 0.99) {
			etaWeeks = Math.log(1 - term) / Math.log(rDecay);
		} else {
			// Metabolic adaptation stalls progress before goal is reached (plateau)
			etaWeeks = null;
		}

		if (etaWeeks !== null) {
			const completionMs = new Date(last.date).getTime() + (etaWeeks * 7 * 86400000);
			predictedCompletionDate = new Date(completionMs).toISOString().slice(0, 10);
		}
		
		// Generate future projection data points showing decay curve
		const projectionWeeks = etaWeeks !== null ? Math.min(12, Math.ceil(etaWeeks)) : 8;
		for (let i = 1; i <= projectionWeeks; i++) {
			const projDateMs = new Date(last.date).getTime() + (i * 7 * 86400000);
			const projDateStr = new Date(projDateMs).toISOString().slice(0, 10);
			const cumDecay = (1 - Math.pow(rDecay, i)) / (1 - rDecay);
			const projWeight = last.weight + (pacePerWeek * cumDecay);
			predictions.push({
				date: projDateStr,
				weight: round(projWeight, 1),
				isProjected: true
			});
		}
	}

	const status = movingToward ? 'On track' : 'Needs trend direction';

	return {
		pacePerWeek: round(pacePerWeek, 2),
		etaWeeks: etaWeeks ? round(etaWeeks, 1) : null,
		predictedCompletionDate,
		predictions,
		status
	};
}

export function calculateNavyBodyFat({ sex, waistCm, neckCm, hipCm, heightCm }: { sex: Sex; waistCm: number; neckCm: number; hipCm?: number; heightCm: number }): number {
	const waistIn = waistCm / 2.54;
	const neckIn = neckCm / 2.54;
	const heightIn = heightCm / 2.54;
	
	if (sex === 'male') {
		const diff = waistIn - neckIn;
		if (diff <= 0 || heightIn <= 0) return 0;
		return round(86.010 * Math.log10(diff) - 70.041 * Math.log10(heightIn) + 36.76, 1);
	} else {
		const hipIn = (hipCm || 0) / 2.54;
		const val = waistIn + hipIn - neckIn;
		if (val <= 0 || heightIn <= 0) return 0;
		return round(163.205 * Math.log10(val) - 97.684 * Math.log10(heightIn) - 78.387, 1);
	}
}

export function calculateFFMI(weightKg: number, heightCm: number, bodyFat: number) {
	const lbmKg = weightKg * (1 - bodyFat / 100);
	const heightM = heightCm / 100;
	const ffmi = lbmKg / (heightM * heightM);
	const normalizedFfmi = ffmi + 6.1 * (1.8 - heightM);
	return {
		lbmKg: round(lbmKg, 1),
		ffmi: round(ffmi, 2),
		normalizedFfmi: round(normalizedFfmi, 2)
	};
}


export function safeJsonParse<T>(value: string | null, fallback: T): T {
	if (!value) return fallback;
	try {
		return JSON.parse(value) as T;
	} catch {
		return fallback;
	}
}
