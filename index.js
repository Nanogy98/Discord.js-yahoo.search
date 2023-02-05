client.once("ready", async () => {
  const data = [
    {
      name: "search",
      description: "Yahoo検索",
      options: [{
        type: "STRING",
        name: "word",
        description: "キーワードを入力してください",
        required: true,
      }],
    }
  ];
  await client.application.commands.set(data);
  console.log("set");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  if (interaction.commandName === "search") {
    const query = interaction.options.getString('word')
    var yahooJp = require('yahoo-jp');
    var queries = {
      p: `${query}`,
    };
    yahooJp.fetchAll(queries)
      .then(function(items) {
        interaction.reply({
          embeds: [
            {
              color: "BLUE",
              title: `${query}の検索結果`,
              fields: [
                {
                  name: items[0].title,
                  value: items[0].url + "\n" + items[0].body,
                },
                {
                  name: items[1].title,
                  value: items[1].url + "\n" + items[1].body,
                },
                {
                  name: items[2].title,
                  value: items[2].url + "\n" + items[2].body,
                },
                {
                  name: items[3].title,
                  value: items[3].url + "\n" + items[3].body,
                },
                {
                  name: items[4].title,
                  value: items[4].url + "\n" + items[4].body,
                },
              ],
            },
          ],
        });
      });
  }
})
