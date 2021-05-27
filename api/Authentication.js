import firebase from './firebase'

const auth = firebase.auth()

const createAccount = async ({username, email, password}, onSuccess, onFailure) => {
    try {
            const credentials = auth.createUserWithEmailAndPassword(
                            email, password)
        const user = (await credentials).user
        if (user) {
            await user.updateProfile({
                displayName: username,
            })
            .then(function(){})
            .catch(function(error){})
            return onSuccess(user)
        }
    } catch (error) {
        return onFailure(error)
    }

}




export default createAccount;