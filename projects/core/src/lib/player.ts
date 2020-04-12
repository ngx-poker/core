import { CARD } from './card';
import { ObjectId } from './id';
import { isPlatformWorkerApp } from '@angular/common';

export class Player {
    
    public id:              string;
    public name:            string;
    public hand:            CARD[] = [];
    public pair:            boolean;
    public score:           number = 0;
    public flush:           boolean;
    public twopair:         boolean;
    public straight:        boolean;
    public highcard:        number;
    public fullhouse:       boolean;
    public royalflush:      boolean;
    public fourofakind:     boolean;
    public threeofakind:    boolean;
    public straightflush:   boolean;

    constructor() {
        this.id = ObjectId();
    };

    public ROYAL_FLUSH(board: CARD[]) {
        if (this.straight) {
            let cards = board.concat(this.hand).map(c => c.value).sort((a, b) => a - b);
            let found = {
                '10': false,
                '11': false,
                '12': false,
                '13': false,
                '14': false
            };
            cards.map(card => {
                if (card == 10) {
                    found['10'] = true;
                };
                if (card == 11) {
                    found['11'] = true;
                };
                if (card == 12) {
                    found['12'] = true;
                };
                if (card == 13) {
                    found['13'] = true;
                };
                if (card == 14) {
                    found['14'] = true;
                };
            });
            if (Object.keys(found).filter(key => found[key]).length >= 5) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    };

    public STRAIGHT_FLUSH() {
        if (this.flush && this.straight) {
            return true;
        } else {
            return false;
        };
    };

    public FOUR_OF_A_KIND(board: CARD[]) {
        let tmp = {};
        let cards = board.concat(this.hand).map(c => c.value);
        cards.map(card => {
            tmp[card] = 0;
        });
        Object.keys(tmp).map(key => {
            tmp[key] = cards.filter(c => c == parseInt(key)).length;
        });
        let toak: boolean = false;
        Object.keys(tmp).map(key => {
            if (tmp[key] == 4) {
                toak = true;
            };
        });
        return toak;
    };

    public FULL_HOUSE() {
        if (this.twopair && this.threeofakind) {
            return true;
        } else {
            return false;
        };
    };

    public FLUSH(board: CARD[]) {
        let tmp = {};
        let cards = board.concat(this.hand).map(c => c.suit);
        cards.map(card => {
            tmp[card] = 0;
        });
        Object.keys(tmp).map(key => {
            tmp[key] = cards.filter(c => c == key).length;
        });
        let flush: boolean = false;
        Object.keys(tmp).map(key => {
            if (tmp[key] >= 5) {
                flush = true;
            };
        });
        return flush;
    };

    public STRAIGHT(board: CARD[]) {
        let cards = board.concat(this.hand).map(c => c.value).sort((a, b) => a - b);
        let diffs = 0;
        let difcs = [];
        cards.sort((a, b) => {
            if (diffs < 4) {
                if (a - b == 1) {
                    diffs++;
                    difcs.push(b);
                } else if (a - b == 0) {
                    // ignore
                } else {
                    diffs = 0;
                };
            };
            return 0;
        });

        if (diffs < 4) {
            return false;
        };

        let hit     = false;
        let hand    = this.hand.map(c => c.value).sort((a, b) => a - b);
        hand.map(card => {
            if (card >= difcs[0]) {
                hit = true;
            } else if (card <= difcs[difcs.length - 1]) {
                hit = true;
            };
        });

        return hit;
    };

    public THREE_OF_A_KIND(board: CARD[]) {
        let tmp = {};
        let cards = board.concat(this.hand).map(c => c.value);
        cards.map(card => {
            tmp[card] = 0;
        });
        Object.keys(tmp).map(key => {
            tmp[key] = cards.filter(c => c == parseInt(key)).length;
        });
        let toak: boolean = false;
        Object.keys(tmp).map(key => {
            if (tmp[key] == 3) {
                toak = true;
            };
        });
        return toak;
    };

    public TWO_PAIR(board: CARD[]) {
        let pairs: number = 0;
        
        this.hand.map(card => {
            board.map(o => {
                if (o.value == card.value) {
                    pairs++;
                };
            });
        });

        if (pairs == 2) {
            return true;
        } else {
            return false;
        };
    };

    public PAIR(board: CARD[]) {
        let paired: boolean = false;
        
        this.hand.map(card => {
            board.map(o => {
                if (o.value == card.value) {
                    paired = true;
                };
            });
        });

        return paired;
    };

    public HIGH_CARD() {
        return this.hand.map(card => card.value)[0] + this.hand.map(card => card.value)[1];
    };

}

export interface PLAYER {
    'id':               string;
    'name':             string;
    'hand':             CARD[];
    'pair':             boolean;
    'score':            number;
    'flush':            boolean;
    'twopair':          boolean;
    'straight':         boolean;
    'highcard':         number;
    'fullhouse':        boolean;
    'royalflush':       boolean;
    'fourofakind':      boolean;
    'threeofakind':     boolean;
    'straightflush':    boolean;
    'PAIR':             Function;
    'FLUSH':            Function;
    'STRAIGHT':         Function;
    'TWO_PAIR':         Function;
    'HIGH_CARD':        Function;
    'FULL_HOUSE':       Function;
    'ROYAL_FLUSH':      Function;
    'FOUR_OF_A_KIND':   Function;
    'STRAIGHT_FLUSH':   Function;
    'THREE_OF_A_KIND':  Function;
}