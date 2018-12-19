/*
** darkmode
*/
class darkMode
{
    constructor(element, toColor)
    {
        this.element = element
        this.toColor = toColor
        this.colorFade()
    }
    colorFade()
    {

        for(let i = 0; i < this.element.length; i++)
        {
            this.element[i].style.background = this.toColor
        }
    }
}