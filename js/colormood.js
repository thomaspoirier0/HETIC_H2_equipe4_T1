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
                changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#23002D','#FFFFFF'])
                break;

            case 'angry':
                changeWaveesColor(['#D5B8FF', '#BF55EC', '#F1E7FE', '#23002D','#FFFFFF'])
                break;
            
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