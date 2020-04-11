import {
    Game,
    GAME,
    Card,
    CARD,
    Player,
    PLAYER,
} from 'projects/core/src/lib/core';
import { OnInit, Component } from '@angular/core';

@Component({
    selector:       'app-root',
    styleUrls:      ['./app.component.scss'],
    templateUrl:    './app.component.html'
})

export class AppComponent implements OnInit {

    public game: GAME;
    
    constructor() {};
    
    public async play() {
        this.game = new Game();

        await this.game.addPlayer();
        await this.game.deal();
        await this.game.flop();
    };

    ngOnInit() {
        this.play();
    };

}