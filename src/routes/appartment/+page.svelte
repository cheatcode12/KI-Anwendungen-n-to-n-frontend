<script>
	import axios from 'axios';

	let gender_encoded = 0; // 0 für Female, 1 für Male jj
	let age;
	let bmi;
	let blood_glucose_level;
	let smoking_history = 'none';
	let predictionMessage = '...';

	async function handleSubmit() {
		try {
			const response = await axios.get('http://localhost:5000/api/predict-diabetes', {
				params: {
					age: age || 0,
					bmi: bmi || 0,
					blood_glucose_level: blood_glucose_level || 0,
					gender_encoded,
					smoking_history_current: smoking_history === 'current' ? 1 : 0,
					'smoking_history_non-smoker': smoking_history === 'non_smoker' ? 1 : 0,
					'smoking_history_past-smoker': smoking_history === 'past_smoker' ? 1 : 0
				}
			});
			predictionMessage = `Die Wahrscheinlichkeit, dass Sie Diabetes erkrankt sind, liegt bei ${response.data.risk_probability}% und das Risikoniveau ist ${response.data.risk_level}.`;
		} catch (error) {
			predictionMessage = `Es gab einen Fehler bei der Vorhersage: ${error.response?.data?.error || error.message}. Bitte überprüfen Sie die Eingaben und versuchen Sie es erneut.`;
			console.error('Fehler beim Abrufen der Vorhersage:', error);
		}
	}
</script>

<style>
	.container {
		max-width: 600px;
		margin: 20px auto;
		background: #f9f9f9;
		padding: 20px;
		box-shadow: 0 4px 8px rgba(0,0,0,0.1);
		border-radius: 8px;
		font-family: Arial, sans-serif;
	}
	h1 {
		color: #0056b3;
		text-align: center;
	}
	label {
		font-weight: bold;
		display: block;
		margin-bottom: 5px;
	}
	input[type='number'], select {
		width: 100%;
		padding: 8px;
		margin-top: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	.radio-group {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}
	.radio-label {
		flex-grow: 1;
		display: flex;
		align-items: center;
		margin-right: 10px; /* Adjust spacing between radio buttons */
	}
	.radio-label:last-child {
		margin-right: 0;
	}
	input[type='radio'] {
		margin-right: 5px;
	}
	button {
		width: 100%;
		color: #fff;
		background-color: #0056b3;
		border: none;
		padding: 10px;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		margin-top: 10px;
	}
	button:hover {
		background-color: #003f8a;
	}
	.image-container {
    flex: 1; 
    display: flex;
    justify-content: center; 
    align-items: center;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}
</style>

<div class="container">
	<h1>Diabetes-Prognose</h1>
	<div>
		<label>Geschlecht:</label>
		<select bind:value={gender_encoded}>
			<option value="0">Weiblich</option>
			<option value="1">Männlich</option>
		</select>
	</div>
	<div>
		<label>Alter:</label>
		<input type="number" bind:value={age}>
	</div>
	<div>
		<label>BMI:</label>
		<input type="number" bind:value={bmi}>
	</div>
	<div>
		<label>Blutzuckerspiegel:</label>
		<input type="number" bind:value={blood_glucose_level}>
	</div>
	<div class="radio-group">
		<label class="radio-label">
			<input type="radio" bind:group={smoking_history} value="current"> Aktueller Raucher
		</label>
		<label class="radio-label">
			<input type="radio" bind:group={smoking_history} value="non_smoker"> Nichtraucher
		</label>
			<label class="radio-label">
			<input type="radio" bind:group={smoking_history} value="past_smoker"> Ehemaliger Raucher
		</label>
	</div>
	<button on:click={handleSubmit}>Risiko berechnen</button>
	<p>{predictionMessage}</p>

	<div class="image-container">
        <img src="./Diabetes.JPG" alt="Diabetes Bild">
    </div>
</div>
