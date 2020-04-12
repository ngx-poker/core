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
        await this.game.addPlayer();
        await this.game.addPlayer();
        await this.game.addPlayer();
        await this.game.deal();
        await this.game.flop();
    };

    public winner(id: string) {
        let found = false;
        let array: any = this.game.players.map(player => {
            if (player.score > 0) {
                found = true;
            };
            return player.score;
        });
        if (found) {
            let max = Math.max.apply(null, array);
            found = false;
            this.game.players.map(player => {
                if (max == player.score && player.id == id) {
                    found = true;
                };
            });
            if (found) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        }
    };

    ngOnInit() {
        this.play();
    };

}