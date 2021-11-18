class character {
	constructor(name, description, image, hopperID) {
		this.name = name;
		this.description = description;
		this.imageLocation = image;
		this.hopperID = hopperID;
	}
}
class question {
	constructor(description, id, nextYesQuestionID, nextNoQuestionID, characterYesID, characterNoID) {
		this.description = description;
		this.id = id;
		this.nextYesQuestionID = nextYesQuestionID;
		this.nextNoQuestionID = nextNoQuestionID;
		this.characterYesID = characterYesID;
		this.characterNoID = characterNoID;
	}
	hasNextQuestion() {
        if (this.nextYesQuestionID == undefined && this.nextNoQuestionID == undefined) {
             return false;
        }
        // next question
        else {
            return true;
        }
    }
}

class JungleGame {
	/*
	* Frame = JQUERY object where to render gamecards
	* --------------------
	*/ 
	constructor(frame, questions, characters) {
		this.frame = frame;
		this.questions = questions;
		this.characters = characters;
	}

	countMaxQuestions() {
        var question = this.questions.get(1);
        var count = 1;
        while (question.hasNextQuestion()) {
            count++;
            question = this.questions.get(question.nextYesQuestionID);
        }
        return count;
    }

    countQuestionPosition(questionID) {
		var question = this.questions.get(questionID);
        var count = 1;
        while (question.hasNextQuestion()) {
            count++;
            question = this.questions.get(question.nextYesQuestionID);

        }
        count = this.countMaxQuestions()  - count + 1;
        return count;
    }

    generateProgressArray(currentQuestionID) {
    	var currentQuestionPosition = this.countQuestionPosition(currentQuestionID);
    	var countMaxQuestions = this.countMaxQuestions();

    	var prgrsArr = [];
        for (var i = 1; i <= countMaxQuestions; i++) {
            if ( i <= currentQuestionPosition ) {
                if ((i % 3) == 1 ) {
                    prgrsArr.push("bamboo1_active");
                }
                else if ((i % 3) == 2) {
                    prgrsArr.push("bamboo2_active");
                }
                else {
                    prgrsArr.push("bamboo3_active");
                }
            }
            else {
               if ((i % 3) == 1 ) {
                    prgrsArr.push("bamboo1");
                }
                else if ((i % 3) == 2) {
                    prgrsArr.push("bamboo2");
                }
                else {
                    prgrsArr.push("bamboo3");
                }
            }
        }
        return prgrsArr
    }

    getCharacterByName(name) {
    	var character = null;
    	for (var [key, characterInMap] of this.characters) {
    		if(characterInMap.name.toUpperCase() === name.toUpperCase() ){
				character = characterInMap;
				break;
    		}
		}
		return character;
    }

}