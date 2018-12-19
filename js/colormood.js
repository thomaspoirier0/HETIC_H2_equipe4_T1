/*
** change wawe color and sound
*/

class colorMood
{
    constructor(mood)
    {
        this.mood = mood
        this.audioMood = new Audio()
        this.chooseColorPalette()
    }
    // choose wawe color and sound
    chooseColorPalette()
    {
        this.audioMood.loop = true
        switch(this.mood)
        {
            case 'sadness':
                this.changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#8E44AD', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-sadness.mp3'
                this.audioMood.play()
                break;

            case 'anger':
                this.changeWaveesColor(['#F03434', '#EC644B', '#E26A6A', '#F1A9A0', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-anger.mp3'
                this.audioMood.play()
                break;
            
            case 'fear':
                this.changeWaveesColor(['#87D37C', '#C8F7C5', '#7BEFB2', '#86E2D5', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-fear.mp3'
                this.audioMood.play()
                break;

            case 'joy':
                this.changeWaveesColor(['#FFFFCC', '#FFF68F', '#FFF9DE', '#FFFF7E', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-joy.mp3'
                this.audioMood.play()
                break;
        }
    }
    // apply wawe color
    changeWaveesColor(colorArray)
    {
        for (let i = 0; i < colorArray.length; i++)
        {
            waves[i].colour = colorArray[i]
        }
        update()
    }
}