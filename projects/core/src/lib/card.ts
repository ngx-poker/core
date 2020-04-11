export class Card {

    public src:     string = '';
    public suit:    string = '';
    public value:   number = 0;

    constructor(suit: string, value: number) {
        this.suit   = suit;
        this.value  = value;
    };

}

export interface CARD {
    'src':      string;
    'suit':     string;
    'value':    number;
}