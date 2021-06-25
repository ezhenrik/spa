import setItem from "./setItem.js"

let auth2;
const loginSuccess = function(user) {
    let id_token = user.getAuthResponse().id_token
    fetch(process.env.API+'/user/tokensignin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: id_token}),
    })
    .then(response => response.json())
    .then(data => {
        if ('token' in data) {
            setItem('token', data['token']);
        }
    })
    .catch((error) => {
        console.error('Error:'+ error);
    });
}

export default function() {
    gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
            client_id: process.env.GOOGLE,
            scope: 'email'
        });
      
        document.getElementById("signin").addEventListener("click", function(event){
          event.preventDefault()
        });
      
        auth2.attachClickHandler('signin', {}, loginSuccess);
    });    
};
