function getRandomValue(min,max) {
    return Math.floor(Math.random() * (max-min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            start: false,
            winner: null,
            logmessages: [],
        }
    },
    watch: {
        playerHealth(value) {
            if(value <=0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <=0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }else if (value <= 0) {
                this.winner = 'player';
            }
        }, 
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: '0%'};
            };
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {width: '0%'};
            };
            return {width: this.playerHealth + '%'};
        },
        
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.start = false;
            this.winner= null;
            this.logmessages= [];
        },
        counter() {
            if (this.start === true && this.currentRound>0) {
            this.currentRound--;
            console.log(this.currentRound);
        }},
        attackMonster() {
           this.counter();
           const attackValue = getRandomValue(5,12);
           this.monsterHealth -= attackValue;
           this.addLogmessage('player','attack', attackValue);
           this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.addLogmessage('monster','attack', attackValue);
        },
        specialAttack() {
        const attackValue = getRandomValue(10,25);
           this.monsterHealth -= attackValue;
           this.addLogmessage('player','special - attack', attackValue);
           this.attackPlayer();
           this.currentRound = 3;
           this.start = true;

        },
        healPlayer() {
            const healValue = getRandomValue(8,20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100}
                else {this.playerHealth += healValue;}
            this.addLogmessage('player','heal', healValue);
            this.attackPlayer();
            this.counter();
            },
        surrender() {
            this.winner = 'monster';
        },
        addLogmessage(who, what, value) {
            this.logmessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            })

        }
          
      
    }
});

app.mount('#game')
