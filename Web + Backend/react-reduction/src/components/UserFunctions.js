import axios from 'axios'




////User API ///////
////////////
//////////////////////////

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      class: newUser.class,
    })
    .then(response => {
      console.log('Registered')
    }).catch(err => {
      console.log(err)
    })
}

export const update = newUser => {
  return axios
    .post('users/update', {
      _id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      profileImg: newUser.profileImg
    })
    .then(response => {
      console.log('Done !')
    })
}

/*export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      localStorage.setItem('loggedIn', true)
      console.log(response)
      return axios.get('users/getRole', {
        email: user.email,
      });
      // using response.data

    })/*.then(res=> {
      localStorage.setItem('admin', res.data)
      // localStorage.setItem('loggedIn', true)
      console.log(res)
        
        })
    .catch(err => {
      console.log(err)
    })
}*/
export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
  /*  .catch(err => {
      console.log(err)
    })*/
}


export const getProfile = user => {
  return axios
    .get('users/profile', {
      // headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })

}



export const deleteUser = userId => {
  return axios
    .post('users/deleteUser', {
      _id: userId,


    })
    .then(response => {
      console.log('User deleted !')
    }).catch(err => {
      console.log(err)
    })
}

export const approveUser = userId => {
  return axios
    .post('users/approveUser', {
      _id: userId,


    })
    .then(response => {
      console.log('User approved !')
    }).catch(err => {
      console.log(err)
    })
}
export const disapproveUser = userId => {
  return axios
    .post('users/disapproveUser', {
      _id: userId,


    })
    .then(response => {
      console.log('User refused !')
    }).catch(err => {
      console.log(err)
    })
}

//Models api///
///////////
///////////

export const getAllModels = model => {
  return axios
    .get('models/getModels', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data.cardModel
    })
    .catch(err => {
      console.log(err)
    })
}

export const addModel = newModel => {
  return axios
    .post('models/addModel', {
      name: newModel.name,
      description: newModel.description,
    })
    .then(response => {
      console.log('Model Added')
    }).catch(err => {
      console.log(err)
    })
}
export const getCardsByModel = cards => {
  return axios
    .get('cards/getCardsByModel')
    .then(response => {
      console.log(response)
      return response.data.cards
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteModel = cardId => {
  return axios
    .post('models/deleteModel', {
      _id: cardId,


    })
    .then(response => {
      console.log('Model deleted !')
    }).catch(err => {
      console.log(err)
    })
}

//Cards API 
///////
//////////
///////

export const getCards = cards => {
  return axios
    .get('cards/getAllCards')
    .then(response => {
      console.log(response)
      return response.data.card
    })
    .catch(err => {
      console.log(err)
    })
}


export const getRole = user => {
  return axios
    .get('users/getRole', {
      email: user.email,
    })
    .then(response => {
      //if (response.data.role=="admin")
      //if(response.data.role==="admin")
      // localStorage.setItem('admin', true)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getState = users => {
  return axios
    .get('users/getState')
    .then(response => {
      // localStorage.setItem('state', response)
      return response
    })
    .catch(err => {
      console.log(err)
    })
}

export const addCard = newCard => {
  return axios
    .post('cards/addCard', {
      name: newCard.name,
      status: newCard.status,
      model: newCard.model,
      ip:newCard.ip,

    })
    .then(response => {
      console.log('Card Added')
    }).catch(err => {
      console.log(err)
    })
}

export const deleteCard = cardId => {
  return axios
    .post('cards/deleteCard', {
      _id: cardId,


    })
    .then(response => {
      console.log('Card deleted !')
    }).catch(err => {
      console.log(err)
    })
}

////////Admin API
/////////
/////////////////
////////////

export const getActiveUsers = users => {
  return axios
    .get('users/getActiveUsers')
    .then(response => {
      console.log(response)
      return response.data.users
    })
    .catch(err => {
      console.log(err)
    })
}

export const getInactiveUsers = users => {
  return axios
    .get('users/getInactiveUsers')
    .then(response => {
      console.log(response)
      return response.data.users
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBlockedUsers = users => {
  return axios
    .get('users/getBlockedUsers')
    .then(response => {
      console.log(response)
      return response.data.users
    })
    .catch(err => {
      console.log(err)
    })
}



/////////Reservations API 
////////////////////////////////////////////
//////////////////////////////

export const quit = newRes => {
  return axios.post('reservations/quit', {
    _id: newRes._id,

  })  // for allPosts
    .then(response => {
      console.log(response)
      return axios.post('projects/addProject', {
        reservation: newRes._id,
        index: newRes.index,
        name: newRes.name,
        user: newRes.user
      });
      // using response.data
    })
    .then((response) => {
      console.log('Response', response);
    })
}

export const reserve = newRes => {
  return axios.post('reservations/reserve', {
    card: newRes.card,
    //hours: newRes.hours,
    user: newRes.user,
    dateBeg: newRes.dateBeg,
    dateEnd: newRes.dateEnd,
  })  // for allPosts
    /* .then(response => {
       console.log(response)
       return axios.post('cards/updateStatus', {
         _id: newRes.card,
         status: newRes.status
       });
       // using response.data
     })*/
    .then((response) => {
      console.log('Response', response);
    })
}

export const getReservations = cards => {
  return axios
    .get('reservations/getAllCards')
    .then(response => {
      console.log(response)
      return response.data.card
    })
    .catch(err => {
      console.log(err)
    })
}
export const getMyReservation = user => {
  return axios
    .get('reservations/getMyReservation')
    .then(response => {
      console.log(response)
      return response.data.reservation
    })
    .catch(err => {
      console.log(err)
    })
}
export const getHistoryReservation = user => {
  return axios
    .get('reservations/getHistory')
    .then(response => {
      console.log(response)
      return response.data.reservation
    })
    .catch(err => {
      console.log(err)
    })
}

/////////Reclamations API 
////////////////////////////////////////////
//////////////////////////////
export const addRec = newRec => {
  return axios
    .post('reclamations/addRec', {
      name: newRec.name,
      description: newRec.description,
      user: newRec.user,

    })
    .then(response => {
      console.log('Added !')
    }).catch(err => {
      console.log(err)
    })
}
export const getReclamations = rec => {
  return axios
    .get('reclamations/getReclamations')
    .then(response => {
      console.log(response)
      return response.data.rec
    })
    .catch(err => {
      console.log(err)
    })
}
export const getHistory = rec => {
  return axios
    .get('reclamations/getHistory')
    .then(response => {
      console.log(response)
      return response.data.rec
    })
    .catch(err => {
      console.log(err)
    })
}

export const checkRec = recId => {
  return axios
    .post('reclamations/checkRec', {
      _id: recId,


    })
    .then(response => {
      console.log('Reclamation checked !')
    }).catch(err => {
      console.log(err)
    })
}

export const deleteRec = recId => {
  return axios
    .post('reclamations/deleteRec', {
      _id: recId,


    })
    .then(response => {
      console.log('Reclamation deleted !')
    }).catch(err => {
      console.log(err)
    })
}

export const addResponse = newRes => {
  return axios
    .post('responses/addResponse', {
      name: newRes.name,
      description: newRes.description,
      user: newRes.user,
      reclamation: newRes.reclamation

    })
    .then(response => {
      console.log('done !')
    })
    .catch(err => {
      console.log(err)
    })
}

export const getMyResponses = rec => {
  return axios
    .get('responses/getMyResponses')
    .then(response => {
      console.log(response)
      return response.data.responses
    })
    .catch(err => {
      console.log(err)
    })
}


////////Patterns API 
////////////////////////////////////////////
//////////////////////////////

export const addPattern = newPattern => {
  return axios
    .post('patterns/addPattern', {
      name: newPattern.name,

    })
    .then(response => {
      console.log('Added !')
    }).catch(err => {
      console.log(err)
    })
}
export const getPatterns = pat => {
  return axios
    .get('patterns/getAllPatterns')
    .then(response => {
      console.log(response)
      return response.data.patterns
    })
    .catch(err => {
      console.log(err)
    })
}
export const deletePattern = patId => {
  return axios
    .post('patterns/deletePat', {
      _id: patId,


    })
    .then(response => {
      console.log('Pattern deleted !')
    }).catch(err => {
      console.log(err)
    })
}
////////Projects API 
////////////////////////////////////////////
//////////////////////////

export const getProjects = projectId => {
  return axios
    .get('projects/getMyProjects', {
      _id: projectId,


    })
    .then(response => {
      console.log(response)
      return response.data.projects
    })
    .catch(err => {
      console.log(err)
    })
}

export const deleteProject = projectId => {
  return axios
    .post('projects/deleteProject', {
      _id: projectId,


    })
    .then(response => {
      console.log('Project deleted !')
    }).catch(err => {
      console.log(err)
    })
}
