const requests = {
    get: function (endPoint, token) {
        const a = fetch(endPoint, {
            method: 'GET', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            mode: 'cors'
        })
        .then((response) => {
            if (response.ok ) {
                return response.json()
              } else if(response.status == 403) {
                window.location.href = '/proibido'
                throw new Error('Não Autorizado')
              }
              else if(response.status == 400){
                return response.json()
              } else {
                return response.json()
              }
            })
        .then((object) => {
            return object
        })
        .catch((error) => {
            console.log(error)
            return {success: 0, message: error.message}
        })

        return a
    },
    post: function (endPoint, payload, token) {
        token = (!token)? '' : 'Bearer ' + token
        
        const a = fetch(endPoint, {
            method: 'POST',            
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            mode: 'cors'
          })
        .then((response) => {
          if (response.ok && response.status == 204) {
            return response
          } else if (response.ok ) {
            return response.json()
          } else if(response.status == 403) {
            window.location.href = '/proibido'
            throw new Error('Não Autorizado')
          }else if(response.status == 400){
            return response.json()
          } else {
            return response.json()
          }
        })
        .then((object) => {
            return object
        })
        .catch((error) => {
            return {success: 0, message: error.message}
        })

        return a
    },
    put: function (endPoint, payload, token) {
        token = (!token)? '' : 'Bearer ' + token
        
        const a = fetch(endPoint, {
            method: 'PUT',            
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            mode: 'cors'
          })
        .then((response) => {
          if (response.ok ) {
            return response.json()
          } else if(response.status == 403) {
            window.location.href = '/proibido'
            throw new Error('Não Autorizado')
          }else if(response.status == 400){
            return response.json()
          } else {
            return response.json()
          }
        })
        .then((object) => {
            return object
        })
        .catch((error) => {    
            return {success: 0, message: error.message}
        })

        return a
    },
    delete: function (endPoint, token) {
        const a = fetch(endPoint, {
            method: 'DELETE', 
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            mode: 'cors'
        })
        .then((response) => {
            if (response.ok ) {
                return response.json()
              } else if(response.status == 403) {
                window.location.href = '/proibido'
                throw new Error('Não Autorizado')
              }
              else if(response.status == 400){
                return response.json()
              } else {
                return response.json()
              }
        })
        .then((object) => {
            return object
        })
        .catch((error) => {
            console.log(error)
            return {success: 0, message: error.message}
        })

        return a
    },
}

export { requests };