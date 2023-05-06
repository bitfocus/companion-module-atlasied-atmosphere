const { InstanceStatus, TCPHelper } = require('@companion-module/base')

module.exports = {
	init_tcp: function() {
		let self = this;

		if (self.socket !== undefined) {
			self.socket.destroy();
			delete self.socket;
		}
	
		if (self.config.port === undefined) {
			self.config.port = 5321;
		}
	
		if (self.config.host) {
			self.log('info', `Opening connection to ${self.config.host}:${self.config.port}`);
	
			self.socket = new TCPHelper(self.config.host, self.config.port);
	
			self.socket.on('error', function (err) {
				if (self.config.verbose) {
					self.log('warn', 'Error: ' + err);
				}
	
				this.stopIntervals();
				self.updateStatus(InstanceStatus.ConnectionFailure);
				self.handleError(err);
			});
	
			self.socket.on('connect', function () {
				self.updateStatus(InstanceStatus.Ok);
				self.startKeepAlive();
			});
	
			self.socket.on('data', function(buffer) {
				let indata = buffer.toString('utf8');
	
				//update feedbacks and variables
				self.updateData(indata);
			});
	
		}
	},

	startKeepAlive: function() {
		let self = this;

		if (self.KEEPALIVE_INTERVAL !== undefined) {
			clearInterval(self.KEEPALIVE_INTERVAL);
			delete self.KEEPALIVE_INTERVAL;
		}

		self.log('debug', 'Starting KeepAlive interval. Will run every 3 minutes.');

		self.KEEPALIVE_INTERVAL = setInterval(function() {
			let cmdObj = {
				jsonrpc: '2.0',
				method: 'get',
				params: [
					{
						param: 'KeepAlive',
						fmt: 'str'
					}
				]
			}
			if (self.config.verbose) {
				self.log('debug', 'Sending KeepAlive command.');
			}
			self.sendCommand(cmdObj);
		}, (1000 * 60 *  3)); // every 3 minutes
	},
	
	handleError: function(err) {
		let self = this;
	
		let error = err.toString();
		let printedError = false;
	
		Object.keys(err).forEach(function(key) {
			if (key === 'code') {
				if (err[key] === 'ECONNREFUSED') {
					error = 'Unable to communicate with Device. Connection refused. Is this the right IP address? Is it still online?';
					self.log('error', error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ETIMEDOUT') {
					error = 'Unable to communicate with Device. Connection timed out. Is this the right IP address? Is it still online?';
					self.log('error', error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
				else if (err[key] === 'ECONNRESET') {
					error = 'The connection was reset. Check the log for more error information.';
					self.log('error', error);
					printedError = true;
					if (self.socket !== undefined) {
						self.socket.destroy();
					}
				}
			}
		});
	
		if (!printedError) {
			self.log('error', `Error: ${error}`);
		}
	},

	sendCommand: function(cmdObj) {
		let self = this;

		cmd = JSON.stringify(cmdObj);

		if (self.config.verbose) {
			self.log('debug', 'Sending: ' + cmd);
		}
		
		if (self.socket !== undefined && self.socket.isConnected) {	
			self.socket.send(cmd + '\n');
		}
		else {
			if (self.config.verbose) {
				self.log('warn', 'Unable to send: Socket not connected.');
			}
		}
	},

	updateData: function(data) {
		let self = this;
	
		if (self.config.verbose) {
			self.log('debug', 'Received data: ' + data);
		}
	
		try {
			//do stuff with the data

			//now update feedbacks and variables
			self.checkFeedbacks();
			self.checkVariables();
		}
		catch(error) {
			self.log('error', 'Error parsing incoming data: ' + error);
			self.log('error', 'Data: ' + data);
		}
	},

	stopIntervals: function() {
		let self = this;

		if (self.INTERVAL !== undefined) {
			if (self.config.verbose) {
				self.log('debug', 'Clearing Polling Interval.');
			}
			clearInterval(self.INTERVAL);
			delete self.INTERVAL;
		}

		if (self.KEEPALIVE_INTERVAL !== undefined) {
			if (self.config.verbose) {
				self.log('debug', 'Clearing Keep-Alive Interval.');
			}
			clearInterval(self.KEEPALIVE_INTERVAL);
			delete self.KEEPALIVE_INTERVAL;
		}
	}
}