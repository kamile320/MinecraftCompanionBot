const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear, GoalFollow } } = require('mineflayer-pathfinder');

const ver     = '0.1';
const prefix  = '!';
const options = {
    host:     process.argv[2]           || 'localhost',        // localhost by default, use IP of your server
    port:     parseInt(process.argv[3]) || 25565,              // Server port
    username: process.argv[4]           || 'Raspberry_Kerman', // Username
    //password: process.argv[5]           || 'password',         // Password
    hideErrors: false,
    //physicsEnabled: false
};
console.log('MinecraftCompanionBot\n\nUsername: '+options.username+'\nVersion: v'+ver+'\n=====================\n');


const bot = mineflayer.createBot(options);
const RANGE_GOAL = 2; // get within this radius of the player
const cmd_list = "hi, bye, come, follow, stop, drop, quit, help";
bot.loadPlugin(pathfinder);


bot.once('spawn', () => {
    console.log('Joined.');
    bot.chat('hi!');
});



// Functions
/*
async function consume (bot) {
  try {
    await bot.consume()
    console.log('Finished consuming')
  } catch (error) {
    console.log(error)
  }
}
*/

async function dropAll() {
  const items = bot.inventory.items()
  for (let i = 0; i < items.length; i++) {
    await bot.tossStack(items[i])
  }
}


async function come(username){
    const defaultMove = new Movements(bot);
    const target = bot.players[username]?.entity;
    if (!target) {
        bot.chat("I don't see you !");
        return;
    }
    const { x: playerX, y: playerY, z: playerZ } = target.position;

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL));
    bot.chat('Incoming!');
}


async function follow(username){
    const target = bot.players[username]?.entity;
    if (!target || !target.position) {
        bot.chat("I don't see you !");
        return;
    }

    const defaultMove = new Movements(bot);

    defaultMove.allow1by1towers = true
    defaultMove.canDig = false

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalFollow(target, RANGE_GOAL), true);
    bot.chat('Following!');
}



/*
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, {
    port: options.port+1, 
    firstPerson: false,
    viewDistance: 4 
})
})
*/



bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (!message.startsWith(prefix)) return;

    const args = message.slice(prefix.length).trim().split(' ');
    const Message = args[0].toLowerCase();

    if (Message == 'hi'){
        bot.chat('Hi!');
        return;

    }else if (Message == 'bye'){
        bot.chat('Bye!');
        return;

    }else if (Message == 'come'){
        come(username) // Comes to player

    }else if (Message == 'follow'){
        follow(username) // Follows player

    }else if (Message == 'stop'){
        bot.pathfinder.setGoal(null);
        bot.clearControlStates();
        bot.chat('Stopped.');
        return;

    }else if (Message == 'quit'){
        bot.quit();
        return;

    }else if (Message == 'help'){
        bot.chat('Commands['+prefix+']: '+cmd_list);
        return;

    }else if (Message == 'drop'){
        dropAll();
        return;

    }else {
        bot.chat('Unknown command. Type '+prefix+'help to see the list of commands.');
        return;
    }
})


bot.on('kicked', (reason) => {
    console.log('Got kicked for reason: '+reason);
});

bot.on('error', (console.log));
bot.on('entityHurt', (entity) => {
    //if (entity.id !== bot.entity.id) return;
    //bot.chat('Ouch!');
    return;
})