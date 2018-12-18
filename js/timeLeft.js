const timeLeft = (time) =>
{
    let setTime = time - (time/5)
    $storyAreaRead.classList.add('transition-opacity')
    $storyAreaRead.style.transition = `opacity ${time/10}s ease ${setTime}s`

    $labelAuthor.classList.add('transition-opacity-label')
    $labelAuthor.style.transition = `opacity ${time/10}s ease ${setTime}s`

    window.setTimeout( function() {
        togglePopUp()
        $storyAreaRead.remove()
        $labelAuthor.remove()

    }, time*1000)

}