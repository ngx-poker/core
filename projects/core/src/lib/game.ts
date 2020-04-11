import { Card, CARD } from './card';
import { PLAYER, Player } from './player';

export class Game {

    public deck:    CARD[]      = [];
    public board:   CARD[]      = [];
    public stage:   number      = 0;
    public imgsrc:  string      = './assets';
    public players: PLAYER[]    = [];

    constructor() {
        this.new();
        
        this.process();
    };

    private process() {
        if (this.players.length > 0) {
            this.players.map(player => {
                if (player.hand.length == 2) {
                    player.pair             = player.PAIR(this.board);
                    player.flush            = player.FLUSH(this.board);
                    player.twopair          = player.TWO_PAIR(this.board);
                    player.straight         = player.STRAIGHT(this.board);
                    player.highcard         = player.HIGH_CARD();
                    player.fullhouse        = player.FULL_HOUSE();
                    player.royalflush       = player.ROYAL_FLUSH();
                    player.fourofakind      = player.FOUR_OF_A_KIND(this.board);
                    player.threeofakind     = player.THREE_OF_A_KIND(this.board);
                    player.straightflush    = player.STRAIGHT_FLUSH();
                };
            });
        };

        window.requestAnimationFrame(() => this.process());
    };

    public async new() {
        let suites = ['clubs', 'diamonds', 'hearts', 'spades'];
        this.deck = [];

        await suites.map(suit => {
            for (let i = 2; i < 15; i++) {
                let card = new Card(suit, i);
                card.src = [this.imgsrc, '/', card.suit, '/', card.value, '.png'].join('');
                this.deck.push(card);
            };
        });

        await this.shuffle();

        return true;
    };

    public async deal() {
        this.stage = 0;

        await this.shuffle();
        await this.shuffle();
        
        await this.players.map(player => {
            player.hand.push(this.deck[this.deck.length - 1]);
            this.deck.splice(this.deck.length - 1, 1);
        });
        
        await this.players.map(player => {
            player.hand.push(this.deck[this.deck.length - 1]);
            this.deck.splice(this.deck.length - 1, 1);
        });
        
        return true;
    };

    public async flop() {
        for(let i = 0; i < 3; i++) {
            this.deck.splice(this.deck.length - 1, 1);
            this.board.push(this.deck[this.deck.length - 1]);
            this.deck.splice(this.deck.length - 1, 1);
        };

        this.stage = 1;
        
        return true;
    };

    public async turn() {
        this.deck.splice(this.deck.length - 1, 1);
        this.board.push(this.deck[this.deck.length - 1]);
        this.deck.splice(this.deck.length - 1, 1);

        this.stage = 2;
        
        return true;
    };

    public async reset() {
        this.players.map(player => {
            player.hand = [];
        });
        
        this.board = [];
        
        await this.new();

        this.stage = 0;

        await this.new();
        
        await this.shuffle();
        
        await this.deal();

        await this.flop();
        
        return true;
    };

    public async river() {
        this.deck.splice(this.deck.length - 1, 1);
        this.board.push(this.deck[this.deck.length - 1]);
        this.deck.splice(this.deck.length - 1, 1);

        this.stage = 3;
        
        return true;
    };

    public async shuffle() {
        let ci = this.deck.length;
        let ri;
        let tmp;
      
        while (0 !== ci) {
            ri              = Math.floor(Math.random() * ci);
            ci              -= 1;
            tmp             = this.deck[ci];
            this.deck[ci]  = this.deck[ri];
            this.deck[ri]  = tmp;
        };

        return true;
    };

    public async addPlayer() {
        this.players.push(new Player());
        
        return true;
    };

}

export interface GAME {
    'new':          Function;
    'deal':         Function;
    'flop':         Function;
    'turn':         Function;
    'deck':         CARD[];
    'reset':        Function;
    'river':        Function;
    'board':        CARD[];
    'players':      PLAYER[];
    'shuffle':      Function;
    'addPlayer':    Function;
}