export function createHealthManager(initialPartyMembers, initialEnemies) {
    const state = {
        party: {},
        enemies: {},
    };

    // Initialize health for party members and enemies
    initialPartyMembers.forEach(member => {
        state.party[member.id] = {
            currentHp: member.maxHp,
            maxHp: member.maxHp,
            isDead: false
        };
    });

    initialEnemies.forEach(enemy => {
        state.enemies[enemy.id] = {
            currentHp: enemy.maxHp,
            maxHp: enemy.maxHp,
            isDead: false
        };
    });

    return {
        updateHealth: (targetId, amount) => {
            let target = state.party[targetId] || state.enemies[targetId];
            if (!target) {
                throw new Error(`Target with id ${targetId} not found`);
            }

            target.currentHp = Math.max(0, Math.min(target.currentHp + amount, target.maxHp));
            target.isDead = target.currentHp === 0;
        },

        getHealth: (targetId) => {
            let target = state.party[targetId] || state.enemies[targetId];
            if (!target) {
                throw new Error(`Target with id ${targetId} not found`);
            }
            return {
                currentHp: target.currentHp,
                maxHp: target.maxHp,
                isDead: target.isDead
            };
        },

        isTargetDead: (targetId) => {
            let target = state.party[targetId] || state.enemies[targetId];
            if (!target) {
                throw new Error(`Target with id ${targetId} not found`);
            }
            return target.isDead;
        },

        getAllPartyStatus: () => {
            return Object.entries(state.party).map(([id, data]) => ({
                id,
                currentHp: data.currentHp,
                maxHp: data.maxHp,
                isDead: data.isDead
            }));
        },

        getAllEnemyStatus: () => {
            return Object.entries(state.enemies).map(([id, data]) => ({
                id,
                currentHp: data.currentHp,
                maxHp: data.maxHp,
                isDead: data.isDead
            }));
        },

        processHealthAction: (action) => {
            if (action.type === 'physical-attack-result' || action.type === 'magic-attack-result') {
                this.updateHealth(action.target, -action.amount);
            } else if (action.type === 'heal-hp-result') {
                this.updateHealth(action.target, action.amount);
            }
        }
    };
}