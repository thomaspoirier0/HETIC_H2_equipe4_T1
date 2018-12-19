const $logoContainer = $menuContainer.querySelector('.logo-motto-container')
const $spanMotto = $logoContainer.querySelector('span')
window
    .fetch('./databases/motto.json')
    .then(_responseMotto => _responseMotto.json())
    .then(_dataMotto =>
    {
        const textArray = _dataMotto
        const writeTest = new typeWritterMotto($spanMotto, textArray)
    })
    .catch(error => { console.log(error) })


class typeWritterMotto
{
    constructor($spanMotto, textArray)
    {
        this.$spanMotto = $spanMotto
        this.textArray = textArray
        this.indexText = 0
        this.initMotto()
        
    }

    initMotto()
    {
        if(this.indexText < this.textArray.length)
        {
            this.addMotto(this.textArray[this.indexText].mottoDescription)
            this.indexText++
        }
        else if(this.indexText == this.textArray.length)
        {
            this.indexText = 0
            this.initMotto()
        }
    }

    addMotto(textToWrite)
    {
        let timeToWait = 80
        for(let i = 0; i < textToWrite.length; i++)
        {
            timeToWait += 80
            setTimeout(() =>
            {
                let temp = $spanMotto.innerText
                if(textToWrite[i] == ' ')
                {
                    this.$spanMotto.innerHTML = temp + '&nbsp'
                }
                else
                {
                    this.$spanMotto.innerHTML = temp + textToWrite[i]
                }
            },80+i*80)
        }
        setTimeout(() =>
        {
            this.removeMotto(textToWrite, timeToWait)
        }, 2000 + timeToWait)
        
    }

    removeMotto(textToWrite, timeToWait)
    {
        for(let i = 0; i <= textToWrite.length; i++)
        {
            setTimeout(() =>
            {
                this.$spanMotto.innerHTML = textToWrite.substring(0, textToWrite.length-i)
            },80+i*80)
        }
        setTimeout(() =>
        {
            this.initMotto()
        }, 1000 + timeToWait)
    }
}


// Dark Mode 
const darkModeButton = document.querySelector('.dark-mode-toggle')

const root = document.documentElement
const $menu = $menuContainer.querySelector('.menu')
const $conceptContainer = document.querySelector('.concept-container')
const $conceptSpan = $conceptContainer.querySelector('span')
const $svgIcons = $conceptContainer.querySelectorAll('img')

const newColorTop = '#142A3B'
const newColorBottom = '#132431'
const oldColor = window.getComputedStyle($menuContainer).getPropertyValue('background-color')

let darkModeStatus = false

const landingDarkmodeParameters = () =>
{
    if(!darkModeStatus)
    {
        const headerDarkMode = new darkMode([$menuContainer], newColorTop)
        const menuDarkMode = new darkMode([$menu, $body], newColorBottom)
        root.style.setProperty('--buttons-color', '#FFFFFF')
        root.style.setProperty('--buttons-text-color', '#000000')
        root.style.setProperty('--concept-text', '#FFFFFF')
        darkModeButton.src = './images/svg/dark-mode-on.svg'

        for(let i = 0; i < $svgIcons.length; i++)
        {
            $svgIcons[i].style.filter = 'brightness(0) invert(1)'
        }
        darkModeStatus = true
    }
    else
    {
        const headerDarkMode = new darkMode([$menuContainer], oldColor)
        const menuDarkMode = new darkMode([$menu, $body], '#FFFFFF')
        root.style.setProperty('--buttons-color', '#7fb8f5')
        root.style.setProperty('--buttons-text-color', '#FFFFFF')
        root.style.setProperty('--concept-text', '#000000')
        darkModeButton.src = './images/svg/dark-mode-off.svg'

        for(let i = 0; i < $svgIcons.length; i++)
        {
            $svgIcons[i].style.filter = ''
        }
        darkModeStatus = false
    }
}

// Local storage Dark Mode
darkModeButton.addEventListener('click', () =>
{
    if(!darkModeStatus)
    {
        localStorage.setItem('localDarkModeStatus', true)
    }
    else
    {
        localStorage.setItem('localDarkModeStatus', false)
    }
    landingDarkmodeParameters()
})

const localDarkModeStatus = localStorage.getItem('localDarkModeStatus')
const localDarkModeSetup = () =>
{
    if(localDarkModeStatus == 'true')
    {
        landingDarkmodeParameters()
    }
}
window.addEventListener('load', () =>
{
    localDarkModeSetup()
})

// Scroll to Concept bloc

const $scrollButton = $menu.querySelector('.info-scroller')
$scrollButton.addEventListener('click', () =>
{
    $scrollButton.scrollIntoView(true)
})