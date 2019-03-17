export class CreateGame {
    
    playerName: string;
    numPlayers: number;

    constructor(playerName:string, numPlayers: number) {
        this.playerName = playerName;
        this.numPlayers = numPlayers;
    }
}