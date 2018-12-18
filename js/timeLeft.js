const $backgroundBlockTop = document.querySelector('.background-block-top')

const timeLeft = (time) =>
{
    let setTime = time - (time/5)
    let timeS = time*1000

    $storyAreaRead.classList.add('transition-opacity')
    $storyAreaRead.style.transition = `opacity ${time/10}s ease ${setTime}s`

    $labelAuthor.classList.add('transition-opacity-label')
    $labelAuthor.style.transition = `opacity ${time/10}s ease ${setTime}s`

    const toBottomWindow = (window.innerHeight/2)-100
    $canvas.style.transform = `translateY(${toBottomWindow}px)`
    $canvas.style.transition = `transform ${time}s linear 0s`




    window.setInterval( function() {
        $backgroundBlockTop.style.transform = `scaleY(${time})`
        $backgroundBlockTop.style.transition = `transform ${time}s linear 0s`
    }, timeS)

    window.setTimeout( function() {
        togglePopUp()
        $storyAreaRead.remove()
        $labelAuthor.remove()

    }, timeS)

}