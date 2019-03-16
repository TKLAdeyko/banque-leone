const config = {
    defaultSettings: {
      prefix: "_",
      modLogChannel: "server-logs",
      modRole: "Général",
      adminRole: "Maréchal",
      systemNotice: true
    },
    permLevels: [
      { level: 0, name: "Utilisateur", check: () => true },
      {
        level: 1,
        name: "Colonel",
        check: message => {
          try {
            const modRole = message.guild.roles.find(
              r => r.name.toLowerCase() === message.settings.modRole.toLowerCase()
            );
            if (modRole && message.member.roles.has(modRole.id)) return true;
          } catch (e) {
            return false;
          }
        }
      },
      {
        level: 2,
        name: "Général",
        check: message => {
          try {
            const adminRole = message.guild.roles.find(
              r =>
                r.name.toLowerCase() === message.settings.adminRole.toLowerCase()
            );
            if (adminRole && message.member.roles.has(adminRole.id)) return true;
          } catch (e) {
            return false;
          }
        }
      },
      {
        level: 3,
        name: "Maréchal",
        check: message => message.client.appInfo.owner.id === message.author.id
      }
    ]
  };
  
  module.exports = config;