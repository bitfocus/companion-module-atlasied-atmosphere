const { combineRgb } = require('@companion-module/base')

module.exports = {
	initFeedbacks: function () {
		let self = this
		let feedbacks = {}

		const foregroundColorWhite = combineRgb(255, 255, 255) // White
		const backgroundColorRed = combineRgb(255, 0, 0) // Red
		const backgroundColorGreen = combineRgb(0, 255, 0) // Green
		const backgroundColorOrange = combineRgb(255, 102, 0) // Orange

		feedbacks.zoneMute = {
			name: 'Show Zone Mute State',
			type: 'boolean',
			defaultStyle: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
			],
			callback: (feedback) => {
				const number = parseInt(feedback.options.number)

				const zoneMuteValue = self.variableValues[`ZoneMute_${number}`]
				if (zoneMuteValue === 'On') {
					return true
				}
				
				return false
			},
		}

		feedbacks.sourceMute = {
			name: 'Show Source Mute State',
			type: 'boolean',
			defaultStyle: {
                color: foregroundColorWhite,
                bgcolor: backgroundColorRed,
            },
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
			],
			callback: (feedback) => {
				const number = parseInt(feedback.options.number)

				const sourceMuteValue = self.variableValues[`SourceMute_${number}`]
				if (sourceMuteValue === 'On') {
					return true
				}
				
				return false
			},
		}

		this.setFeedbackDefinitions(feedbacks)
	},
}
