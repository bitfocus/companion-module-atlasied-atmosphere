module.exports = {
	// ##########################
	// #### Define Variables ####
	// ##########################
	initVariables: function () {
		let self = this;
		let variables = [];

		this.setVariableDefinitions(variables)
	},

	// #########################
	// #### Check Variables ####
	// #########################
	checkVariables: function () {
		let self = this;

		try {
		}
		catch(error) {
			self.log('error', 'Error setting Variables from Device: ' + String(error));
		}
	}
}