// Canvas wave Home Page
const $menuContainer = document.querySelector('.menu-container')
const $body = document.querySelector('body')

const $canvas = document.querySelector('.js-canvas-wave')
const context = $canvas.getContext('2d')

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

const nodes = 3
let waves = []
let waveHeight = 100
let waveColors = ["#6BB9F0","#19B5FE","#60B6FF", "#89C4F4", '#FFFFFF']

const waveHeader = () =>
{
    resizeWaveCanvas()
    window.addEventListener('resize', resizeWaveCanvas)
    window.addEventListener('orientationchange', resizeWaveCanvas)
    waves = []
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
    waves[waves.length-1].colour = window.getComputedStyle($body).getPropertyValue('background-color')
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
