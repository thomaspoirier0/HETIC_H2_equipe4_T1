const getPost = async function(data) {
    try {
        let response = await fetch ('api/index.php?action=read')
        if(response.ok) {
            let responseData = await response.json()
            return responseData
            console.log(responseData)
        } else {
            console.error('Retour du serveur  : ', response.status)
        }
    } catch (e) {
        console.log(e)
    }    
} 

const sendPost = async function (data) {
    try {
        let response = await fetch ('api/index.php?action=send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.ok) {
            let responseData = await response.json()
            console.log(data)
        } else {
            console.error('Retour du serveur  : ', response.status)
        }
    } catch (e) {
        console.log(e)
    }
}
