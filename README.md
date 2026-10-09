# MinecraftCompanionBot
Simple Minecraft bot written in JavaScript; built with [Mineflayer](https://github.com/PrismarineJS/mineflayer), uses [NodeJS](https://nodejs.org/en).  

Bot joins your server (non-premium or LAN-shared) and reacts to commands. You can set up custom nickname and prefix.  
This script is made for Linux, especially for Raspberry Pi computers (Tested on RPiOS, possibly working on other systems like windows after installing NodeJS).  

Before you use it, you need to install NodeJS (it's recommended to install node using [NVM](https://github.com/nvm-sh/nvm)) and other requirements - see [install.sh](https://github.com/kamile320/MinecraftCompanionBot/blob/main/install.sh).  

Usage: `node bot.js [IP/hostname] [port] [nickname]` - if nothing provided, it will use default values for IP/Port/Nick from [bot.js](https://github.com/kamile320/MinecraftCompanionBot/blob/main/bot.js). 

## Functions:
- basic chat response
- 'come' to make it come to you
- 'follow' to make it follow you
- 'stop' to make him stop following
- 'drop' to drop its inventory
- 'quit' to leave server
