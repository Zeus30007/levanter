const bot = require('../lib/events')
const {
  addSpace,
  textToStylist,
  PREFIX,
  getUptime,
  PLUGINS,
  getRam,
  getDate,
  getPlatform,
} = require('../lib/')
const { VERSION } = require('../config')
bot.addCommand(
  {
    pattern: 'help ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    const [date, time] = getDate()
    let CMD_HELP = `
          ⨺⃝𝚁𝙾𝚂𝙴♱𝕹𝖆𝖙𝖍𝖆𝖓♱
♱────────────────♱
╋ Prefix : ${PREFIX}
╋ User : ${message.pushName}
╋ Time : ${time}
╋ Day : ${date.toLocaleString('en', { weekday: 'long' })}
╋ Date : ${date.toLocaleDateString('hi')}
╋ Version : ${VERSION}
╋ Plugins : ${PLUGINS.count}
╋ Ram : ${getRam()}
╋ Uptime : ${getUptime('t')}
╋ Platform : ${getPlatform()}
♱────────────────♱
╶⃝𝙼𝚒𝚛𝚊𝚗 𝚏𝚘𝚡𓃥×⨺⃝𝚁𝙾𝚂𝙴`
    sorted.map(async (command, i) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        CMD_HELP += `│ ${i + 1} ${addSpace(i + 1, sorted.length)}${textToStylist(
          command.name.toUpperCase(),
          'mono'
        )}\n`
      }
    })

    CMD_HELP += `♱───────────────♱`
    return await message.send('```' + CMD_HELP + '```')
  }
)

bot.addCommand(
  {
    pattern: 'list ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    let msg = ''
    const sorted = bot.commands.sort((a, b) => {
      if (a.name && b.name) {
        return a.name.localeCompare(b.name)
      }
      return 0
    })
    sorted.map(async (command, index) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        msg += `${index + 1} ${command.name}\n${command.desc}\n\n`
      }
    })
    await message.send('```' + msg.trim() + '```')
  }
)
bot.addCommand(
  {
    pattern: 'menu ?(.*)',
    dontAddCommandList: true,
  },
  async (message, match) => {
    const commands = {}
    bot.commands.map(async (command, index) => {
      if (command.dontAddCommandList === false && command.pattern !== undefined) {
        let cmdType = command.type.toLowerCase()
        if (!commands[cmdType]) commands[cmdType] = []
        let isDiabled = command.active === false
        let cmd = command.name.trim()
        commands[cmdType].push(isDiabled ? cmd + ' [disabled]' : cmd)
      }
    })
    const [date, time] = getDate()
    let msg = `\`\`\`♱⨺⃝𝚁𝙾𝚂𝙴♱
╋━♱──────────────♱
╋━ Prefix : ${PREFIX}
╋━ User : ${message.pushName}
╋━ Time : ${time}
╋━ Day : ${date.toLocaleString('en', { weekday: 'long' })}
╋━ Date : ${date.toLocaleDateString('hi')}
╋━ Version : ${VERSION}
╋━ Plugins : ${PLUGINS.count}
╋━ Ram : ${getRam()}
╋━ Uptime : ${getUptime('t')}
╋━ Platform : ${getPlatform()}
╋━♱───────────────♱
𝕹𝖆𝖙𝖍𝖆𝖓♱╶⃝𝙼𝚒𝚛𝚊𝚗 𝚏𝚘𝚡𓃥`

    if (match && commands[match]) {
      msg += ` ╋━♱ ${textToStylist(match.toLowerCase(), 'smallcaps')} ♱\n`
      for (const plugin of commands[match])
        msg += ` ♱ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
      msg += ` ╋━♱────────────────♱`

      return await message.send(msg)
    }
    for (const command in commands) {
      msg += ` ╋━♱ ${textToStylist(command.toLowerCase(), 'smallcaps')} ♱\n`
      for (const plugin of commands[command])
        msg += ` │ ${textToStylist(plugin.toUpperCase(), 'mono')}\n`
      msg += ` ╋━♱────────────────♱\n`
    }
    await message.send(msg.trim())
  }
)
