const $storyAreaRead = document.querySelector('.area-read p')
const $labelAuthor = document.querySelector('.label-author p')

/*
** insert story and name and color mood
** 
*/
const insertTextArena = (message) =>
{
    getPost().then(response => {

        if(response.message)
        {
            removeLoaderPost()

            $storyAreaRead.innerHTML = response.message
            $labelAuthor.innerHTML = response.author
            const moodInterpreter = new MoodInterpreter(response.mood)
            const newColorMood = new colorMood(moodInterpreter.dominantMood)

            timeLeft(response.readtime)
        }
        else
        {
            insertTextArena()   
        }

    })

}
insertTextArena()
