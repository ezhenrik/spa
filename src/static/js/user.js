import setItem from "./setItem.js"

export default (async () => {
    let token = localStorage.getItem('token')
    if (token != null) {
      console.log(typeof token)
        return fetch(process.env.API+'/user/me', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            try {
              if (res.ok) {
                return res.json()
              } else {
                setItem("token", null)
              }
            }
            catch (err) {
              console.log(err.message)
            }
          })
          .then(resJson => {
            return resJson
          })
          .catch(err => console.log(err))
    }
})
