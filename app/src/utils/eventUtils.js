import {generateRandomId} from './utils.js'

export function createEvent(props) {
    return {
        id: generateRandomId(),
        name: props.name
    }
}
          
