// Canvas wave Home Page
const $menuContainer = document.querySelector('.menu-container')
const $menu = $menuContainer.querySelector('.menu')
const $logoContainer = $menuContainer.querySelector('.logo-motto-container')
const $canvas = document.querySelector('.js-waves')
const context = $canvas.getContext('2d')

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const nodes = 3
const waves = []
let waveHeight = 100
let waveColors = ["#6BB9F0","#19B5FE","#60B6FF", "#89C4F4", '#FFFFFF']

const waveHeader = () =>
{
    resizeWaveCanvas()
    window.addEventListener('resize', resizeWaveCanvas)
    window.addEventListener('orientationchange', resizeWaveCanvas)
    for (let i = 0; i < waveColors.length; i++)
    {
        const temp = new waveGenerator(waveColors[i], 1, nodes)
    }
    update()
}
const update = () =>
{
    context.fillStyle = window.getComputedStyle($menuContainer).getPropertyValue('background-color')
    context.globalCompositeOperation = 'source-over'
    context.fillRect(0,0,$canvas.width,$canvas.height)
    //context.globalCompositeOperation = "screen";
    for (let i = 0; i < waves.length; i++)
    {
        for (var j = 0; j < waves[i].nodes.length; j++)
        {
            bounce(waves[i].nodes[j])
        }
        for (let k = 0; k <= nodes+2; k++)
        {
            waves[i].nodes[k][0] = (k-1) * $canvas.width / nodes
        }
        drawWave(waves[i])
    }
    waves[waves.length-1].colour = window.getComputedStyle($menu).getPropertyValue('background-color')
    context.fillStyle = '#FFFFFF'

    window.requestAnimationFrame(update)
}
class waveGenerator
{
    constructor(colour, lambda)
    {
        this.colour = colour
        this.lambda = lambda
        this.nodes = []
        this.waveGenerator()
    }
    waveGenerator()
    {
        for (let i = 0; i <= nodes+2; i++)
        {
            const temp = [(i-1) * $canvas.width / nodes, 0, Math.random()*200, .3]
            this.nodes.push(temp)
        }
        waves.push(this)
    }
}
const bounce = (nodeArr) =>
{
    nodeArr[1] = waveHeight/3*Math.sin(nodeArr[2]/20)+$canvas.height/2
    nodeArr[2] = nodeArr[2] + nodeArr[3]
}

const drawWave = (obj) =>
{
    const diff = (a,b) =>
    {
        return (b - a)/2 + a
    }
    context.fillStyle = obj.colour
    context.beginPath()
    context.moveTo(0,$canvas.height)
    context.lineTo(obj.nodes[0][0],obj.nodes[0][1])

    for(let i = 0; i < obj.nodes.length; i++)
    {
        if(obj.nodes[i+1])
        {
            context.quadraticCurveTo(
                obj.nodes[i][0],obj.nodes[i][1],
                diff(obj.nodes[i][0],obj.nodes[i+1][0]),diff(obj.nodes[i][1],obj.nodes[i+1][1])
            )
        }
        else
        {
            context.lineTo(obj.nodes[i][0],obj.nodes[i][1])
            context.lineTo($canvas.width,$canvas.height)
        }
    }
    context.closePath()
    context.fill()
}
const resizeWaveCanvas = () =>
{
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
    waveHeight = windowHeight/7

    $canvas.width = windowWidth
    $canvas.height = waveHeight
}
waveHeader()

// Typewriter Motto

const $spanMotto = $logoContainer.querySelector('span')
window
    .fetch('./databases/motto.json')
    .then(_responseMotto => _responseMotto.json())
    .then(_dataMotto =>
    {
        console.log(_dataMotto)
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
const $conceptContainer = document.querySelector('.concept-container')
const $conceptSpan = $conceptContainer.querySelector('span')
const $svgIcons = $conceptContainer.querySelectorAll('img')

const newColorTop = '#142A3B'
const newColorBottom = '#132431'
const oldColor = window.getComputedStyle($menuContainer).getPropertyValue('background-color')

let darkModeStatus = false
darkModeButton.addEventListener('click', () =>
{
    if(!darkModeStatus)
    {
        const headerDarkMode = new darkMode([$menuContainer], newColorTop)
        const menuDarkMode = new darkMode([$menu, $conceptContainer], newColorBottom)
        root.style.setProperty('--buttons-color', '#FFFFFF')
        root.style.setProperty('--buttons-text-color', '#000000')
        root.style.setProperty('--concept-text', '#FFFFFF')

        for(let i = 0; i < $svgIcons.length; i++)
        {
            $svgIcons[i].style.filter = 'brightness(0) invert(1)'
        }

        darkModeStatus = true
    }
    else
    {
        const headerDarkMode = new darkMode([$menuContainer], oldColor)
        const menuDarkMode = new darkMode([$menu, $conceptContainer], '#FFFFFF')
        root.style.setProperty('--buttons-color', '#7fb8f5')
        root.style.setProperty('--buttons-text-color', '#FFFFFF')
        root.style.setProperty('--concept-text', '#000000')

        for(let i = 0; i < $svgIcons.length; i++)
        {
            $svgIcons[i].style.filter = ''
        }

        darkModeStatus = false
    }
})


// Scroll to Concept bloc

const $scrollButton = $menu.querySelector('.info-scroller')
$scrollButton.addEventListener('click', () =>
{
    $scrollButton.scrollIntoView(true)
})