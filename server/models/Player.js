class Player{
    constructor(name, sessionID, type) {
        this.name=name;
        this.sessionID=sessionID;
        this.cards=[];
        this.piece='';
        this.status='';
        this.type=type;
        this.ready=false;
    }
};

module.exports = Player;

