const $container = document.querySelector('.container')
const $formStory = $container.querySelector('.form-story')
const $submit = $formStory.querySelector('.button-submit')
const $buttonPop = $formStory.querySelector('.button-pop')
const $popUpname = $formStory.querySelector('.popup-name')
const $storyArea = $formStory.querySelector('.story-area')
const $returnButton = $formStory.querySelector('.button-return')

let userName, userStory, errorRequest

$submit.addEventListener('click', _event => 
{
    _event.preventDefault()

    userName = document.querySelector('.name').value
    userStory = document.querySelector('.story-area').value
    
    sendPost().then((response) => 
    {
        return (!response ? errorRequest=true :     
            sendPost({
            user_name: userName,
            user_story: userStory
    }))
    })
})

$buttonPop.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.toggle('popup-name--display')
    $storyArea.classList.toggle('story-area--none')
    $storyArea.setAttribute('disabled', 'none')
})
if(errorRequest)
{
    console.log(erruer)
}
$returnButton.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.toggle('popup-name--display')
    $storyArea.classList.toggle('story-area--none')
    $storyArea.removeAttribute('disabled', 'none')
})








/**
 * WaweBackground
 */
const $canvas = document.querySelector('.js-canvas-wave')
const context = $canvas.getContext('2d')

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight


const nodes = 3
const waves = []
let waveHeight = windowHeight/7
const waveColors = ["rgba(66, 165, 232, 0.5)","rgba(66, 165, 232, 0.5)","rgba(114, 190, 252, 0.5)", "white"]

const waveHeader = () =>
{
    resizeWaveCanvas()
    window.addEventListener('resize', resizeWaveCanvas)
    window.addEventListener('orientationchange', (_event) =>
    {
        resizeWaveCanvas()
    })
    for (let i = 0; i < waveColors.length; i++)
    {
        const temp = new waveGenerator(waveColors[i], 1, nodes)
    }
    update()
}
const update = () =>
{
    context.fillStyle = '#0C003E'
    context.globalCompositeOperation = 'source-over'
    context.fillRect(0,0,$canvas.width,$canvas.height)
    for (let i = 0; i < waves.length; i++)
    {
        for (var j = 0; j < waves[i].nodes.length; j++)
        {
            bounce(waves[i].nodes[j])
        }
        drawWave(waves[i])
    }
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
    nodeArr[1] = waveHeight/2*Math.sin(nodeArr[2]/20)+$canvas.height/2
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
    waveHeight = windowHeight

    $canvas.width = windowWidth
    $canvas.height = waveHeight
}
waveHeader()