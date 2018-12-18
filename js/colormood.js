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
                this.changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#23002D','#FFFFFF'])
                break;

            case 'angry':
                this.changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#23002D','#FFFFFF'])
                break;
            
            case 'fear':
                this.changeWaveesColor([])
                break;

            case 'joy':
                this.changeWaveesColor([])

            // case '':

            //     break;
        }
    }

    changeWaveesColor(colorArray)
    {
        for (let i = 0; i < colorArray.length; i++)
        {
            const temp = new waveGenerator(colorArray[i], 1, nodes)
        }
        update()
    }
}