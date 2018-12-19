/*
** manage loader
*/

const $loader = document.querySelector('.loader')

addLoaderPost = () =>
{
    $loader.classList.add('loader--display')
}
removeLoaderPost = () =>
{
    $loader.classList.remove('loader--display')
}



