class DataInterprenter {
	/*
	*
	* -----------------
	*/
	constructor(dataLocation) {
		this.location = dataLocation;
		
	}
	/* --- GETTER --- */
	getDataLocation() {
		return this.location;
	}
	/* --- LOGIC --- */
	loadData() {
		
		function failedCall(data, status) {
			console.log("fail");
		}
		// get data via AJAX
		var responseJSON = $.ajax({
			type: "GET",
			url: this.getDataLocation(),
			dataType: "json",
			async: false,
			error: failedCall
		}).responseJSON
		this.characters = responseJSON.characters;
		this.questions = responseJSON.questions;
	}
	parseCharacters(imagePath) {
		const characters = new Map();
		for (var i = 0, len = this.characters.length; i < len; i++) {
			characters.set(this.characters[i].id, 
				new character(
					this.characters[i].name,
					this.characters[i].description,
					imagePath + this.characters[i].id + ".svg",
					this.characters[i].hopperID,
					));
		}
		return characters;
	}
	parseQuestions() {
		const questions = new Map();
		for (var i = 0, len = dataLayer.questions.length; i < len; i++) {
			// is normal question
			if (dataLayer.questions[i].nextYes != undefined ||  dataLayer.questions[i].nextNo != undefined) {
				questions.set(dataLayer.questions[i].id, 
				new question(
					dataLayer.questions[i].question,
					dataLayer.questions[i].id,
					dataLayer.questions[i].nextYes,
					dataLayer.questions[i].nextNo,
					undefined,
					undefined
					));
			}
			// is last question
			else if (dataLayer.questions[i].nextYes == undefined ||  dataLayer.questions[i].nextNo == undefined) {
				questions.set(dataLayer.questions[i].id, 
				new question(
					dataLayer.questions[i].question,
					dataLayer.questions[i].id,
					undefined,
					undefined,
					dataLayer.questions[i].characterYes,
					dataLayer.questions[i].characterNo
					));
			}
		}
		return questions;
	}
}