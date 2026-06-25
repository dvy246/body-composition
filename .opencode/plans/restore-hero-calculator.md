# Plan: Restore Simplified Calculator to Hero (Right Column)

## Files to Edit

### 1. `src/components/StrategyFinder.astro`

**Replace lines 101-103** (closing tags) with:

1. Right column form HTML
2. Closing grid `</div>` 
3. Closing section `</section>`
4. `<script>` block with calculation logic

#### Full right column HTML (insert between hero `</div>` and grid `</div>`):

```astro
		<!-- Right Column: Simplified Interactive Calculator -->
		<div class="flex flex-col gap-4">
			<div class="surface rounded-2xl p-5">
				<div class="flex items-center justify-between border-b border-border pb-4">
					<div>
						<p class="eyebrow">Interactive Engine</p>
						<h2 class="text-lg font-black text-foreground">Strategy Finder</h2>
					</div>
					<div class="segmented" role="group" aria-label="Measurement units">
						<button type="button" data-strategy-unit="metric" aria-pressed="true">Metric</button>
						<button type="button" data-strategy-unit="imperial" aria-pressed="false">Imperial</button>
					</div>
				</div>

				<form id="strategy-form" class="mt-4 grid gap-3 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<p class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Personal Information</p>
						<div class="border-t border-border/30 mt-1.5"></div>
					</div>

					<div class="field">
						<label for="sex">Biological Sex</label>
						<div class="select-wrap">
							<select id="sex" required>
								<option value="male">Male</option>
								<option value="female">Female</option>
							</select>
						</div>
					</div>
					<div class="field">
						<label for="age">Age (years)</label>
						<input id="age" type="number" min="18" max="90" value="32" required />
					</div>
					<div class="field">
						<label for="height">Height <span data-strategy-height-unit>(cm)</span></label>
						<input id="height" type="number" min="120" max="230" value="175" required />
					</div>
					<div class="field">
						<label for="weight">Weight <span data-strategy-weight-unit>(kg)</span></label>
						<input id="weight" type="number" min="35" max="250" step="0.1" value="82" required />
					</div>

					<div class="sm:col-span-2 mt-1">
						<p class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Body Composition</p>
						<div class="border-t border-border/30 mt-1.5"></div>
					</div>

					<div class="field sm:col-span-2">
						<label for="bodyFat">Estimated Body Fat %</label>
						<input id="bodyFat" type="number" min="3" max="60" step="0.1" value="22" required />
					</div>

					<div class="sm:col-span-2 mt-1">
						<p class="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Training &amp; Goals</p>
						<div class="border-t border-border/30 mt-1.5"></div>
					</div>

					<div class="field">
						<label for="activity">Daily Activity Level</label>
						<div class="select-wrap">
							<select id="activity" required>
								<option value="sedentary">Sedentary (desk-job)</option>
								<option value="light">Lightly Active (active-job/walks)</option>
								<option value="moderate" selected>Moderately Active (trains 3-5x/week)</option>
								<option value="active">Highly Active (trains 6-7x/week)</option>
								<option value="athlete">Competitive Athlete</option>
							</select>
						</div>
					</div>
					<div class="field">
						<label for="goalBias">Strategy Direction</label>
						<div class="select-wrap">
							<select id="goalBias" required>
								<option value="fat-loss">Fat Loss Focused</option>
								<option value="recomp" selected>Body Recomposition</option>
								<option value="lean-bulk">Lean Muscle Bulk</option>
								<option value="aggressive-bulk">Aggressive Mass Gain</option>
								<option value="maintain">Weight Maintenance</option>
							</select>
						</div>
					</div>

					<button class="button-primary sm:col-span-2 mt-1" type="submit">Start Assessment</button>
				</form>

				<div id="strategy-result" class="result-container mt-5 border-t border-border pt-4" aria-live="polite" tabindex="-1">
					<div class="result-placeholder">
						<svg class="text-muted-foreground" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
						<p class="mt-2 text-sm font-semibold text-foreground">Awaiting Assessment Inputs</p>
						<p class="mt-1 text-xs text-muted-foreground max-w-xs">Enter your stats to generate a personalized strategy.</p>
					</div>
				</div>
			</div>

			<p class="text-center text-[10px] text-muted-foreground">
				Need more detail?
				<a href="/assess" class="underline hover:text-accent font-medium">Use the Full Assessment</a>
			</p>
		</div>
	</div>
</section>
```

#### `<script>` block (append after `</section>`):

```astro
<script>
	const activityFactors = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, athlete: 1.9 };
	const labels = { 
		'fat-loss': 'Cut / Fat Loss', 
		'lean-bulk': 'Lean Bulk', 
		'aggressive-bulk': 'Aggressive Bulk', 
		'recomp': 'Body Recomposition', 
		'maintain': 'Maintenance' 
	};
	let strategyUnit = 'metric';
	
	function round(n, d = 0) { const p = 10 ** d; return Math.round(n * p) / p; }
	function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
	function kgToLb(kg) { return kg * 2.2046226218; }
	function lbToKg(lb) { return lb / 2.2046226218; }
	function cmToIn(cm) { return cm / 2.54; }
	function inToCm(value) { return value * 2.54; }
	
	function mifflin(sex, age, heightCm, weightKg) { 
		return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'male' ? 5 : -161); 
	}
	
	function recommend(input) {
		const scores = { 'fat-loss': 15, 'lean-bulk': 15, 'aggressive-bulk': 8, recomp: 15, maintain: 12 };
		const bf = input.bodyFat;
		
		if (bf >= 28) scores['fat-loss'] += 28;
		if (bf >= 20 && bf < 28) scores.recomp += 18;
		if (bf >= 12 && bf < 20) scores['lean-bulk'] += 14;
		if (bf < 12) scores['lean-bulk'] += 12;
		
		if (input.trainingAge === 'beginner') scores.recomp += 20;
		if (input.trainingAge === 'intermediate') scores['lean-bulk'] += 8;
		if (input.trainingAge === 'advanced') scores.maintain += 6;
		
		if (input.proteinAdequate) scores.recomp += 8;
		scores[input.goalBias] += 22;
		
		if (input.goalBias === 'aggressive-bulk' && bf > 20) scores['aggressive-bulk'] -= 12;
		
		const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
		const totalTop = ranked[0][1] + ranked[1][1];
		
		return {
			recommended: ranked[0][0],
			confidence: clamp(round((ranked[0][1] / totalTop) * 100), 52, 92),
			alternative: ranked[1][0],
			alternativeConfidence: clamp(round((ranked[1][1] / totalTop) * 100), 8, 48),
		};
	}
	
	function caloriesForGoal(tdee, goal) {
		return round(tdee * ({ 'fat-loss': 0.85, 'lean-bulk': 1.08, 'aggressive-bulk': 1.15, recomp: 0.98, maintain: 1 }[goal]));
	}
	
	function setStrategyUnit(unit) {
		if (unit === strategyUnit) return;
		const form = document.querySelector('#strategy-form') as HTMLFormElement;
		if (!form) return;
		
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
		
		strategyUnit = unit;
		document.querySelectorAll('[data-strategy-unit]').forEach((button) => button.setAttribute('aria-pressed', String(button.getAttribute('data-strategy-unit') === unit)));
		document.querySelectorAll('[data-strategy-height-unit]').forEach((label) => label.textContent = unit === 'metric' ? '(cm)' : '(in)');
		document.querySelectorAll('[data-strategy-weight-unit]').forEach((label) => label.textContent = unit === 'metric' ? '(kg)' : '(lb)');
	}
	
	document.querySelectorAll('[data-strategy-unit]').forEach((button) => {
		button.addEventListener('click', () => setStrategyUnit(button.getAttribute('data-strategy-unit')));
	});
	
	document.querySelector('#strategy-form')?.addEventListener('submit', (event) => {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		
		const rawInput = {
			sex: form.sex.value,
			age: Number(form.age.value),
			heightCm: strategyUnit === 'metric' ? Number(form.height.value) : inToCm(Number(form.height.value)),
			weightKg: strategyUnit === 'metric' ? Number(form.weight.value) : lbToKg(Number(form.weight.value)),
			bodyFat: Number(form.bodyFat.value || 0),
			activity: form.activity.value,
			trainingAge: 'intermediate',
			goalBias: form.goalBias.value,
			protein: 0,
		};

		const proteinAdequate = false;
		const rec = recommend({ ...rawInput, proteinAdequate });
		const bmr = mifflin(rawInput.sex, rawInput.age, rawInput.heightCm, rawInput.weightKg);
		const maintenance = round(bmr * activityFactors[rawInput.activity]);
		const target = caloriesForGoal(maintenance, rec.recommended);
		const proteinLow = round(rawInput.weightKg * 1.6);
		const proteinHigh = round(rawInput.weightKg * 2.2);
		
		const saved = { ...rawInput, proteinAdequate, ...rec, maintenance, target, proteinLow, proteinHigh, createdAt: new Date().toISOString() };
		localStorage.setItem('bodycompos.latestAssessment', JSON.stringify(saved));
		
		const history = JSON.parse(localStorage.getItem('bodycompos.assessments') || '[]');
		history.unshift(saved);
		localStorage.setItem('bodycompos.assessments', JSON.stringify(history.slice(0, 12)));
		
		let paceText = 'Flat Weight';
		let timelineText = 'Ongoing';
		const rDecay = 0.99;
		
		if (rec.recommended === 'fat-loss') {
			const pace = -rawInput.weightKg * 0.0075;
			const targetWeightChange = -rawInput.weightKg * 0.08;
			const term = (targetWeightChange * (1 - rDecay)) / pace;
			const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 16;
			
			const val = strategyUnit === 'metric' ? `${round(Math.abs(pace), 2)} kg` : `${round(kgToLb(Math.abs(pace)), 2)} lb`;
			paceText = `Lose ~${val}/week`;
			timelineText = `~${round(etaWeeks, 1)} weeks to reach 8% reduction`;
		} else if (rec.recommended === 'lean-bulk') {
			const pace = rawInput.weightKg * 0.002;
			const targetWeightChange = rawInput.weightKg * 0.04;
			const term = (targetWeightChange * (1 - rDecay)) / pace;
			const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 24;
			
			const val = strategyUnit === 'metric' ? `${round(pace, 2)} kg` : `${round(kgToLb(pace), 2)} lb`;
			paceText = `Gain ~${val}/week`;
			timelineText = `~${round(etaWeeks, 1)} weeks to build 4% lean mass`;
		} else if (rec.recommended === 'aggressive-bulk') {
			const pace = rawInput.weightKg * 0.004;
			const targetWeightChange = rawInput.weightKg * 0.06;
			const term = (targetWeightChange * (1 - rDecay)) / pace;
			const etaWeeks = term < 0.99 ? Math.log(1 - term) / Math.log(rDecay) : 16;
			
			const val = strategyUnit === 'metric' ? `${round(pace, 2)} kg` : `${round(kgToLb(pace), 2)} lb`;
			paceText = `Gain ~${val}/week`;
			timelineText = `~${round(etaWeeks, 1)} weeks to target weight`;
		} else if (rec.recommended === 'recomp') {
			paceText = 'Parity (Flat scale)';
			timelineText = '12 - 16 weeks (recommended phase block)';
		}
		
		const outputContainer = document.querySelector('#strategy-result');
		if (outputContainer) {
			outputContainer.classList.add('has-result');
			outputContainer.innerHTML = `
				<div class="result-content grid gap-3 text-left">
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-[10px] font-bold uppercase text-accent tracking-wider">Assessment Result</p>
							<p class="mt-1 text-xl font-black text-foreground">${labels[rec.recommended]}</p>
						</div>
						<span class="badge badge-accent shrink-0 mt-1">${rec.confidence}% Confidence</span>
					</div>
					
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="result-card">
							<p class="text-[10px] font-bold uppercase text-muted-foreground">Alternative</p>
							<p class="mt-1 text-sm font-bold text-foreground">${labels[rec.alternative]} (${rec.alternativeConfidence}%)</p>
						</div>
						<div class="result-card bg-accent/5 border-accent/20">
							<p class="text-[10px] font-bold uppercase text-accent tracking-wider">Starting Calories</p>
							<p class="mt-1 text-lg font-black text-foreground">${target} <span class="text-[10px] font-normal text-muted-foreground">kcal</span></p>
						</div>
					</div>

					<div class="grid gap-3 sm:grid-cols-2">
						<div class="result-card bg-success/5 border-success/20">
							<p class="text-[10px] font-bold uppercase text-success tracking-wider">Protein Range</p>
							<p class="mt-1 text-lg font-black text-foreground">${proteinLow} - ${proteinHigh} <span class="text-[10px] font-normal text-muted-foreground">g</span></p>
						</div>
						<div class="result-card">
							<p class="text-[10px] font-bold uppercase text-muted-foreground">Timeline</p>
							<p class="mt-1 text-sm font-black text-foreground">${timelineText}</p>
						</div>
					</div>

					<div class="flex flex-col sm:flex-row gap-3 pt-1">
						<a class="button-primary flex-1 text-center text-xs" href="/dashboard">Track Progress</a>
						<a class="button-secondary flex-1 text-center text-xs" href="/assess">Full Assessment</a>
					</div>
				</div>
			`;
			
			outputContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			(outputContainer as HTMLElement).focus();
		}
	});
</script>
```

### Current file structure (before edit)

The file currently ends with:
```
	</div>      <!-- line 101: closes hero flex -->
	</div>      <!-- line 102: closes grid -->
</section>    <!-- line 103: closes section -->
```

After edit, the structure becomes:
```
	</div>                        <!-- closes hero flex -->
		<!-- Right Column HTML -->  <!-- new right column -->
		</div>                     <!-- closes right column wrapper -->
	</div>                        <!-- closes grid -->
</section>                       <!-- closes section -->
<script>...</script>             <!-- new script block -->
```

## Verification

1. Run `npm run build` — should pass with 37 pages
2. Restart dev server: `npm run astro dev stop && npm run astro dev --background`
3. Check homepage at `http://localhost:4321/` — two-column layout visible
4. Toggle Metric/Imperial — unit labels update
5. Fill form and submit — result card appears with strategy, calories, protein, timeline
6. Click "Full Assessment" link below form — navigates to /assess
7. Mobile viewport — hero content stacks above form

## SEO Notes

- The `<h1>` with primary keyword "strategy" and "body composition" stays prominent
- Schema markup remains on the page (from Layout)
- Benefit bullets contain natural language that search engines index
- The right column content is SVG-fallback friendly (form labels are text)
