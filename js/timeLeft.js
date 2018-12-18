const timeLeft = (time) =>
{
    console.log(time)
    let setTime = time - (time/10)
    $storyAreaRead.classList.add('transition-opacity')
    $storyAreaRead.style.transition = `opacity ${time/10}s ease ${setTime}s`

    $labelAuthor.classList.add('transition-opacity-label')
    $labelAuthor.style.transition = `opacity ${time/10}s ease ${setTime}s`


}