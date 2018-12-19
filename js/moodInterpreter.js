class MoodInterpreter {

    // expects the 'mood' array to be passed to check the dominant mood of the text
    constructor(moods) {
        this.moods = moods
        this.dominantScore = 0
        this.dominantMood = null

        this.getDominantMood = this.getDominantMood.bind(this)
        this.getDominantMood()
    }

    getDominantMood() {
        if (this.moods[0].score) {
            this.moods.forEach(mood => {
                if (
                    mood.score > this.dominantScore && 
                    mood.tone_id !== 'analytical'
                    ) {
                    this.dominantScore = mood.score
                    this.dominantMood = mood.tone_id
                }
            });
            if (this.dominantMood === "confident") {
                return "joy"
            }
 
            if (this.dominantMood === null) {
                return "neutral"
            }
            
            return this.dominantMood
        } else {
            return this.moods[0].tone_id
        }
    }
}