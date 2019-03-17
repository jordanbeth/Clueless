export class JoinGame {
    
    playerName: string;
    roomId: string;

    constructor(playerName:string, roomId: string) {
        this.playerName = playerName;
        this.roomId = roomId;
    }
}