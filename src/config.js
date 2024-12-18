const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info1',
				width: 12,
				label: 'This module controls an AtlasIED Atmopshere AZM4/AZM8.',
				value: `Atmosphere third party parameter names are dynamically assigned during configuration of the AZM4/AZM8. Please refer to the Third Party Control Message Table in the Atmosphere User Interface under Settings>Third Party Control>Message Table for a listing of all active third-party parameter names.`,
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 6,
				default: '192.168.0.1',
				regex: Regex.IP,
			},
			{
				type: 'number',
				id: 'controllerId',
				label: 'Controller ID',
				width: 3,
				default: 10,
			},
			{
				type: 'static-text',
				id: 'controllerIdInfo',
				width: 9,
				label: ' ',
				value:
					'Controller ID is a unique identifier for Third Party Control. This should be unique across all controllers (i.e. multiple Companion instances against this unit).',
			},
			{
				type: 'static-text',
				id: 'hr1',
				width: 12,
				label: '',
				value: '<hr />',
			},
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 3,
			},
			{
				type: 'static-text',
				id: 'info3',
				width: 9,
				label: ' ',
				value: `Enabling Verbose Logging will push all incoming and outgoing data to the log, which is helpful for debugging.`,
			},
		]
	},
}
