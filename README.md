# GOOB

discord bot for valorant players stuck in low elo

[![GitHub](https://img.shields.io/github/stars/yourpov/GOOB?style=social)](https://github.com/yourpov/GOOB)

## features

warmup routines, aim drills, valorant tips, sens calculator, qotd, polls, role selection, moderation tools

## setup

install dependencies

```ts
npm install
```

configure the .env

```ini
DISCORD_TOKEN=
CLIENT_ID=
GUILD_ID=
```

now just build and deploy commands

```ts
npm run build
node dist/deploy.js
npm start
```

## commands

training: `/warmup` `/drill` `/tip` `/sens`  
engagement: `/qotd` `/poll` `/pookie`  
utility: `/reactionrole` `/setup` `/invite` `/rank`  
moderation: `/kick` `/timeout` `/clear`
