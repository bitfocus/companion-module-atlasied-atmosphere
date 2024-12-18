module.exports = {
	// ##########################
	// #### Instance Actions ####
	// ##########################
	initActions: function () {
		let self = this
		let actions = {}

		actions.source_gain_set_value = {
			name: 'Set Source Gain By Value',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Value',
					id: 'value',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Source'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = parseInt(value)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.source_gain_set_percent = {
			name: 'Set Source Gain By Percent',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Percent',
					id: 'percent',
					default: '50',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Source'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let percent = await self.parseVariablesInString(options.percent)
				percent = parseInt(percent)
				//make sure percent is valid
				if (percent < 0) {
					percent = 0
				} else if (percent > 100) {
					percent = 100
				}

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							pct: percent,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.source_gain_bump_increase = {
			name: 'Bump/Increase Source Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Increase',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Source'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.source_gain_bump_decrease = {
			name: 'Bump/Decrease Source Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Decrease',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Source'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = -Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.source_mute = {
			name: 'Set Source Mute',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is SourceMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Mute On/Off',
					id: 'mute',
					default: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Source'
				let busSetting = 'Mute'

				let number = await self.parseVariablesInString(options.number)
				let mute = options.mute

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: mute ? 1 : 0,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.mix_gain_set_value = {
			name: 'Set Mix Gain By Value',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is MixGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Value',
					id: 'value',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Mix'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = parseInt(value)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.mix_gain_set_percent = {
			name: 'Set Mix Gain By Percent',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is MixGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Percent',
					id: 'percent',
					default: '50',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Mix'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let percent = await self.parseVariablesInString(options.percent)
				percent = parseInt(percent)
				//make sure percent is valid
				if (percent < 0) {
					percent = 0
				} else if (percent > 100) {
					percent = 100
				}

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							pct: percent,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.mix_gain_bump_increase = {
			name: 'Bump/Increase Mix Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is MixGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Increase',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Mix'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.mix_gain_bump_decrease = {
			name: 'Bump/Decrease Mix Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is MixGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Decrease',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Mix'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = -Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.mix_mute = {
			name: 'Set Mix Mute',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is MixMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Mute On/Off',
					id: 'mute',
					default: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Mix'
				let busSetting = 'Mute'

				let number = await self.parseVariablesInString(options.number)
				let mute = options.mute

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: mute ? 1 : 0,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_gain_set_value = {
			name: 'Set Zone Gain By Value',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Value',
					id: 'value',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = parseInt(value)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_gain_set_percent = {
			name: 'Set Zone Gain By Percent',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Percent',
					id: 'percent',
					default: '50',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let percent = await self.parseVariablesInString(options.percent)
				percent = parseInt(percent)
				//make sure percent is valid
				if (percent < 0) {
					percent = 0
				} else if (percent > 100) {
					percent = 100
				}

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							pct: percent,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_gain_bump_increase = {
			name: 'Bump/Increase Zone Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Increase',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_gain_bump_decrease = {
			name: 'Bump/Decrease Zone Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneGain_0, enter 0 here.',
					id: 'number',
					default: '1',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Decrease',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = -Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_mute = {
			name: 'Set Zone Mute',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is ZoneMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Mute On/Off',
					id: 'mute',
					default: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Mute'

				let number = await self.parseVariablesInString(options.number)
				let mute = options.mute

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: mute ? 1 : 0,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_gain_set_value = {
			name: 'Set Group Gain By Value',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is GroupGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Value',
					id: 'value',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = parseInt(value)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_gain_set_percent = {
			name: 'Set Group Gain By Percent',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is GroupGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Percent',
					id: 'percent',
					default: '50',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let percent = await self.parseVariablesInString(options.percent)
				percent = parseInt(percent)
				//make sure percent is valid
				if (percent < 0) {
					percent = 0
				} else if (percent > 100) {
					percent = 100
				}

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							pct: percent,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_gain_bump_increase = {
			name: 'Bump/Increase Group Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is GroupGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Increase',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_gain_bump_decrease = {
			name: 'Bump/Decrease Group Gain',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is GroupGain_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Gain Decrease',
					id: 'value',
					default: '1',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Gain'

				let number = await self.parseVariablesInString(options.number)
				let value = await self.parseVariablesInString(options.value)
				value = -Math.abs(parseInt(value))

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'bmp',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: value,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_mute = {
			name: 'Set Group Mute',
			options: [
				{
					type: 'textinput',
					label: 'Number',
					tooltip: 'i.e. If third party parameter is GroupMute_0, enter 0 here.',
					id: 'number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'checkbox',
					label: 'Mute On/Off',
					id: 'mute',
					default: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Mute'

				let number = await self.parseVariablesInString(options.number)
				let mute = options.mute

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: mute ? 1 : 0,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.zone_set_source = {
			name: 'Set Zone Source',
			options: [
				{
					type: 'textinput',
					label: 'Zone Number',
					tooltip: 'i.e. If third party parameter is ZoneSource_0, enter 0 here.',
					id: 'zone_number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Source Number',
					id: 'source_number',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Zone'
				let busSetting = 'Source'

				let zone_number = await self.parseVariablesInString(options.zone_number)
				let source_number = await self.parseVariablesInString(options.source_number)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + zone_number,
							val: parseInt(source_number),
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.group_set_source = {
			name: 'Set Group Source',
			options: [
				{
					type: 'textinput',
					label: 'Group Number',
					tooltip: 'i.e. If third party parameter is GroupSource_0, enter 0 here.',
					id: 'group_number',
					default: '0',
					useVariables: true,
				},
				{
					type: 'textinput',
					label: 'Source Number',
					id: 'source_number',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Group'
				let busSetting = 'Source'

				let group_number = await self.parseVariablesInString(options.group_number)
				let source_number = await self.parseVariablesInString(options.source_number)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + group_number,
							val: parseInt(source_number),
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.recall_routine = {
			name: 'Recall Routine',
			options: [
				{
					type: 'textinput',
					label: 'Routine Number',
					id: 'number',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Recall'
				let busSetting = 'Routine'

				let number = await self.parseVariablesInString(options.number)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: 1,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		actions.recall_scene = {
			name: 'Recall Scene',
			options: [
				{
					type: 'textinput',
					label: 'Scene Number',
					id: 'number',
					default: '0',
					useVariables: true,
				},
			],
			callback: async function (event) {
				let options = event.options

				let busType = 'Recall'
				let busSetting = 'Scene'

				let number = await self.parseVariablesInString(options.number)

				let cmdObj = {
					jsonrpc: '2.0',
					method: 'set',
					params: [
						{
							param: busType + busSetting + '_' + number,
							val: 1,
						},
					],
					id: self.config.controllerId
				}

				self.sendCommand(cmdObj)
			},
		}

		this.setActionDefinitions(actions)
	},
}
