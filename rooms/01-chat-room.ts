import { Player } from './../models/player';
import { Monster } from './../models/monster';
import { Room } from "colyseus";

export class ChatRoom extends Room {
    // this room supports only 4 clients connected
    maxClients = 4;
    opponent = new Monster("Fomor", 60);
    myPlayers = {};
    actions = {};

    onInit (options) {
        console.log("BasicRoom created!", options);
    }

    onJoin (client) {
        this.broadcast(`${ client.sessionId } joined.`);
        this.myPlayers[client.sessionId] = new Player("Lann", 60);
    }

    onLeave (client) {
        this.broadcast(`${ client.sessionId } left.`);
    }

    onMessage (client, data) {
        this.actions[client.sessionId] = this.myPlayers[client.sessionId].getAction();
        var playerAction = this.actions[client.sessionId];
        var opponentAction = this.opponent.getAction();
        if((opponentAction === "ROCK") && (playerAction === "PAPER")
        || (opponentAction === "PAPER") && (playerAction === "SCISSORS")
        || (opponentAction === "SCISSORS") && (playerAction === "ROCK")
        ) {
            this.broadcast(`${ client.sessionId } WIN THE ROUND`);
        } else if(opponentAction == playerAction){
            this.broadcast("DRAW");
        } else {
            this.broadcast(`${ client.sessionId } LOSE THE ROUND`);
            this.broadcast(`Player used ` + playerAction);
            this.broadcast(`Monster used ` + opponentAction);
        }
        
    }

    onDispose () {
        console.log("Dispose BasicRoom");
    }

}
