const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module controls an AtlasIED Atmopshere AZM4/AZM8',
			},
			{
				type: 'static-text',
				id: 'info2',
				width: 12,
				label: ' ',
				value: `
					<div class="alert alert-warning">
						<div>
							<strong>Please read and understand the following before using this module:</strong>
							<br>
							Atmosphere third party parameter names are dynamically assigned during configuration of the AZM4/AZM8.<br />
							Please refer to the Third Party Control Message Table in the Atmosphere User Interface under Settings>Third Party Control>Message Table for a listing of all active third-party parameter names.<br />
							<br />
							<img src="/int/help/module/atlasied-atmosphere/third_party_table.png" width="50%" />
						</div>
					</div>
				`,
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 6,
				default: '192.168.0.1',
				regex: Regex.IP,
			},
			/*{
				type: 'number',
				id: 'poll_interval',
				label: 'Polling Interval (ms), set to 0 to disable polling',
				min: 50,
				max: 30000,
				default: 1000,
				width: 3,
			}*/
			{
				type: 'checkbox',
				id: 'verbose',
				label: 'Enable Verbose Logging',
				default: false,
				width: 12,
			},
			{
				type: 'static-text',
				id: 'info3',
				width: 12,
				label: ' ',
				value: `
				<div class="alert alert-info">
					<div>
						Enabling Verbose Logging will push all incoming and outgoing data to the log, which is helpful for debugging.
					</div>
				</div>
				`,
				isVisible: (configValues) => configValues.verbose === true,
			},
		]
	},
}
