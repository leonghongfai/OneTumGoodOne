import firebase from './firebase'

const auth = firebase.auth()

export const createAccount = async ({username, email, password}, onSuccess, onFailure) => {
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

export const signOut = async(onSuccess, onFailure) => {
    try {
        await auth.signOut()
        return onSuccess()
    } catch (error) {
        return onFailure(error)
    }
}

export const logIn = async (email, password, onSuccess, onFailure) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        return onSuccess()
    } catch (error) {
        return onFailure(error)
    }
}




