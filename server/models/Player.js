class Player{
    constructor(socketId, name, piece) {
        this.name=name;
        this.piece=piece;
        this.socketId = socketId;
        this.cards=[];
    }
};

module.exports = Player;