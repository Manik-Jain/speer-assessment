import LocalStorage from 'local-storage-es6'
import {
    properties
} from './conf.js' 

function localStorageInstance() {
    return new LocalStorage({
        path: './cache',
        key: properties.get('app.secret'),
        mkdir: true,
        encryptFileName: true,
        encryptFileContent: false
    })
}

export default localStorageInstance