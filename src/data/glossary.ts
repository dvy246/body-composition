export type GlossaryTerm = {
	term: string;
	definition: string;
	category: 'Metabolism' | 'Hypertrophy' | 'Nutrition' | 'Metrics';
};

export const glossaryTerms: GlossaryTerm[] = [
	{
		term: 'Basal Metabolic Rate (BMR)',
		definition: 'The rate of energy expenditure per unit time by endothermic animals at rest. It represents the minimum energy required to keep vital organs functioning.',
		category: 'Metabolism'
	},
	{
		term: 'Total Daily Energy Expenditure (TDEE)',
		definition: 'The total number of calories your body burns in a 24-hour period, calculated by multiplying BMR by physical activity multipliers.',
		category: 'Metabolism'
	},
	{
		term: 'Non-Exercise Activity Thermogenesis (NEAT)',
		definition: 'The energy expended for everything we do that is not sleeping, eating or sports-like exercise (e.g., fidgeting, walking to the desk).',
		category: 'Metabolism'
	},
	{
		term: 'Thermic Effect of Food (TEF)',
		definition: 'The increase in metabolic rate that occurs after consuming food, representing the energy cost of digestion, absorption, and assimilation.',
		category: 'Metabolism'
	},
	{
		term: 'Muscle Protein Synthesis (MPS)',
		definition: 'The biological process where protein is produced to repair muscle tissue damage caused by intense physical activity.',
		category: 'Hypertrophy'
	},
	{
		term: 'Hypertrophy',
		definition: 'The enlargement of an organ or tissue from the increase in size of its cells. In fitness, this refers to muscle fiber enlargement.',
		category: 'Hypertrophy'
	},
	{
		term: 'Progressive Overload',
		definition: 'The gradual increase of stress placed upon the body during exercise training, typically achieved by increasing weight, reps, or volume over time.',
		category: 'Hypertrophy'
	},
	{
		term: 'Anabolic Window',
		definition: 'The short timeframe post-workout where protein consumption is hypothesized to maximize muscle hypertrophy, now known to be wider than previously thought.',
		category: 'Nutrition'
	},
	{
		term: 'Calorie Deficit',
		definition: 'Any state where energy expenditure exceeds energy intake, forcing the body to metabolize stored fat or muscle tissue for fuel.',
		category: 'Metabolism'
	},
	{
		term: 'Calorie Surplus',
		definition: 'Any state where energy intake exceeds energy expenditure, providing excess energy to build tissue or store fat.',
		category: 'Metabolism'
	},
	{
		term: 'Body Recomposition',
		definition: 'The process of simultaneously losing body fat and building skeletal muscle mass, typically achieved near maintenance calories.',
		category: 'Metabolism'
	},
	{
		term: 'Fat-Free Mass Index (FFMI)',
		definition: 'An alternative screening metric to BMI that accounts directly for lean body mass relative to height, useful for tracking muscularity.',
		category: 'Metrics'
	},
	{
		term: 'Lean Body Mass (LBM)',
		definition: 'The mass of the body minus all stored fat tissue. LBM is the primary metabolic driver of resting metabolic rate.',
		category: 'Metrics'
	},
	{
		term: 'US Navy Circumference Method',
		definition: 'A zero-cost statistical body fat percentage estimation method utilizing neck, waist, height, and hip measurements.',
		category: 'Metrics'
	},
	{
		term: 'Waist-to-Height Ratio (WHtR)',
		definition: 'A simple central adiposity health screening metric calculated by dividing waist circumference by height.',
		category: 'Metrics'
	},
	{
		term: 'Metabolic Adaptation',
		definition: 'The evolutionary response to calorie restriction where the body decreases metabolic rate beyond what weight loss alone predicts.',
		category: 'Metabolism'
	},
	{
		term: 'Reverse Dieting',
		definition: 'The practice of slowly stepping up calories following a cut to restore resting metabolic rate while minimizing fat regain.',
		category: 'Nutrition'
	},
	{
		term: 'PDCAAS',
		definition: 'Protein Digestibility-Corrected Amino Acid Score. A method of evaluating protein quality based on human amino acid requirements.',
		category: 'Nutrition'
	},
	{
		term: 'Leucine Threshold',
		definition: 'The specific concentration of the amino acid leucine required in a meal (typically ~3g) to activate the mTOR pathway for muscle growth.',
		category: 'Nutrition'
	},
	{
		term: 'mTOR Pathway',
		definition: 'Mammalian Target of Rapamycin. The primary cellular signaling pathway that regulates cell growth, translation, and muscle protein synthesis.',
		category: 'Hypertrophy'
	},
	{
		term: 'Glycogen',
		definition: 'The primary storage form of glucose in animal cells, stored primarily in liver and muscle tissue to fuel muscle contractions.',
		category: 'Metabolism'
	},
	{
		term: 'RPE (Rate of Perceived Exertion)',
		definition: 'A subjective scale from 1 to 10 used to measure the intensity of an exercise set, with 10 representing complete failure.',
		category: 'Hypertrophy'
	},
	{
		term: 'Reps in Reserve (RIR)',
		definition: 'The number of repetitions a lifter could have performed before reaching failure at the end of a training set.',
		category: 'Hypertrophy'
	},
	{
		term: 'Insulin Sensitivity',
		definition: 'A measure of how responsive cellular receptors are to insulin signals, dictate nutrient partitioning efficacy.',
		category: 'Metabolism'
	},
	{
		term: 'Nutrient Partitioning',
		definition: 'The physiological process determining whether excess calories are channeled into lean muscle tissue or adipose fat storage.',
		category: 'Metabolism'
	},
	{
		term: 'Diet Fatigue',
		definition: 'The cumulative psychological and physiological stress caused by long-term calorie deficits, requiring scheduled breaks.',
		category: 'Metabolism'
	},
	{
		term: 'Refeed Day',
		definition: 'A structured, high-carbohydrate day during a deficit designed to restore glycogen stores and temporarily boost leptin hormone levels.',
		category: 'Nutrition'
	},
	{
		term: 'Linear Periodization',
		definition: 'A training block structure where intensity increases gradually over weeks while volume decreases proportionally.',
		category: 'Hypertrophy'
	},
	{
		term: 'Visceral Fat',
		definition: 'Adipose tissue stored deep within the abdominal cavity, surrounding vital organs, highly correlated with metabolic syndrome.',
		category: 'Metrics'
	},
	{
		term: 'Subcutaneous Fat',
		definition: 'Adipose tissue stored directly beneath the skin layer, serving primarily as thermal insulation and passive energy storage.',
		category: 'Metrics'
	}
];
