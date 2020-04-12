<img src="https://raw.githubusercontent.com/ngx-poker/core/master/projects/demo/src/assets/icon.png" width="100">

# @ngx-poker/core

This is a Typescript Library that makes poker intergrations easier!

## Installation

```sh
$ npm i --save @ngx-poker/core
```

## Usage

```javascript
import { Game } from '@ngx-poker/core';

...

/* Initialize Game */
const game = new Game();

/* Add Players */
await game.addPlayer();
await game.addPlayer();
await game.addPlayer();
await game.addPlayer();

/* Deal Cards To Players */
await game.deal();

/* Play Flop */
await game.flop();

/* Play Turn */
await game.turn();

/* Play River */
await game.river();

```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[![DEONATE](https://raw.githubusercontent.com/ngx-poker/core/master/projects/demo/src/assets/donate.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZVDGBQ9HJCE4Y&source=url)