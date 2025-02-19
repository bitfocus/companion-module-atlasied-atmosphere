const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	init_tcp: function () {
		let self = this

		if (self.socket !== undefined) {
			self.socket.destroy()
			delete self.socket
		}

		if (self.config.port === undefined) {
			self.config.port = 5321
		}

		if (self.config.host) {
			self.log('info', `Opening connection to ${self.config.host}:${self.config.port}`)

			self.socket = new TCPHelper(self.config.host, self.config.port)

			self.socket.on('error', function (err) {
				if (self.config.verbose) {
					self.log('warn', 'Error: ' + err)
				}

				self.stopIntervals()
				self.updateStatus(InstanceStatus.ConnectionFailure)
				self.handleError(err)
			})

			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok)
				self.startKeepAlive()

				self.subscribeData()

				if (self.config.enablePolling === true) {
					if (self.INTERVAL !== undefined) {
						clearInterval(self.INTERVAL)
						delete self.INTERVAL
					}

					self.INTERVAL = setInterval(function () {
						//self.getData()
					}, self.config.pollingInterval)
				}
			})

			self.receiveBuffer = ''

			self.socket.on('data', function (buffer) {
				try {
					let indata = buffer.toString('utf8')

					// Append new data to the receive buffer
					self.receiveBuffer += indata

					// Check if a newline character is present
					let newlineIndex = self.receiveBuffer.indexOf('\n')
					while (newlineIndex !== -1) {
						// Extract the complete message
						let completeMessage = self.receiveBuffer.substring(0, newlineIndex).trim()

						// Process the complete message
						if (completeMessage.length > 0) {
							try {
								self.updateData(completeMessage)
							} catch (err) {
								console.error('Error processing message:', err)
							}
						}

						// Remove processed data from buffer
						self.receiveBuffer = self.receiveBuffer.substring(newlineIndex + 1)

						// Check for additional newlines in remaining buffer
						newlineIndex = self.receiveBuffer.indexOf('\n')
					}
				} catch (err) {
					console.error('Error handling socket data:', err)
				}
			})
		}
	},

	startKeepAlive: function () {
		let self = this

		if (self.KEEPALIVE_INTERVAL !== undefined) {
			clearInterval(self.KEEPALIVE_INTERVAL)
			delete self.KEEPALIVE_INTERVAL
		}

		self.log('debug', 'Starting KeepAlive interval. Will run every 3 minutes.')

		self.KEEPALIVE_INTERVAL = setInterval(
			function () {
				let cmdObj = {
					jsonrpc: '2.0',
					method: 'get',
					params: [
						{
							param: 'KeepAlive',
							fmt: 'str',
						},
					],
					id: self.config.controllerId,
				}
				if (self.config.verbose) {
					self.log('debug', 'Sending KeepAlive command.')
				}
				self.sendCommand(cmdObj)
			},
			1000 * 60 * 3
		) // every 3 minutes
	},

	subscribeData: function () {
		let self = this

		//we will subscribe to all parameters by looping through the number of each of the possible kinds

		//Bell Schedule, 10 total
		let bellScheduleSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 10; i++) {
			let paramObj = {
				param: `BellScheduleName_${i}`,
				fmt: 'str',
			}
			bellScheduleSubObj.params.push(paramObj)
		}
		//self.sendCommand(bellScheduleSubObj)

		//GPO Preset Names, 20 total
		let gpoPresetNamesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 20; i++) {
			let paramObj = {
				param: `GpoPresetName_${i}`,
				fmt: 'str',
			}
			gpoPresetNamesSubObj.params.push(paramObj)
		}
		self.sendCommand(gpoPresetNamesSubObj)

		//GPO Status, 2 total
		let gpoStatusSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 2; i++) {
			let paramObj = {
				param: `GpoState_${i}`,
				fmt: 'val',
			}
			gpoStatusSubObj.params.push(paramObj)
		}
		self.sendCommand(gpoStatusSubObj)

		//Groups, 12 total
		let groupsSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 12; i++) {
			//GroupGain
			let groupGainParamObj = {
				param: `GroupGain_${i}`,
				fmt: 'val',
			}
			groupsSubObj.params.push(groupGainParamObj)

			//GroupMeter
			let groupMeterParamObj = {
				param: `GroupMeter_${i}`,
				fmt: 'val',
			}
			//groupsSubObj.params.push(groupMeterParamObj)

			//GroupMute
			let groupMuteParamObj = {
				param: `GroupMute_${i}`,
				fmt: 'val',
			}
			groupsSubObj.params.push(groupMuteParamObj)

			//GroupName
			let groupNameParamObj = {
				param: `GroupName_${i}`,
				fmt: 'str',
			}
			groupsSubObj.params.push(groupNameParamObj)

			//GroupSource
			let groupSourceParamObj = {
				param: `GroupSource_${i}`,
				fmt: 'val',
			}
			groupsSubObj.params.push(groupSourceParamObj)

			//GroupActive
			let groupActiveParamObj = {
				param: `GroupActive_${i}`,
				fmt: 'val',
			}
			groupsSubObj.params.push(groupActiveParamObj)
		}

		//Loud Noise Status, 20 total
		let loudNoiseStatusSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 20; i++) {
			let paramObj = {
				param: `LoudNoise_${i}`,
				fmt: 'val',
			}
			loudNoiseStatusSubObj.params.push(paramObj)
		}
		self.sendCommand(loudNoiseStatusSubObj)

		//Messages, 100 total
		let messagesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 100; i++) {
			let paramObj = {
				param: `MessageName_${i}`,
				fmt: 'str',
			}
			messagesSubObj.params.push(paramObj)
		}
		//self.sendCommand(messagesSubObj)

		//Mix Sources, 8 total
		//The mix number is the mix + 13, so mix 1 is 14, mix 2 is 15, etc.
		let mixSourcesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 1; i <= 8; i++) {
			let mixNumber = i + 13
			//There are 14 parameter levels for each mix - SourceGain_0 through SourceGain_13, SourceMute, etc.

			for (let j = 0; j < 14; j++) {
				//SourceGain
				let sourceGainParamObj = {
					param: `Mix_${mixNumber}_SourceGain_${j}`,
					fmt: 'val',
				}
				mixSourcesSubObj.params.push(sourceGainParamObj)

				//SourceMute
				let sourceMuteParamObj = {
					param: `Mix_${mixNumber}_SourceMute_${j}`,
					fmt: 'val',
				}
				mixSourcesSubObj.params.push(sourceMuteParamObj)
			}

			//each mix also has a gain, meter, mute, and name - MixGain_mixnumber, etc.
			//MixGain
			let mixGainParamObj = {
				param: `MixGain_${mixNumber}`,
				fmt: 'val',
			}
			mixSourcesSubObj.params.push(mixGainParamObj)

			//MixMeter
			let mixMeterParamObj = {
				param: `MixMeter_${mixNumber}`,
				fmt: 'val',
			}
			//mixSourcesSubObj.params.push(mixMeterParamObj)

			//MixMute
			let mixMuteParamObj = {
				param: `MixMute_${mixNumber}`,
				fmt: 'val',
			}
			mixSourcesSubObj.params.push(mixMuteParamObj)

			//MixName
			let mixNameParamObj = {
				param: `MixName_${mixNumber}`,
				fmt: 'str',
			}
			mixSourcesSubObj.params.push(mixNameParamObj)
		}
		self.sendCommand(mixSourcesSubObj)

		//Routines, 20 total
		let routinesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 20; i++) {
			let paramObj = {
				param: `RoutineName_${i}`,
				fmt: 'str',
			}
			routinesSubObj.params.push(paramObj)
		}
		self.sendCommand(routinesSubObj)

		//Scenes, 20 total
		let scenesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 20; i++) {
			let paramObj = {
				param: `SceneName_${i}`,
				fmt: 'str',
			}
			scenesSubObj.params.push(paramObj)
		}
		self.sendCommand(scenesSubObj)

		//Sources - 14 total - Gain, Meter, Mute, Name
		let sourcesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 14; i++) {
			//SourceGain
			let sourceGainParamObj = {
				param: `SourceGain_${i}`,
				fmt: 'val',
			}
			sourcesSubObj.params.push(sourceGainParamObj)

			//SourceMeter
			let sourceMeterParamObj = {
				param: `SourceMeter_${i}`,
				fmt: 'val',
			}
			//sourcesSubObj.params.push(sourceMeterParamObj)

			//SourceMute
			let sourceMuteParamObj = {
				param: `SourceMute_${i}`,
				fmt: 'val',
			}
			sourcesSubObj.params.push(sourceMuteParamObj)

			//SourceName
			let sourceNameParamObj = {
				param: `SourceName_${i}`,
				fmt: 'str',
			}
			sourcesSubObj.params.push(sourceNameParamObj)
		}
		self.sendCommand(sourcesSubObj)

		//Zones, 8 total - Gain, Meter, Mute, Name, Source
		let zonesSubObj = {
			jsonrpc: '2.0',
			method: 'sub',
			params: [],
			id: self.config.controllerId,
		}

		for (let i = 0; i < 8; i++) {
			//ZoneGain
			let zoneGainParamObj = {
				param: `ZoneGain_${i}`,
				fmt: 'val',
			}
			zonesSubObj.params.push(zoneGainParamObj)

			//ZoneMeter
			let zoneMeterParamObj = {
				param: `ZoneMeter_${i}`,
				fmt: 'val',
			}
			//zonesSubObj.params.push(zoneMeterParamObj)

			//ZoneMute
			let zoneMuteParamObj = {
				param: `ZoneMute_${i}`,
				fmt: 'val',
			}
			zonesSubObj.params.push(zoneMuteParamObj)

			//ZoneName
			let zoneNameParamObj = {
				param: `ZoneName_${i}`,
				fmt: 'str',
			}
			zonesSubObj.params.push(zoneNameParamObj)

			//ZoneSource
			let zoneSourceParamObj = {
				param: `ZoneSource_${i}`,
				fmt: 'val',
			}
			zonesSubObj.params.push(zoneSourceParamObj)
		}
		self.sendCommand(zonesSubObj)
	},

	handleError: function (err) {
		let self = this

		let error = err.toString()
		let printedError = false

		Object.keys(err).forEach(function (key) {
			if (key === 'code') {
				if (err[key] === 'ECONNREFUSED') {
					error =
						'Unable to communicate with Device. Connection refused. Is this the right IP address? Is it still online?'
					self.log('error', error)
					printedError = true
					if (self.socket !== undefined) {
						self.socket.destroy()
					}
				} else if (err[key] === 'ETIMEDOUT') {
					error =
						'Unable to communicate with Device. Connection timed out. Is this the right IP address? Is it still online?'
					self.log('error', error)
					printedError = true
					if (self.socket !== undefined) {
						self.socket.destroy()
					}
				} else if (err[key] === 'ECONNRESET') {
					error = 'The connection was reset. Check the log for more error information.'
					self.log('error', error)
					printedError = true
					if (self.socket !== undefined) {
						self.socket.destroy()
					}
				}
			}
		})

		if (!printedError) {
			self.log('error', `Error: ${error}`)
		}
	},

	sendCommand: function (cmdObj) {
		let self = this

		cmd = JSON.stringify(cmdObj)

		if (self.config.verbose) {
			self.log('debug', 'Sending: ' + cmd)
		}

		if (self.socket !== undefined && self.socket.isConnected) {
			self.socket.send(cmd + '\n')
		} else {
			if (self.config.verbose) {
				self.log('warn', 'Unable to send: Socket not connected.')
			}
		}
	},

	updateData: function (data) {
		let self = this

		if (self.config.verbose) {
			//self.log('debug', 'Received data: ' + data)
		}

		try {
			//do stuff with the data

			let dataObj = JSON.parse(data)

			//it will either contain a method="update" and a params object array, or a result object which is an array of params
			if (dataObj.method == 'update' || dataObj.result !== undefined) {
				//we have an update, so let's figure out what params are in the message and update those variables
				let params = []

				if (dataObj.params !== undefined && dataObj.params.length > 0) {
					params = dataObj.params
				} else if (dataObj.result !== undefined && dataObj.result.length > 0) {
					params = dataObj.result
				}

				if (params.length > 0) {
					let variableObj = {}

					for (let i = 0; i < params.length; i++) {
						let param = params[i].param
						let val = params[i].val

						//if val is undefined, try .str and use that instead
						if (val === undefined) {
							val = params[i].str
						} else {
							//if val is a number with decimal places, we will convert it to a float and limit it to 2 decimal places
							if (!isNaN(val) && val % 1 !== 0) {
								val = parseFloat(val).toFixed(2)
							}
						}

						//if the param is ZoneSource, let's find the corresponding SourceName and populate a ZoneSource_i_Name variable
						if (param.includes('ZoneSource_')) {
							let zoneNum = param.split('_')[1]
							let sourceNum = val
							let sourceName = self.variableValues[`SourceName_${sourceNum}`]

							if (sourceName !== undefined) {
								variableObj[`ZoneSource_${zoneNum}_Name`] = sourceName
							}
						}

						//if the param includes Mute in the name, let's change it to say On if it's 1 or Off if it's 0
						if (param.includes('Mute')) {
							if (val == 1) {
								val = 'On'
							} else {
								val = 'Off'
							}
						}

						if (self.config.verbose) {
							self.log('debug', `Updating ${param} to ${val}`)
						}

						variableObj[param] = val

						//also save it to an internal object for referencing
						self.variableValues[param] = val
					}

					self.setVariableValues(variableObj)
				}
			} else if (dataObj.method == 'error') {
				//likely params that do not exist, probably no need to log those for now
			}

			//now update feedbacks and variables
			self.checkFeedbacks()
			self.checkVariables()
		} catch (error) {
			self.log('error', 'Error parsing incoming data: ' + error)
			self.log('error', 'Data: ' + data)
		}
	},

	stopIntervals: function () {
		let self = this

		if (self.INTERVAL !== undefined) {
			if (self.config.verbose) {
				self.log('debug', 'Clearing Polling Interval.')
			}
			clearInterval(self.INTERVAL)
			delete self.INTERVAL
		}

		if (self.KEEPALIVE_INTERVAL !== undefined) {
			if (self.config.verbose) {
				self.log('debug', 'Clearing Keep-Alive Interval.')
			}
			clearInterval(self.KEEPALIVE_INTERVAL)
			delete self.KEEPALIVE_INTERVAL
		}
	},
}
