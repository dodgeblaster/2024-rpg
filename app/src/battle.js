import { createInventory } from './inventory/inventory.js'
import BattleTimelineDS from './battleTimeline/battleTimeline.js'
import { createEnemy } from './enemy/enemy.js'
import { createPartyMember } from './partyMember/partyMember.js'

const itemDefs = {}

function createBattleState(party, enemies, inventory, itemDefs) {
    const enemyPlayers = enemies.map(x => createEnemy(x))
    const partyPlayers = party.map(x => createPartyMember(x))
    const items = createInventory(itemDefs, inventory)
    const timeline = new BattleTimelineDS({
        players: [...enemies, ...party]
    })

    return {
        enemies: enemyPlayers,
        partyMembers: partyPlayers,
        timeline, 
        items
    }
}

function makeAnnouncerUI(parent) {
    const div = document.createElement('div')
    div.style.height = 40
    div.style.width = '100%'
    div.style.border = '1px solid white'
    div.style.background = 'black'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.color = 'white'

    const setText = (text) => {
        div.innerHTML = '<p>' + text + '</p>'
    }

    parent.appendChild(div)
    return {
        setText
    }
}

export function makeLayoutUI(parent) {
    const div = document.createElement('div')
    div.style.height = '100vh'
    div.style.width = '100%'
    div.style.display = 'flex'
    div.style.flexDirection = 'column'

    div.innerHTML = `
        <div id='announcer' style='flex: 0 0 40px; border: 1px solid white; color: white; display: flex; justify-content: center; align-items: center;'></div>
        <div id='players' style='flex: 1; display: flex;'>
            <div id='enemies' style='flex: 1; border: 1px solid white '></div>
            <div id='party' style='flex: 0 0 200px; border: 1px solid white'></div>
        </div>
        <div id='controls' style='flex: 0 0 200px; border: 1px solid white; color: white; display: flex'>
            <div id='input' style='flex: 0 0 200px; border: 1px solid white; padding: 4px;'></div>
            <div id='enemy-status' style='flex: 0 0 200px; border: 1px solid white; padding: 4px;'></div>
            <div id='party-status' style='flex: 1; border: 1px solid white; padding: 4px;'></div>
        </div>
    `

    parent.appendChild(div)
    return {
        insertAnnouncer: div => document.getElementById('announcer').appendChild(div),
        insertEnemy: div => document.getElementById('enemies').appendChild(div),
        insertParty: div => document.getElementById('party').appendChild(div),
        insertEnemyStatus: div => document.getElementById('enemy-status').appendChild(div),
        insertPartyStatus: div => document.getElementById('party-status').appendChild(div),
        insertInput: div => document.getElementById('input').appendChild(div)

    }

}



function makeEnemyUI(enemy) {
    const div = document.createElement('div')
    div.style.height = '100px'
    div.style.borderRadius = '8px'
    div.style.width = '100px'
    div.style.margin = '10px'
    div.style.padding = '10px'
    div.style.border = '1px solid white'
    div.style.color = 'white'
    div.style.position = 'relative'
    div.id = enemy.getId() + '-ui-card'
    div.innerHTML = `<p>${enemy.getName()}</p>
        <div style='position: absolute; top: 35px; right: -10px; background: black; border: 1px solid white; border-radius: 4px; padding: 3px 3px 0px 3px;'>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <div>
    `
    
    return {
        div,
        displayDamage: () => {},
        animateAttack: () => {},
        setSelected: x => {
            const div = document.getElementById( enemy.getId() + '-ui-card')
            if (x) {
                div.children[1].children[0].setAttribute('stroke', 'white')
            } else {
                div.children[1].children[0].setAttribute('stroke', 'black')
            }
        }
    } 
}


function makePartyMemberUI(partyMember) {

    const data = partyMember.getStatusData()
    const div = document.createElement('div')  
    div.style.borderRadius = '8px'
    div.style.height = '100px'
    div.style.width = '100px'
    div.style.margin = '10px'
    div.style.padding = '10px'
    div.style.border = '1px solid aqua'
    div.style.color = 'white'
    div.innerHTML = `<p>${data.name}</p>`
    
    return {
        div,
        displayDamage: () => {},
        animateAttack: () => {}
    } 
}

function makeEnemyStatusUI(enemies) {
    const div = document.createElement('div')
    let html = ''
    enemies.forEach(e => {
            html = html + `<p id='${e.getId()}'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>${e.getName()}</span></p>`
    })

    div.innerHTML = html
    return {
        div
    }
}

function makePartyStatusUI(party) {
    const div = document.createElement('div')
    let html = ''
    party.forEach(p => {
        const data = p.getStatusData()
        html = html + `<p>${data.name} ${data.currentHp} / ${data.maxHp}</p>`
    })

    div.innerHTML = html
    return {
        div
    }
}

function makeInputUI() {
    const div = document.createElement('div')
    div.innerHTML = `
        <p id='input-attack'>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Attack</span></p>
        <p id='input-magic'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Magic</span></p>
        <p id='input-skill'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Skill</span></p>
        <p id='input-items'><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            <span>Items</span></p>
    `
    return {
        div
    }
}

function setupInputListeners(actions) {
    const state = {
        selected: 0,
        options: [
            'attack',
            'magic',
            'skill',
            'items'
        ],
        pointerMode: 'root',
        enemySelected: 0
    }

    const goUp = () => {
        if (state.pointerMode === 'root') {
            if (state.selected === 0) return
            state.selected = state.selected - 1
        }

        if (state.pointerMode === 'enemySelect') {
            if (state.enemySelected === 0) return
            state.enemySelected = state.enemySelected - 1

        }
    }
    const goDown = () => {
        if (state.pointerMode === 'root') {
            if (state.selected === 3) return
            state.selected = state.selected + 1
        }

        if (state.pointerMode === 'enemySelect') {
            if (state.enemySelected >= (Object.keys(actions.enemies).length - 1) ) return
            state.enemySelected = state.enemySelected + 1
        }
    }

    const accept = () => {
        if (state.pointerMode === 'root' && state.selected === 0) {
            state.pointerMode = 'enemySelect'
        }
    }

    const cancel = () => {
        if (state.pointerMode === 'enemySelect') {
            state.pointerMode = 'root'
        }
    }


    const render = () => {
        if (state.pointerMode === 'root') {
            const attack = document.getElementById('input-attack')
            const magic = document.getElementById('input-magic')
            const skills = document.getElementById('input-skill')
            const items = document.getElementById('input-items')

            attack.style.fontWeight = state.selected === 0 ? 'bold' :'normal'
            magic.style.fontWeight = state.selected === 1 ? 'bold' :'normal'
            skills.style.fontWeight = state.selected === 2 ? 'bold' :'normal'
            items.style.fontWeight = state.selected === 3 ? 'bold' :'normal'

            attack.children[0].setAttribute('stroke', state.selected === 0 ? 'white' : 'black')
            magic.children[0].setAttribute('stroke', state.selected === 1 ? 'white' : 'black')
            skills.children[0].setAttribute('stroke', state.selected === 2 ? 'white' : 'black')
            items.children[0].setAttribute('stroke', state.selected === 3 ? 'white' : 'black')

            Object.keys(actions.enemies).forEach((k) => {
                actions.enemies[k].setSelected(false)
            })
        }

        if (state.pointerMode === 'enemySelect') {
            Object.keys(actions.enemies).forEach((k, i) => {
                if (i === state.enemySelected) {
                    actions.enemies[k].setSelected(true)
                } else {
                    actions.enemies[k].setSelected(false)
                }
            })
        }
    }

    render()

    document.addEventListener('keypress', (e) => {
        if (e.key === 's') {
            goDown()
            render()
        }

        if (e.key === 'w') {
            goUp()
            render()
        }

   if (e.key === 'l') {
            accept()
            render()
        }

  if (e.key === 'k') {
            cancel()
            render()
        }




    })
    

}

export default function main(parent, definitions) {

    const state = createBattleState(definitions.heroes, definitions.enemies, definitions.itemState, definitions.itemDefs)
    const layout = makeLayoutUI(parent)

    const actions = {
        enemies: {}
    }

    state.enemies.forEach(e => {
        const enemyUI = makeEnemyUI(e)
        actions.enemies[e.getId()] = enemyUI
        layout.insertEnemy(enemyUI.div)
    })

    state.partyMembers.forEach(h => {
        const partyMemberUI1 = makePartyMemberUI(h)
        layout.insertParty(partyMemberUI1.div)
    })

    const enemyStatuslUI = makeEnemyStatusUI(state.enemies)
    layout.insertEnemyStatus(enemyStatuslUI.div)

    const partyStatuslUI = makePartyStatusUI(state.partyMembers)
    layout.insertPartyStatus(partyStatuslUI.div)

    const inputUI = makeInputUI()
    layout.insertInput(inputUI.div)
    setupInputListeners(actions)

}
