const { ActionRowBuilder, ChannelType, Colors, PermissionFlagsBits, StringSelectMenuBuilder } = require('discord.js')
const config = require('../../settings/config');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if(!interaction.isButton()) return;

        if(interaction.customId == 'ticket') {
            
            let ticket = interaction.guild.channels.create({
                name: `Select a category`,
                type: ChannelType.GuildText,
                parent: config.ticket_category,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    embeds: [{
                        title: "Ticket System",
                        description: "Please select a category for your ticket !",
                        color: Colors.Blurple,
                    }],
                    components: [
                        new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                            .setCustomId('category')
                            .setPlaceholder('Select a category')
                            .addOptions([
                                {
                                    label: 'General Inquiry',
                                    description: 'For general questions and inquiries',
                                    value: 'general_inquiry',
                                    emoji: '🗨️'
                                },
                                {
                                    label: 'Technical Support',
                                    description: 'For technical issues and support',
                                    value: 'technical_support',
                                    emoji: '🛠️'
                                },
                                {
                                    label: 'Billing Support',
                                    description: 'For billing and payment issues',
                                    value: 'billing_support',
                                    emoji: '💰'
                                }
                            ])
                        )
                    ]
                });
                c.send({
                    content: `${interaction.user}`
                }).then(msg => {
                    setTimeout(() => {
                        msg.delete(), 1000
                    })
                });
            });
            interaction.reply({
                content: `:white_check_mark: | Your ticket has been created !`,
                ephemeral: true
            })
        }
    }
}
