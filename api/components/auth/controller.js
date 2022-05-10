const auth = require('../../../auth');
const TABLA = 'auth';

const controller = (injectedStore) =>{
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });
        
        if (data.password === password) {
            // Generar token;
            //return data;
            return auth.sign(data);
        } else {
            throw new Error('Informacion invalida');
        }
    }

    const upsert = async (data)=> {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLA, authData);
    }

    return {
        upsert,
        login,
    };
}

module.exports = controller;