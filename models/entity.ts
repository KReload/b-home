
const CONSTANTS = {
    "actions": ["ROCK", "PAPER", "SCISSORS"]
}
const ACTIONS = CONSTANTS.actions;

export class Entity{
    name;
    life;
    action;
    constructor(name, life) {
        this.name = name;
        this.life = life;
        this.action = "READY";
    }

    getAction(){
        this.action = ACTIONS[Math.floor(Math.random()*3)];
        return this.action;
    }

}