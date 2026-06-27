import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
	mifflin,
	strategyRecommendation,
	calorieTarget,
	calculateNavyBodyFat,
	paceAndTimeline,
} from './engines.ts';

describe('BodyCompOS Engines Unit Tests', () => {
	test('mifflin BMR formula', () => {
		// Test male calculation
		const bmrMale = mifflin({ sex: 'male', age: 30, heightCm: 180, weightKg: 80 });
		// Mifflin formula: 10 * weight + 6.25 * height - 5 * age + 5
		// 10 * 80 + 6.25 * 180 - 5 * 30 + 5 = 800 + 1125 - 150 + 5 = 1780
		assert.equal(bmrMale, 1780);

		// Test female calculation
		const bmrFemale = mifflin({ sex: 'female', age: 30, heightCm: 165, weightKg: 60 });
		// 10 * 60 + 6.25 * 165 - 5 * 30 - 161 = 600 + 1031.25 - 150 - 161 = 1320.25
		assert.equal(bmrFemale, 1320.25);
	});

	test('calorieTarget for different goals', () => {
		const maintenance = 2000;
		
		// cut (fat-loss) at 85% TDEE
		assert.equal(calorieTarget(maintenance, 'fat-loss'), 1700);

		// recomp at 98% TDEE
		assert.equal(calorieTarget(maintenance, 'recomp'), 1960);

		// lean-bulk at 108% TDEE
		assert.equal(calorieTarget(maintenance, 'lean-bulk'), 2160);

		// aggressive-bulk at 115% TDEE
		assert.equal(calorieTarget(maintenance, 'aggressive-bulk'), 2300);

		// maintain at 100% TDEE
		assert.equal(calorieTarget(maintenance, 'maintain'), 2000);
	});

	test('strategyRecommendation decision matrix', () => {
		// High body fat female beginner who prefers recomp gets recomp (due to newbie gains bonus)
		const recBeginner = strategyRecommendation({
			bodyFat: 32,
			sex: 'female',
			trainingAge: 'beginner',
			goalBias: 'recomp'
		});
		assert.equal(recBeginner.recommended, 'recomp');

		// High body fat female intermediate who prefers recomp gets fat-loss (due to body fat priority)
		const recIntermediate = strategyRecommendation({
			bodyFat: 32,
			sex: 'female',
			trainingAge: 'intermediate',
			goalBias: 'recomp'
		});
		assert.equal(recIntermediate.recommended, 'fat-loss');

		// Lean male beginner who wants to recomp
		const rec2 = strategyRecommendation({
			bodyFat: 12,
			sex: 'male',
			trainingAge: 'beginner',
			goalBias: 'recomp'
		});
		assert.equal(rec2.recommended, 'recomp');

		// Very lean male who wants to bulk
		const rec3 = strategyRecommendation({
			bodyFat: 8,
			sex: 'male',
			trainingAge: 'intermediate',
			goalBias: 'lean-bulk'
		});
		assert.equal(rec3.recommended, 'lean-bulk');
	});

	test('calculateNavyBodyFat formula', () => {
		// Test male calculation
		const bfMale = calculateNavyBodyFat({
			sex: 'male',
			waistCm: 85,
			neckCm: 38,
			heightCm: 175
		});
		assert.ok(bfMale > 5 && bfMale < 30);

		// Test female calculation (requires hip)
		const bfFemale = calculateNavyBodyFat({
			sex: 'female',
			waistCm: 70,
			neckCm: 33,
			hipCm: 94,
			heightCm: 165
		});
		assert.ok(bfFemale > 10 && bfFemale < 40);
	});

	test('paceAndTimeline forecasts', () => {
		const resCut = paceAndTimeline('fat-loss', 80, 'metric');
		assert.ok(resCut.paceText.includes('Lose'));
		assert.ok(resCut.timelineText.includes('weeks'));

		const resBulk = paceAndTimeline('lean-bulk', 80, 'metric');
		assert.ok(resBulk.paceText.includes('Gain'));
		assert.ok(resBulk.timelineText.includes('weeks'));
	});
});
