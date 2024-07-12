const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Bet } = require('../../models');

async function handleMatchBet(interaction) {
    const betId = interaction.customId.split('_')[1];
    const bet = await Bet.findByPk(betId);

    if (!bet) {
        return interaction.reply({ content: 'Tato sázka již neexistuje.', ephemeral: true });
    }

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId(`confirmmatch_${bet.id}`)
            .setLabel('Ano')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setCustomId(`cancelmatch_${bet.id}`)
            .setLabel('Ne')
            .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
        content: `Jsi si jistý, že chceš dorovnat ${bet.item}?`,
        components: [row],
        ephemeral: true
    });
}


module.exports = handleMatchBet;
