function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}


export class PartyMember {
    constructor(props){
        this.hp = props.hp
        this.mp = props.mp
        this.speed = props.speed
        this.partyMemberId = props.partyMemberId
        this.name = props.name,
        this.id = generateRandomId(6)
    }

    applyDamage = (props) => {
        this.hp = Math.max(0, this.hp - props.damage)
    }

    requestAction = () => {
        return [
            {
                name: "Attack",
                strength: 100,
                effect: "hp:subtract",
                target: "enemy:single",
                weight: 1
            },
            {
                name: "Heal",
                strength: 100,
                effect: "hp:add",
                target: "party:single",
                weight: 1
            },
 
 
        ]
    }
}
