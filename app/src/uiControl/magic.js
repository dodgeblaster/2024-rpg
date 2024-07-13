function groupItems(items) {
    const newArray = [];

    // Loop through the original array in steps of 3
    for (let i = 0; i < items.length; i += 3) {
        // Create a subarray with the next 3 elements
        const subarray = items.slice(i, i + 3);
        // Add the subarray to the new array
        newArray.push(subarray);
    }

    return newArray
}

export function makeMagic(magicList) {
    const state = {
        options: groupItems(magicList),
        cursorPositionX: 0,
        cursorPositionY: 0,
        windowPosition: 0
    }

    return {
        pressUp: () => {
            if (state.cursorPositionY === 0) return
            state.cursorPositionY = state.cursorPositionY - 1
            if (state.windowPosition > state.cursorPositionY) {
                state.windowPosition = state.windowPosition - 1
            }

            return state.options[state.cursorPositionY][state.cursorPositionX]
        },

        pressDown: () => {
            if (state.cursorPositionY >= state.options.length) return
            state.cursorPositionY = state.cursorPositionY + 1

            if (state.windowPosition + 3 < state.cursorPositionY) {
                state.windowPosition = state.windowPosition + 1
            }
            return state.options[state.cursorPositionY][state.cursorPositionX]
        },

        pressRight: () => {
            if (state.cursorPositionX >= 2) return 
            state.cursorPositionX = state.cursorPositionX + 1
            return state.options[state.cursorPositionY][state.cursorPositionX]
        },

        pressLeft: () => {
            if (state.cursorPositionX <= 0) return 
            state.cursorPositionX = state.cursorPositionX - 1
            return state.options[state.cursorPositionY][state.cursorPositionX]
        },

        pressAccept: () => {
            return state.options[state.position]
        },

        pressCancel: () => {
            return false
        },
        getRenderInfo: () => {
            
    

            return {
                size: {
                    heightInLines: 4,
                    widthInColumns: 1
                },
                contents: [
                    {
                        text: 'Attack',
                        position: [0,0],
                        selected: state.position === 0
                    },
                    {
                        text: 'Magic',
                        position: [0,1],
                        selected: state.position === 1
                    },
                    {
                        text: 'Skill',
                        position: [0,2],
                        selected: state.position === 2
                    },
                    {
                        text: 'Items',
                        position: [0,3],
                        selected: state.position === 3
                    }
                ]}
        }


    }
}
