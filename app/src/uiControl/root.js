export function makeRoot() {

    const state = {
        position: 0,
        options: [
            'Attack',
            'Magic',
            'Skill',
            'Item'
        ]
    }

    return {
        pressUp: () => {
            if (state.position === 0) return
            state.position = state.position - 1
            return state.options[state.position]
        },

        pressDown: () => {
            if (state.position === 3) return
            state.position = state.position + 1
            return state.options[state.position]
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
