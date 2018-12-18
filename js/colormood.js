class colorMood
{
    constructor(mood)
    {
        this.mood = mood
        this.chooseColorPalette()
    }

    chooseColorPalette()
    {
        switch(this.mood)
        {
            case 'sadness':
                this.changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#8E44AD','#FFFFFF'])
                break;

            case 'anger':
                this.changeWaveesColor(['#F03434', '#EC644B', '#E26A6A', '#F1A9A0','#FFFFFF'])
                break;
            
            case 'fear':
                this.changeWaveesColor(['#87D37C', '#C8F7C5', '#7BEFB2', '#86E2D5', '#FFFFFF'])
                break;

            case 'joy':
                this.changeWaveesColor(['#FFFFCC', '#FFF68F', '#FFF9DE', '#FFFF7E', '#FFFFFF'])
                break;
        }
    }

    changeWaveesColor(colorArray)
    {
        for (let i = 0; i < colorArray.length; i++)
        {
            waves[i].colour = colorArray[i]
        }
        update()
    }
}