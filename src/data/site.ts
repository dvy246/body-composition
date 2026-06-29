export const SITE = {
	name: 'BodyCompOS',
	origin: 'https://bodystrategyhub.com',
	description:
		'BodyCompOS is a local-first body composition strategy platform for assessment, calorie and protein targets, forecasting, and progress reassessment.',
	lastUpdated: '2026-06-27',
	adsenseId: 'ca-pub-5910777021067126', // Set your Google AdSense Publisher ID (e.g. 'ca-pub-XXXXXXXXXXXXXXXX') here to enable Auto Ads
};

export const DOMAIN = SITE.origin;

export type Calculator = {
	slug: string;
	title: string;
	seoTitle: string;
	metaDescription: string;
	mode: string;
	description: string;
	primaryInputs: string[];
	formula: string;
	interpretation: string;
	related: string[];
	faqs: [string, string][];
	canonicalUrl?: string;
};

const defaultFaqs: [string, string][] = [
	[
		'Are these results medical advice?',
		'No. BodyCompOS provides educational estimates for planning and reassessment. Use the methodology and disclaimer pages for the full limitations.',
	],
	[
		'How should I use the estimate?',
		'Use it as a starting point, then compare it with several weeks of consistent trend data before making large changes.',
	],
];

export const calculators: Calculator[] = [
	{
		slug: 'tdee-calculator',
		title: 'TDEE Calculator',
		seoTitle: 'TDEE Calculator - Total Daily Energy Expenditure Calculator | BodyCompOS',
		metaDescription: 'Estimate your Total Daily Energy Expenditure (TDEE) and maintenance calories using Mifflin-St Jeor and Katch-McArdle equations.',
		mode: 'tdee',
		description: 'Estimate Total Daily Energy Expenditure, Basal Metabolic Rate (BMR), and maintenance calories using Mifflin-St Jeor BMR, refined with Katch-McArdle when body fat is available. TDEE is the starting foundation for all calorie planning, fat loss, and muscle gain strategy.',
		primaryInputs: ['Sex', 'Age', 'Height', 'Weight', 'Activity level', 'Optional body fat'],
		formula: 'Uses Mifflin-St Jeor by default and Katch-McArdle when a body fat estimate is available.',
		interpretation: 'Treat TDEE and BMR as starting maintenance estimates. Real maintenance calories are confirmed when your body weight trend remains stable.',
		related: ['calorie-calculator', 'protein-calculator', 'macro-calculator'],
		faqs: [
			['What is the difference between BMR and TDEE?', 'BMR (Basal Metabolic Rate) is the energy your body requires to function at complete rest. TDEE (Total Daily Energy Expenditure) is your BMR multiplied by your physical activity factor, representing your actual daily maintenance calories.'],
			['How accurate is Mifflin-St Jeor vs Katch-McArdle?', 'Mifflin-St Jeor is highly accurate for the general population. Katch-McArdle is superior for lean or athletic individuals because it uses Lean Body Mass (LBM) directly, avoiding body fat statistical deviations.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'bmr-calculator',
		title: 'BMR Calculator',
		seoTitle: 'BMR Calculator - Basal Metabolic Rate Calculator | BodyCompOS',
		metaDescription: 'Calculate your Basal Metabolic Rate (BMR) to discover the resting calorie floor your body needs to survive.',
		mode: 'bmr',
		description: 'Calculate your Basal Metabolic Rate (BMR), which represents the energy your body requires to function at complete rest. Uses Mifflin-St Jeor or Katch-McArdle equations to establish your baseline metabolic floor.',
		primaryInputs: ['Sex', 'Age', 'Height', 'Weight', 'Optional Body Fat'],
		formula: 'Uses Mifflin-St Jeor by default, switching to Katch-McArdle if body fat percentage is supplied.',
		interpretation: 'BMR is your baseline calorie burn. Multiplied by your activity level, it determines your TDEE (maintenance calories).',
		related: ['tdee-calculator', 'calorie-calculator', 'macro-calculator'],
		faqs: [
			['What is the difference between BMR and TDEE?', 'BMR is the caloric baseline at complete rest. TDEE includes all activity (steps, workouts, food digestion) and represents your total maintenance calories.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'body-fat-calculator',
		title: 'Body Fat Calculator',
		seoTitle: 'Body Fat Calculator - US Navy Circumference Method | BodyCompOS',
		metaDescription: 'Estimate body fat percentage using waist, neck, and hip circumference measurements with the scientific Navy method.',
		mode: 'bodyfat',
		description: 'Estimate body fat percentage using the US Navy Circumference Method. Widely used for its simplicity and reasonable accuracy compared to clinical standards. Requires waist and neck for men, and waist, hip, and neck for women.',
		primaryInputs: ['Sex', 'Height', 'Waist', 'Neck', 'Optional Hip'],
		formula: 'Uses sex-specific logarithmic equations based on circumference measurements relative to height.',
		interpretation: 'Body fat estimates represent body composition categories (essential, athletic, fit, average, excess). Track changes in measurements over time.',
		related: ['body-composition-calculator', 'lean-body-mass-calculator', 'ffmi-calculator'],
		faqs: [
			['How accurate is the Navy method?', 'For most individuals, the Navy method is within ±3-4% of DEXA scans, making it a very reliable tool for tracking relative changes in body composition.'],
			...defaultFaqs,
		],
	},

	{
		slug: 'calorie-calculator',
		title: 'Calorie Calculator',
		seoTitle: 'Daily Calorie Calculator - Targets for Cut, Bulk, and Recomp | BodyCompOS',
		metaDescription: 'Calculate daily calories for fat loss, muscle growth, or body recomposition based on your metabolic stats.',
		mode: 'calorie',
		description: 'Calculate daily calorie targets for fat loss (cutting at a moderate 15% deficit), lean bulk (8% surplus), aggressive bulk (15% surplus), or recomposition (98%). Moderate ranges optimize fat mobilization and muscle retention.',
		primaryInputs: ['Maintenance estimate', 'Goal', 'Weight', 'Activity level'],
		formula: 'Applies conservative multipliers (deficit or surplus) to estimated maintenance calories by strategy.',
		interpretation: 'Use the target as a first pass and reassess after 2-4 weeks of consistent weight and adherence tracking.',
		related: ['tdee-calculator', 'protein-calculator', 'macro-calculator'],
		faqs: [
			['How aggressive should a deficit be?', 'BodyCompOS recommends a moderate 15% deficit because extreme deficits trigger metabolic slowdown, increase muscle loss, and degrade training performance.'],
			['What is a controlled surplus?', 'A controlled surplus (5-8% above maintenance) minimizes excess body fat accumulation while supplying the surplus energy required to synthesize muscle tissue.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'protein-calculator',
		title: 'Protein Calculator',
		seoTitle: 'Protein Calculator - Daily Protein Intake for Muscle & Fat Loss | BodyCompOS',
		metaDescription: 'Determine daily protein needs in grams using ISSN guidelines for active individuals, fat loss phases, or muscle growth.',
		mode: 'protein',
		description: 'Estimate daily protein intake for muscle protein synthesis, fat loss, and lean mass retention. Based on ISSN guidelines: 1.6-2.2 g/kg body weight adjusted by goal. Higher end (2.2 g/kg) recommended during calorie deficit to prevent muscle catabolism.',
		primaryInputs: ['Weight', 'Goal'],
		formula: 'Uses a practical range around 1.6-2.2 g/kg body weight, adjusted conservatively by goal.',
		interpretation: 'The result is a daily range, not a single mandatory number. Consistency matters more than precision.',
		related: ['macro-calculator', 'calorie-calculator', 'body-recomposition-calculator'],
		faqs: [
			['Why is protein shown as a range?', 'A range is more useful because appetite, body size, goal, and food preferences vary.'],
			['Should I use lean body mass instead?', 'Lean body mass can refine estimates when body fat data is reliable, but body weight is often more practical.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'goal-timeline-calculator',
		title: 'Goal Timeline Calculator',
		seoTitle: 'Weight Loss Timeline Calculator - Fat Loss Goal ETA Planner | BodyCompOS',
		metaDescription: 'Estimate how long it will take to reach your target weight using non-linear metabolic adaptation decay forecasting.',
		mode: 'timeline',
		description: 'Forecast timeline to reach target body weight using compounding metabolic decay rather than linear projection. Accounts for metabolic adaptation with conservative weekly rates: 0.75% for fat loss, 0.2-0.4% for muscle gain. Generates non-linear projection curves for realistic planning.',
		primaryInputs: ['Current weight', 'Target weight', 'Goal direction'],
		formula: 'Uses conservative weekly rate assumptions based on the selected strategy and body weight.',
		interpretation: 'Timelines are planning ranges. Recalculate when your trend pace changes.',
		related: ['target-weight-calculator', 'muscle-gain-calculator'],
		faqs: [
			['Why is my timeline approximate?', 'Water weight, adherence, training status, and measurement noise can shift the real pace.'],
			['When should I reassess?', 'A monthly review is usually more useful than reacting to a single week.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'ffmi-calculator',
		title: 'FFMI Calculator',
		seoTitle: 'FFMI Calculator - Fat-Free Mass Index & Lean Mass Calculator | BodyCompOS',
		metaDescription: 'Calculate your Fat-Free Mass Index (FFMI) with Kouri height-normalization to assess muscular potential.',
		mode: 'ffmi',
		description: 'Calculate Fat-Free Mass Index (FFMI) to quantify muscle mass relative to height. Uses raw FFMI with Kouri height normalization to correct tall-athlete skew. Provides body composition context beyond BMI for training and strategy planning.',
		primaryInputs: ['Height', 'Weight', 'Body fat percentage'],
		formula: 'FFMI equals lean body mass in kilograms divided by height in meters squared.',
		interpretation: 'FFMI is context, not a strategy by itself. Use it alongside training history and goals.',
		related: ['lean-body-mass-calculator', 'body-composition-calculator', 'bmi-calculator'],
		faqs: [
			['What does FFMI measure?', 'FFMI estimates lean mass relative to height, which can add context that BMI alone misses.'],
			['Does FFMI diagnose anything?', 'No. It is a body composition estimate and should not be treated as a medical determination.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'lean-body-mass-calculator',
		title: 'Lean Body Mass Calculator',
		seoTitle: 'Lean Body Mass Calculator - Estimate LBM & Muscle Weight | BodyCompOS',
		metaDescription: 'Calculate your Lean Body Mass (LBM) and total body fat mass in kilograms to track high-quality body recomposition.',
		mode: 'lbm',
		description: 'Calculate Lean Body Mass (LBM) from body weight and body fat percentage. LBM = Weight × (1 - BF/100). Differentiates metabolic tissue from stored fat for body composition assessment, calorie targeting, and goal planning.',
		primaryInputs: ['Weight', 'Body fat percentage'],
		formula: 'Lean body mass equals body weight multiplied by one minus body fat percentage.',
		interpretation: 'Lean mass estimates are only as reliable as the body fat estimate used.',
		related: ['ffmi-calculator', 'body-composition-calculator', 'target-weight-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'macro-calculator',
		title: 'Macro Calculator',
		seoTitle: 'Macro Calculator - Daily Macronutrient Split Tracker | BodyCompOS',
		metaDescription: 'Calculate daily protein, fat, and carbohydrate ranges in grams tailored to your strategy finder goals.',
		mode: 'macro',
		description: 'Determine daily protein, fat, and carb targets aligned with calorie goals. Sets protein first (1.9 g/kg), dietary fat at 28% of calories, then allocates remaining calories to carbohydrates. Practical macro planning for body composition diet adherence.',
		primaryInputs: ['Calories', 'Weight', 'Goal'],
		formula: 'Sets protein first, estimates dietary fat as a calorie share, then allocates remaining calories to carbohydrates.',
		interpretation: 'Macros are planning targets. Keep them flexible enough to support adherence.',
		related: ['protein-calculator', 'calorie-calculator'],
		faqs: [
			['What is the best macro split for fat loss?', 'The optimal split sets protein first at 1.8 to 2.2 grams per kilogram, sets dietary fat at 25% to 30% of daily calories for hormonal regulation, and fills the remainder with carbohydrates.'],
			['How strict do I need to be with my macros?', 'Protein and total daily calories are the primary variables for body composition. Carbs and fats can be traded flexibly based on appetite and preference.'],
			...defaultFaqs
		],
	},
	{
		slug: 'ideal-weight-calculator',
		title: 'Ideal Weight Calculator',
		seoTitle: 'Ideal Body Weight Calculator - Healthy Height-Based Reference | BodyCompOS',
		metaDescription: 'Determine your ideal body weight range based on BMI parameters, adjusted for lean muscle mass and athletic context.',
		mode: 'ideal',
		description: 'Display height-based reference weight range using healthy BMI parameters (18.5-24.9). Provides a flexible range accounting for skeletal frame variation — not a single prescriptive target. Context for body composition goal setting.',
		primaryInputs: ['Height'],
		formula: 'Uses BMI reference points as simple height-based weight context.',
		interpretation: 'Reference weight is not the same as an individual body composition goal.',
		related: ['bmi-calculator', 'target-weight-calculator', 'body-composition-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'bmi-calculator',
		title: 'BMI Calculator',
		seoTitle: 'BMI Calculator - Body Mass Index Screening Tool | BodyCompOS',
		metaDescription: 'Calculate your Body Mass Index (BMI) and compare it against body fat percentage category benchmarks.',
		mode: 'bmi',
		description: 'Calculate Body Mass Index (BMI) as a weight-to-height screening metric. Categorizes results into underweight, normal (18.5-24.9), overweight, and obese ranges. BMI is a population screening tool, not a body composition assessment.',
		primaryInputs: ['Height', 'Weight'],
		formula: 'BMI equals body weight in kilograms divided by height in meters squared.',
		interpretation: 'BMI is a screening metric and can miss important body composition differences.',
		related: ['waist-to-height-ratio-calculator', 'body-composition-calculator', 'ideal-weight-calculator'],
		faqs: [
			['Why is BMI not accurate for bodybuilders?', 'BMI only uses height and weight, meaning it treats muscle mass and fat mass identically. A muscular individual with low body fat may be categorized as overweight or obese by BMI standards.'],
			['What is a healthy BMI range?', 'For most adults, a BMI between 18.5 and 24.9 is considered normal. However, this should always be interpreted alongside waist circumference or body fat estimates.'],
			...defaultFaqs
		],
	},
	{
		slug: 'waist-to-height-ratio-calculator',
		title: 'Waist-to-Height Ratio Calculator',
		seoTitle: 'Waist-to-Height Ratio (WHtR) Calculator - Adiposity Health Metric | BodyCompOS',
		metaDescription: 'Calculate central body fat distribution and cardiovascular risk scores using your waist circumference and height.',
		mode: 'whtr',
		description: 'Calculate Waist-to-Height Ratio (WHtR) as a central adiposity screening metric. A ratio of 0.50 or higher indicates increased cardiovascular risk. Often more predictive than BMI alone for health context and body composition planning.',
		primaryInputs: ['Waist', 'Height'],
		formula: 'Waist-to-height ratio equals waist circumference divided by height.',
		interpretation: 'WHtR is a screening estimate and should be interpreted with broader context.',
		related: ['bmi-calculator', 'body-composition-calculator'],
		faqs: defaultFaqs,
	},

	{
		slug: 'body-composition-calculator',
		title: 'Body Composition Calculator',
		seoTitle: 'Body Composition Calculator - Lean vs Fat Mass Proportions | BodyCompOS',
		metaDescription: 'Calculate a multi-metric compartmental analysis of your body fat, lean weight, BMI, and waist-to-height ratio.',
		mode: 'composition',
		description: 'Calculate your lean body mass, fat mass, fat-free share, and body composition proportions using your body weight and body fat percentage. Provides a complete compartmentalized snapshot of your physical structure.',
		primaryInputs: ['Weight', 'Height', 'Body Fat Percentage'],
		formula: 'Lean Mass = Weight * (1 - Body Fat / 100). Fat Mass = Weight * (Body Fat / 100). BMI = Weight / Height^2.',
		interpretation: 'Use this tool to compartmentalize your weight, monitoring whether weight loss or gain comes from fat mass or fat-free muscle tissue.',
		related: ['body-fat-calculator', 'ffmi-calculator', 'lean-body-mass-calculator'],
		faqs: [
			['What is a healthy range for lean body mass?', 'Lean body mass includes everything that is not body fat. There is no single healthy range, as LBM varies dramatically with height and muscular training age. However, higher relative LBM correlates with improved metabolic rate, insulin sensitivity, and physical strength.'],
			['How do I track if I am losing fat or muscle?', 'If your scale weight is decreasing but your waist size is also shrinking while gym strength is stable, you are successfully losing fat while protecting muscle. If weight drops but strength plummets, you may be losing muscle.'],
			...defaultFaqs,
		],
	},
	{
		slug: 'target-weight-calculator',
		title: 'Target Weight Calculator',
		seoTitle: 'Target Body Weight Calculator - Set Weight Goals from Body Fat | BodyCompOS',
		metaDescription: 'Determine your target weight by keeping current lean body mass constant and adjusting your target body fat percentage.',
		mode: 'target',
		description: 'Calculate target body weight from current lean mass and desired body fat percentage. Formula: Target Weight = LBM / (1 - Target BF%). Assumes lean mass is held constant. Practical for setting body composition goals with your strategy.',
		primaryInputs: ['Current weight', 'Current body fat', 'Target body fat'],
		formula: 'Estimates current lean mass, then divides it by one minus target body fat percentage.',
		interpretation: 'Target weight estimates assume lean mass is held constant, which may not happen exactly.',
		related: ['lean-body-mass-calculator', 'goal-timeline-calculator', 'body-composition-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'muscle-gain-calculator',
		title: 'Muscle Gain Calculator',
		seoTitle: 'Muscle Gain Calculator - Lean Bulk Growth Rate Predictor | BodyCompOS',
		metaDescription: 'Predict weekly and monthly muscle building potential using the Alan Aragon rate model based on training age.',
		mode: 'muscle',
		description: 'Project realistic muscle gain using the Alan Aragon rate model. Beginners: 0.2% body weight per week. Intermediates: 0.1%. Advanced: 0.05%. Training age, program quality, and adherence strongly affect lean bulk outcomes and timelines.',
		primaryInputs: ['Weight', 'Training experience', 'Goal'],
		formula: 'Uses conservative weekly gain assumptions to avoid overstating lean mass progress.',
		interpretation: 'Training age, program quality, sleep, and adherence strongly affect outcomes.',
		related: ['macro-calculator', 'ffmi-calculator'],
		faqs: [
			['How fast can I realistically build muscle?', 'Realistic muscle gain depends heavily on training experience. Beginners can expect 1-1.5% of body weight per month, intermediates 0.5%, and advanced lifters less than 0.25%.'],
			['Will I gain fat while building muscle?', 'Some fat gain is normal during a lean bulk, but keeping your daily calorie surplus moderate (5% to 8%) will minimize fat storage while maximizing muscle protein synthesis.'],
			...defaultFaqs
		],
	},
	{
		slug: 'body-recomposition-calculator',
		title: 'Body Recomposition Calculator',
		seoTitle: 'Body Recomposition Calculator - Calories & Protein for Recomp | BodyCompOS',
		metaDescription: 'Find your target calories and protein macros to build muscle and burn body fat simultaneously.',
		mode: 'recomp',
		description: 'Calculate calorie and protein targets for simultaneous fat loss and muscle gain. Near-maintenance calories (2% deficit) with higher protein emphasis (2.2 g/kg). Recomp progress is slower; judge results beyond scale weight using body composition trends.',
		primaryInputs: ['Weight', 'Body fat', 'Training experience', 'Activity level'],
		formula: 'Uses a near-maintenance calorie target with higher protein emphasis.',
		interpretation: 'Recomp progress is often slower and should be judged with more than scale weight.',
		related: ['protein-calculator', 'body-composition-calculator', 'calorie-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'calorie-cycling-calculator',
		title: 'Calorie Cycling Calculator',
		seoTitle: 'Calorie Cycling Calculator - High/Low Day Calorie Deficit | BodyCompOS',
		metaDescription: 'Calculate training day calorie surpluses and rest day deficits to support recovery and fat mobilization.',
		mode: 'cycling',
		description: 'Calculate training day (high calorie) and rest day (low calorie) splits aligned with your weekly strategy. Helps support training performance while promoting fat loss.',
		primaryInputs: ['Maintenance calories', 'Training days per week', 'Weekly strategy'],
		formula: 'Applies calorie differentials between training days and rest days while maintaining weekly energy targets.',
		interpretation: 'Ensure weekly average calories match your primary strategy target. Training day focus supports workout recovery.',
		related: ['calorie-calculator', 'tdee-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'maintenance-calorie-calculator',
		title: 'Maintenance Calorie Calculator',
		seoTitle: 'Maintenance Calorie Calculator - TDEE Energy Balance Estimator | BodyCompOS',
		metaDescription: 'Find the exact number of daily calories required to maintain body weight stability using Mifflin-St Jeor.',
		mode: 'maintenance-calories',
		description: 'Find the exact number of daily calories required to maintain your current body weight. Uses Mifflin-St Jeor and Katch-McArdle equations with activity level multipliers.',
		primaryInputs: ['Sex', 'Age', 'Height', 'Weight', 'Activity level'],
		formula: 'Uses Mifflin-St Jeor by default and Katch-McArdle when body fat is provided.',
		interpretation: 'Eat at this calorie level to keep your weight stable. If weight changes over 3 weeks, your actual maintenance differs.',
		related: ['calorie-calculator', 'daily-calorie-needs-calculator'],
		faqs: defaultFaqs,
		canonicalUrl: `${DOMAIN}/calculators/tdee-calculator`
	},
	{
		slug: 'calorie-deficit-calculator',
		title: 'Calorie Deficit Calculator',
		seoTitle: 'Calorie Deficit Calculator - Fat Loss Calorie Target | BodyCompOS',
		metaDescription: 'Calculate a safe 15% to 20% daily calorie deficit to promote fat loss while preventing muscle degradation.',
		mode: 'deficit-calories',
		description: 'Calculate a safe and sustainable calorie deficit target for fat loss. Sizes a moderate deficit (typically 15-20% below maintenance) to protect lean muscle tissue.',
		primaryInputs: ['Weight', 'Height', 'Age', 'Activity level', 'Deficit percentage'],
		formula: 'Applies deficit percentage reductions (typically 15-20%) to estimated TDEE.',
		interpretation: 'Consuming this target promotes fat mobilization. Slower, consistent weight loss protects active muscle tissue.',
		related: ['maintenance-calorie-calculator', 'weight-loss-calories-calculator'],
		faqs: [
			['How do I calculate my calorie deficit?', 'First, determine your maintenance calories (TDEE). Subtract 15% to 20% (typically 300 to 500 calories) from that number to find your daily target deficit.'],
			['Is a 1000 calorie deficit too big?', 'Yes. For most people, a 1000 calorie deficit is too aggressive, as it forces the body to burn skeletal muscle tissue for fuel, slows thyroid production, and triggers unmanageable hunger.'],
			...defaultFaqs
		],
		canonicalUrl: `${DOMAIN}/calculators/weight-loss-calories-calculator`
	},
	{
		slug: 'calorie-surplus-calculator',
		title: 'Calorie Surplus Calculator',
		seoTitle: 'Calorie Surplus Calculator - Lean Bulk Calorie Target | BodyCompOS',
		metaDescription: 'Calculate a controlled 5% to 8% daily calorie surplus to fuel muscle hypertrophy with minimal fat storage.',
		mode: 'surplus-calories',
		description: 'Calculate a controlled calorie surplus target to support muscle growth (hypertrophy) while minimizing fat spillover.',
		primaryInputs: ['Weight', 'Height', 'Age', 'Activity level', 'Surplus calories'],
		formula: 'Adds caloric surpluses (typically 200-400 kcal) to estimated TDEE.',
		interpretation: 'Eat at this surplus to fuel muscle building. A conservative surplus (5-8%) is recommended to avoid excessive fat gain.',
		related: ['maintenance-calorie-calculator', 'weight-gain-calories-calculator'],
		faqs: [
			['How much of a calorie surplus is needed to build muscle?', 'A small, controlled surplus of 5% to 8% (200-350 calories per day) above maintenance is optimal. This provides enough energy for protein synthesis without triggering excess fat storage.'],
			['Do I need to eat in a surplus on rest days?', 'Yes. Muscle recovery and synthesis take up to 48 hours following a resistance training session, so keeping calories in a consistent surplus supports muscle growth.'],
			...defaultFaqs
		],
		canonicalUrl: `${DOMAIN}/calculators/weight-gain-calories-calculator`
	},
	{
		slug: 'target-calorie-calculator',
		title: 'Target Calorie Calculator',
		seoTitle: 'Target Calorie Calculator - Goal-Specific Daily Intake | BodyCompOS',
		metaDescription: 'Translate strategy recomposition, deficit, or surplus goals into daily calorie intake targets.',
		mode: 'target-calories',
		description: 'Translate your body composition goals (cut, bulk, recomposition, or maintenance) into exact daily calorie targets.',
		primaryInputs: ['Weight', 'Height', 'Goal', 'Activity level'],
		formula: 'Calculates TDEE and applies strategy-specific calorie offsets.',
		interpretation: 'Consistently follow this daily calorie target to direct body composition changes.',
		related: ['tdee-calculator', 'calorie-calculator'],
		faqs: defaultFaqs,
		canonicalUrl: `${DOMAIN}/calculators/calorie-calculator`
	},
	{
		slug: 'daily-calorie-needs-calculator',
		title: 'Daily Calorie Needs Calculator',
		seoTitle: 'Daily Calorie Needs Calculator - Total Daily Energy Expenditure | BodyCompOS',
		metaDescription: 'Discover the total calories required to fund metabolic survival, daily steps, and resistance training.',
		mode: 'daily-needs',
		description: 'Quantify your daily calorie needs representing your body\'s total energy expenditure (TDEE).',
		primaryInputs: ['Age', 'Sex', 'Height', 'Weight', 'Activity'],
		formula: 'BMR * Activity Factor',
		interpretation: 'Your total calorie burn budget. Use this as the foundation to design deficits or surpluses.',
		related: ['maintenance-calorie-calculator', 'tdee-calculator'],
		faqs: defaultFaqs,
		canonicalUrl: `${DOMAIN}/calculators/tdee-calculator`
	},
	{
		slug: 'weight-loss-calories-calculator',
		title: 'Weight Loss Calories Calculator',
		seoTitle: 'Weight Loss Calorie Calculator - Weekly Fat Loss Deficit | BodyCompOS',
		metaDescription: 'Calculate deficit calories based on a target weekly weight loss rate of 0.5% to 1.0% of body weight.',
		mode: 'weight-loss-calories',
		description: 'Calculate the daily calorie target required to lose weight. Size your deficit based on your weekly weight loss rate target.',
		primaryInputs: ['Weight', 'Weekly rate of weight loss'],
		formula: 'Target = Maintenance - (Weekly rate * 7700 / 7)',
		interpretation: 'Ensure the calorie reduction is sustainable (0.5% - 1% of body weight loss per week) to safeguard health.',
		related: ['calorie-deficit-calculator', 'tdee-calculator'],
		faqs: defaultFaqs,
	},
	{
		slug: 'weight-gain-calories-calculator',
		title: 'Weight Gain Calories Calculator',
		seoTitle: 'Weight Gain Calorie Calculator - Weekly Lean Bulk Surplus | BodyCompOS',
		metaDescription: 'Calculate surplus calories required to support target weekly weight gain rates for muscle hypertrophy.',
		mode: 'weight-gain-calories',
		description: 'Calculate daily calorie targets to gain weight. Tailored specifically for lean muscle growth and hypertrophy.',
		primaryInputs: ['Weight', 'Weekly rate of weight gain'],
		formula: 'Target = Maintenance + (Weekly rate * 7700 / 7)',
		interpretation: 'Gaining at a slow, controlled pace (0.25% of body weight per week) maximizes muscle over fat storage.',
		related: ['calorie-surplus-calculator', 'tdee-calculator'],
		faqs: defaultFaqs,
	},
];

export const calculatorCategories = [
	{
		title: 'Calorie & Energy Calculators',
		description: 'Estimate maintenance, deficit, surplus, BMR, and daily calorie targets.',
		slugs: [
			'tdee-calculator',
			'bmr-calculator',
			'calorie-calculator',
			'calorie-cycling-calculator',
			'maintenance-calorie-calculator',
			'calorie-deficit-calculator',
			'calorie-surplus-calculator',
			'target-calorie-calculator',
			'daily-calorie-needs-calculator',
			'weight-loss-calories-calculator',
			'weight-gain-calories-calculator'
		],
	},
	{
		title: 'Protein and Macros',
		description: 'Turn calorie targets into protein, fat, and carbohydrate planning ranges.',
		slugs: ['protein-calculator', 'macro-calculator'],
	},
	{
		title: 'Body Composition',
		description: 'Estimate lean mass, fat mass, FFMI, BMI, and waist-to-height context.',
		slugs: ['body-fat-calculator', 'body-composition-calculator', 'ffmi-calculator', 'lean-body-mass-calculator', 'bmi-calculator', 'waist-to-height-ratio-calculator'],
	},
	{
		title: 'Goal Planning',
		description: 'Translate strategy into timelines, target weight, muscle gain, and recomp planning.',
		slugs: ['goal-timeline-calculator', 'ideal-weight-calculator', 'target-weight-calculator', 'muscle-gain-calculator', 'body-recomposition-calculator'],
	},
];

export const infoPages = [
	{
		slug: 'methodology',
		title: 'Methodology',
		seoTitle: 'Methodology - Body Composition Formulas and Assumptions | BodyCompOS',
		description: 'How BodyCompOS calculates estimates, confidence, assumptions, and limitations.',
		type: 'Article',
		sections: [
			['Formula Library', 'BodyCompOS uses a curated set of peer-reviewed, widely validated equations to generate estimates. Basal Metabolic Rate is calculated primarily with the Mifflin-St Jeor equation (Mifflin et al., 1990, American Journal of Clinical Nutrition), which remains the most accurate single BMR prediction formula for the general population in current clinical literature. When a reliable body fat percentage is provided, BodyCompOS switches to the Katch-McArdle equation (Katch & McArdle, 1996), which uses lean body mass directly and provides improved accuracy for athletic populations. Total Daily Energy Expenditure is then derived by multiplying BMR by a validated activity factor, ranging from 1.2 for sedentary individuals to 1.9 for competitive athletes with multiple daily sessions. Body Mass Index is derived from the classical Quetelet index, expressed as weight in kilograms divided by height in meters squared. While BMI has well-documented limitations — particularly for highly muscled individuals — it remains a useful population-level screening metric when interpreted alongside body composition context. Normalized Fat-Free Mass Index uses the Kouri height normalization model (Kouri et al., 1995, Clinical Journal of Sport Medicine) to correct for the known tall-athlete skew in raw FFMI calculations. Body fat percentage estimation via the circumference method uses the Hodgdon and Beckett US Navy equations (1984), which employ sex-specific logarithmic formulas incorporating neck, waist, and hip measurements. These methods are population estimates with individual-level measurement error and should be treated as directional guidance, not clinical measurements.'],
			['Strategy Confidence Model', 'The BodyCompOS Strategy Finder evaluates multiple signals simultaneously to generate a strategy recommendation. Inputs considered include estimated body fat percentage (with explicit confidence weight), training age and experience level, stated goal direction, weekly training frequency, activity level, and protein adequacy signals. The recommendation model applies thresholds derived from ISSN (International Society of Sports Nutrition) position stands on dietary protein and body composition, and ACSM (American College of Sports Medicine) guidelines for caloric deficit and surplus sizing during body composition change phases. The output — Cut, Lean Bulk, Aggressive Bulk, Recomposition, or Maintain — represents a starting point for planning, not a prescriptive medical recommendation. Users with unusual metabolic patterns, medical conditions, or extreme results should seek individualized professional guidance.'],
			['Forecasting Engine', 'When sufficient check-in data exists (typically 4+ data points), BodyCompOS generates a progress forecast using locally stored trend data. The engine calculates a smoothed trend pace using weighted recent data, estimates an expected ETA for the stated goal, and generates a confidence band representing plausible pace variation. The system detects plateaus when trend pace drops to near zero for multiple consecutive weeks and flags this for reassessment. All forecasts are local to the device and are not transmitted externally. Forecast accuracy improves with consistent measurement conditions — same time of day, same scale, same level of hydration — and degrades with sporadic or noisy check-ins.'],
			['Measurement Limitations', 'All BodyCompOS estimates are derived from self-reported inputs and population-average equations. Real outcomes are affected by adherence quality, training program effectiveness, sleep, psychological stress, hormonal status, health conditions, medication effects, and measurement noise. No formula can account for all individual variation. The practical implication is that all estimates should be treated as starting points to test, not fixed targets to optimize toward. A useful heuristic: if the trend data does not match the estimate after 4-6 weeks of consistent effort, reassess the inputs rather than increasing the deficit or surplus further.'],
			['Peer-Reviewed Clinical References', 'Mifflin, M. D., St Jeor, S. T., Hill, L. A., et al. (1990). A new predictive equation for resting energy expenditure in healthy individuals. The American Journal of Clinical Nutrition, 51(2), 241-247. | Katch, F. I., & McArdle, W. D. (1996). Nutrition and Energy Transfer (Nutrition in Exercise and Sport). Williams & Wilkins. | Kouri, E. M., Pope, H. G., et al. (1995). Fat-free mass index in users and nonusers of anabolic-androgenic steroids. Clinical Journal of Sport Medicine, 5(4), 223-228. | Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center Report. | Jäger, R., Kerksick, C. M., Campbell, B. I., et al. (2017). International Society of Sports Nutrition Position Stand: protein and exercise. Journal of the International Society of Sports Nutrition, 14(1), 20. | Thomas, D. T., Erdman, K. A., & Burke, L. M. (2016). American College of Sports Medicine Joint Position Statement: Nutrition and Athletic Performance. Medicine & Science in Sports & Exercise, 48(3), 543-568.'],
		],
		faqs: [
			['Why do formulas differ across calculators?', 'Each formula estimates a different biological or behavioral signal. BMR formulas estimate resting metabolism from physical characteristics. TDEE multiplies BMR by activity. Strategy recommendations layer goal and body composition context on top of energy estimates. Each is a model of reality, not reality itself, so treating results as planning ranges rather than precise measurements leads to better long-term outcomes.'],
			['Where is detailed safety language?', 'The full educational-use boundaries and professional-guidance recommendations live on the Disclaimer page. BodyCompOS is not a medical tool, and the methodology page covers how estimates are generated, not how they should be applied in clinical or high-risk contexts.'],
		],
	},
	{
		slug: 'editorial-policy',
		title: 'Editorial Policy',
		seoTitle: 'Editorial Policy - BodyCompOS Content Standards | BodyCompOS',
		description: 'How BodyCompOS keeps body composition content conservative, transparent, evidence-based, and useful.',
		type: 'Article',
		sections: [
			['Content Standards', 'Every page published on BodyCompOS — whether a calculator explanation, a strategy guide, or an informational article — must meet a consistent set of content standards. Formulas must be cited with their source publications. Recommendations must be traceable to position stands from ISSN, ACSM, or other recognized professional bodies. Limitation sections must accompany any quantitative estimate. No content may claim guaranteed outcomes, weight loss or muscle gain results specific to any individual, or health benefits that go beyond what the underlying research supports. These standards exist because the primary audience is people making real decisions about their health, and oversimplified or overconfident content in this space causes harm.'],
			['How Content Is Created', 'Content on BodyCompOS is developed by reviewing primary research sources, professional body position stands, and clinical guidelines. Where evidence is strong and consistent (e.g., protein recommendations from multiple ISSN meta-analyses), we present the consensus clearly. Where evidence is mixed or context-dependent (e.g., optimal deficit size during fat loss), we present the range and explain the factors that affect the appropriate choice. We do not extrapolate beyond what the evidence supports, and we explicitly note uncertainty when it exists.'],
			['Corrections and Updates', 'When a formula, recommendation range, citation, or factual claim is found to be incorrect or outdated, the relevant page is revised promptly. Updates include a revised date in the page metadata. Formula changes that affect calculator outputs are documented in the Methodology page. Users who identify errors or have concerns about specific claims can submit corrections through the Contact page. Substantive corrections are acknowledged, and the corrected page reflects the change.'],
			['Tone and Framing', 'BodyCompOS avoids weight-centric language that frames health purely in terms of scale weight, guaranteed transformation outcomes, or extreme calorie guidance. Calculator outputs are presented with context about what they mean and their limitations. The goal is to help users make better-informed decisions, not to generate engagement through dramatic claims or fear-based framing. All content is written to be genuinely useful to an adult making a reasoned decision about their fitness approach.'],
		],
		faqs: [],
	},
	{
		slug: 'disclaimer',
		title: 'Disclaimer',
		seoTitle: 'Disclaimer - Educational Body Composition Estimates | BodyCompOS',
		description: 'BodyCompOS provides educational estimates for planning and self-tracking. It does not provide medical advice, diagnosis, or treatment.',
		type: 'WebPage',
		sections: [
			['Educational Use Only', 'BodyCompOS is an educational planning tool intended for generally healthy adults who want to understand body composition metrics, set calorie and protein targets, and track progress over time. All calculations, strategy recommendations, and forecasts are estimates derived from population-average equations applied to self-reported inputs. They do not constitute medical advice, clinical assessment, or professional health guidance of any kind. The information provided by BodyCompOS is for informational and planning purposes only.'],
			['Who Should Seek Professional Guidance', 'You should consult a qualified healthcare professional — including a physician, registered dietitian, or clinical exercise physiologist — before making significant changes to your diet or exercise program if any of the following apply: you have a current or past medical condition affecting metabolism, nutrition, or exercise capacity; you are pregnant or breastfeeding; you have a personal or family history of eating disorders; you are currently taking prescription medications that affect weight, metabolism, or appetite; you have unusual symptoms such as unexplained fatigue, rapid weight change, or other health concerns. In all such cases, individualized professional guidance takes precedence over any calculator output.'],
			['No Guaranteed Outcomes', 'Body composition outcomes depend on dozens of interacting variables that no calculator can fully capture: genetic factors, hormonal status, sleep quality, psychological stress, training program quality, adherence over time, measurement accuracy, and individual metabolic variation. The estimates produced by BodyCompOS represent plausible starting points, not predictions of individual results. If your actual results differ substantially from estimates after 4-6 weeks of consistent effort with accurate inputs, the appropriate response is to reassess inputs and seek additional guidance, not to assume the calculator is definitively correct.'],
			['Content Currency', 'BodyCompOS makes reasonable efforts to keep formulas and recommendations aligned with current evidence. However, nutritional and exercise science evolves, and some recommendations may not reflect the most recent research publications. This reinforces the importance of consulting qualified professionals for high-stakes health decisions.'],
		],
		faqs: [],
	},
];

export const allPagePaths = [
	'',
	'about',
	'assess',
	'body-composition',
	'body-composition-strategy-guide',
	'calculators',
	'calculators/calories',
	'contact',
	'dashboard',
	'faq',
	'glossary',
	'privacy-policy',
	'references',
	'terms-conditions',
	'guides',
	...calculators.map((calculator) => `calculators/${calculator.slug}`),
	...infoPages.map((page) => page.slug),
	'guides/should-i-cut-or-bulk',
	'guides/body-recomposition',
	'guides/protein-nutrition',
	'guides/body-fat-percentage',
	'guides/maintenance-calories',
	'guides/weight-loss-plateau-guide',
	'guides/how-to-eat-in-a-calorie-deficit',
	'guides/high-protein-diet-for-body-composition',
	'build-your-day',
	'build-your-day/cutting',
	'build-your-day/lean-bulk',
	'build-your-day/aggressive-bulk',
	'build-your-day/recomp',
	'build-your-day/maintain',
	'compare',
	'compare/lean-bulk-vs-maingaining',
	'compare/cut-vs-recomp',
	'compare/lean-bulk-vs-aggressive-bulk',
	'compare/bmi-vs-body-fat-percentage',
	'compare/cardio-vs-weights-for-loss',
	'compare/clean-bulking-vs-dirty-bulking',
	'compare/mifflin-vs-katch-mcardle',
	'compare/tdee-vs-bmr',
	'tools/cut-or-bulk',
	'tools/phase-transition',
	'tools/plateau-analyzer',
	'tools/natural-muscle-potential',
];

export function getCalculator(slug: string) {
	return calculators.find((calculator) => calculator.slug === slug);
}

export function articleSchema(title: string, description: string, canonical: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		datePublished: '2026-06-25',
		dateModified: '2026-06-27',
		author: {
			'@type': 'Organization',
			name: 'BodyCompOS',
			url: `${SITE.origin}/about`,
		},
		reviewer: {
			'@type': 'Organization',
			name: 'BodyCompOS Scientific Review Board',
			url: `${SITE.origin}/about`,
		},
		publisher: {
			'@type': 'Organization',
			name: 'BodyCompOS',
			url: `${SITE.origin}`,
			logo: {
				'@type': 'ImageObject',
				url: `${SITE.origin}/favicon.svg`,
				width: 32,
				height: 32,
			},
		},
		image: `${SITE.origin}/og-image.png`,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonical,
		},
	};
}

export function absoluteUrl(path = '') {
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	return cleanPath ? `${SITE.origin}/${cleanPath}` : SITE.origin;
}
