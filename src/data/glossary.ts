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
	},
	{
		term: 'Myofibrillar Hypertrophy',
		definition: 'The growth of muscle fibers driven by an increase in contractile protein density (actin and myosin), leading to improvements in physical strength.',
		category: 'Hypertrophy'
	},
	{
		term: 'Sarcoplasmic Hypertrophy',
		definition: 'An increase in the volume of non-contractile fluid (sarcoplasm) in muscle cells, contributing to muscle size and glycogen storage capability without direct strength gains.',
		category: 'Hypertrophy'
	},
	{
		term: 'Caloric Density',
		definition: 'The concentration of energy (calories) contained within a given weight or volume of food. Whole, fiber-rich foods typically have lower caloric density.',
		category: 'Nutrition'
	},
	{
		term: 'Micronutrients',
		definition: 'Essential dietary elements needed by the body in small quantities (vitamins and minerals) to orchestrate vital physiological and cellular functions.',
		category: 'Nutrition'
	},
	{
		term: 'Macronutrients',
		definition: 'Nutrients required by the body in large daily quantities (proteins, fats, and carbohydrates) to provide structure, fuel, and hormonal regulation.',
		category: 'Nutrition'
	},
	{
		term: 'Essential Amino Acids (EAAs)',
		definition: 'The nine amino acids that the human body cannot synthesize internally, meaning they must be obtained through dietary sources to support muscle protein synthesis.',
		category: 'Nutrition'
	},
	{
		term: 'Branched-Chain Amino Acids (BCAAs)',
		definition: 'Three specific essential amino acids (leucine, isoleucine, and valine) that are metabolized directly inside skeletal muscle rather than the liver.',
		category: 'Nutrition'
	},
	{
		term: 'Thermic Effect of Activity (TEA)',
		definition: 'The energy expended during structured physical exercise (running, lifting, cycling). Usually constitutes 5-15% of daily energy expenditure.',
		category: 'Metabolism'
	},
	{
		term: 'Resting Metabolic Rate (RMR)',
		definition: 'The number of calories burned by the body at rest in a comfortable environment, slightly less restrictive in testing parameters than BMR.',
		category: 'Metabolism'
	},
	{
		term: 'Adaptive Thermogenesis',
		definition: 'The metabolic slowdown that occurs when the body reduces resting energy expenditure in response to prolonged caloric restriction or starvation.',
		category: 'Metabolism'
	},
	{
		term: 'Lipolysis',
		definition: 'The biochemical breakdown of stored lipids (triacylglycerols) inside fat cells into free fatty acids and glycerol, allowing them to enter the bloodstream for energy.',
		category: 'Metabolism'
	},
	{
		term: 'Adipocyte',
		definition: 'A specialized biological cell designed primarily for the storage of fat, making up the majority of adipose tissue.',
		category: 'Metrics'
	},
	{
		term: 'Bioelectrical Impedance Analysis (BIA)',
		definition: 'A method of estimating body composition by passing a weak electrical current through the body and measuring electrical resistance.',
		category: 'Metrics'
	},
	{
		term: 'Dual-Energy X-Ray Absorptiometry (DEXA)',
		definition: 'A three-compartment clinical imaging method that measures bone mineral density, fat tissue mass, and lean muscle tissue mass with high accuracy.',
		category: 'Metrics'
	},
	{
		term: 'Skinfold Caliper Method',
		definition: 'A body composition assessment technique that measures subcutaneous fat layer thickness at specific anatomical locations using mechanical calipers.',
		category: 'Metrics'
	},
	{
		term: 'Volume (Training)',
		definition: 'The total amount of work performed during a training session, typically calculated as Sets × Repetitions × Weight Lifted.',
		category: 'Hypertrophy'
	},
	{
		term: 'Intensity (Training)',
		definition: 'The level of effort or load exerted during exercise, often expressed as a percentage of a person\'s One-Repetition Maximum (1RM) or RPE.',
		category: 'Hypertrophy'
	},
	{
		term: 'Frequency (Training)',
		definition: 'The number of training sessions performed per week, or the number of times a specific muscle group is trained within a weekly cycle.',
		category: 'Hypertrophy'
	},
	{
		term: 'Supercompensation',
		definition: 'The post-training period during which the trained function or parameter has a higher performance capacity than it did prior to the training session.',
		category: 'Hypertrophy'
	},
	{
		term: 'Detraining',
		definition: 'The partial or complete loss of training-induced anatomical, physiological, and performance adaptations due to an extended break or reduction in training stimulus.',
		category: 'Hypertrophy'
	},
	{
		term: 'Leptin',
		definition: 'A hormone produced by adipose tissue that acts on receptors in the hypothalamus to regulate energy balance and suppress appetite.',
		category: 'Metabolism'
	}
];
