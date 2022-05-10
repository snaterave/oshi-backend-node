//const nanoid = require('nanoid');
const { v4: uuidv4 } = require('uuid');
const auth = require('../auth');

const TABLA = 'user';

const controller = (injectedStore) =>{
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const list = async ()=>{
        return store.list(TABLA);
    };

    const get = (id)=>{
        return store.get(TABLA, id);
    };

    const upsert = async (body)=>{
        const user = {
            name: body.name,
            username: body.username
        };

        (body.id) ? user.id = body.id : user.id = uuidv4();
        
        if(body.password || body.username){
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}
module.exports = controller;
/*module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function list() {
        return store.list(TABLA);
    }

    async function get(id) {
        return store.get(TABLA, id);
    }

    return {
        list,
        get
    };
}*/