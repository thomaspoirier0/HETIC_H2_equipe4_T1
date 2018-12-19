/*
** change wawe color and sound
*/

class colorMood
{
    constructor(mood)
    {
        this.audioButton = document.querySelector('.sound-toggle')
        this.mood = mood
        this.audioMood = new Audio()
        this.audioMood.volume = 0.5
        this.audioPlaying = false
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
                break;

            case 'anger':
                this.changeWaveesColor(['#F03434', '#EC644B', '#E26A6A', '#F1A9A0', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-anger.mp3'
                break;
            
            case 'fear':
                this.changeWaveesColor(['#87D37C', '#C8F7C5', '#7BEFB2', '#86E2D5', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-fear.mp3'
                break;

            case 'joy':
                this.changeWaveesColor(['#FFFFCC', '#FFF68F', '#FFF9DE', '#FFFF7E', waves[waves.length-1].colour])
                this.audioMood.src = '../audio/emotion-joy.mp3'
                break;
        }
        this.audioMood.play()
        this.audioButton.addEventListener('click', () =>
        {
            console.log('click')
            console.log(this.audioMood.played)
            if(this.audioPlaying)
            {
                this.audioPlaying = false
                this.audioMood.pause()
                this.audioButton.src = '../images/svg/sound.svg'
            }
            else{
                this.audioPlaying = true
                this.audioMood.play()
                this.audioButton.src = '../images/svg/no-sound.svg'
            }
        })
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