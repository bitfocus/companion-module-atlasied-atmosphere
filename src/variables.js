module.exports = {
	initVariables: function () {
		let self = this
		let variables = []

		//properties are 0-based

		//Bell Schedule - 10 total
		/*for (let i = 0; i < 10; i++) {
			variables.push({
				name: `Bell Schedule ${i + 1} Name`,
				variableId: `BellScheduleName_${i}`,
			})
		}*/

		//GPO Preset Names - 20 total
		for (let i = 0; i < 20; i++) {
			variables.push({
				name: `GPO Preset ${i + 1} Name`,
				variableId: `GPOPresetName_${i}`,
			})
		}

		//GPO Status - 2 total
		for (let i = 0; i < 2; i++) {
			variables.push({
				name: `GPO ${i + 1} State`,
				variableId: `GPOState_${i}`,
			})
		}

		//Groups - 12 total - Gain, Meter, Mute, Name, Source, Active
		for (let i = 0; i < 12; i++) {
			variables.push({
				name: `Group ${i + 1} Gain`,
				variableId: `GroupGain_${i}`,
			})
			/*variables.push({
				name: `Group ${(i + 1)} Meter`,
				variableId: `GroupMeter_${i}`,
			})*/
			variables.push({
				name: `Group ${i + 1} Mute`,
				variableId: `GroupMute_${i}`,
			})
			variables.push({
				name: `Group ${i + 1} Name`,
				variableId: `GroupName_${i}`,
			})
			variables.push({
				name: `Group ${i + 1} Source`,
				variableId: `GroupSource_${i}`,
			})
			variables.push({
				name: `Group ${i + 1} Active`,
				variableId: `GroupActive_${i}`,
			})
		}

		//Loud Noise Status - 20 total
		for (let i = 0; i < 20; i++) {
			variables.push({
				name: `Loud Noise ${i + 1} Status`,
				variableId: `LoudNoise_${i}`,
			})
		}

		//Messages - 100 total
		/*for (let i = 0; i < 100; i++) {
			variables.push({
				name: `Message ${i + 1} Name`,
				variableId: `MessageName_${i}`,
			})
		}*/

		//Mix Sources, 8 total
		//The mix number is the mix + 13, so mix 1 is 14, mix 2 is 15, etc.
		for (let i = 1; i <= 8; i++) {
			let mixNumber = i + 13
			//There are 14 parameter levels for each mix - Mix_mixNumber_SourceGain_0-13, SourceMute, etc.
			for (let j = 0; j < 14; j++) {
				variables.push({
					name: `Mix ${i} Source ${j + 1} Gain`,
					variableId: `Mix_${mixNumber}_SourceGain_${j}`,
				})
				variables.push({
					name: `Mix ${i} Source ${j + 1} Mute`,
					variableId: `Mix_${mixNumber}_SourceMute_${j}`,
				})

				//each mix also has a gain, meter, muite, and name - MixGain_mixnumber, etc.
				variables.push({
					name: `Mix ${i} Gain`,
					variableId: `MixGain_${mixNumber}`,
				})
				/*variables.push({
					name: `Mix ${i} Meter`,
					variableId: `MixMeter_${mixNumber}`,
				})*/
				variables.push({
					name: `Mix ${i} Mute`,
					variableId: `MixMute_${mixNumber}`,
				})
				variables.push({
					name: `Mix ${i} Name`,
					variableId: `MixName_${mixNumber}`,
				})
			}
		}

		//Routines - 20 total
		for (let i = 0; i < 20; i++) {
			variables.push({
				name: `Routine ${i + 1} Name`,
				variableId: 'RoutineName_' + i,
			})
		}

		//Scenes - 20 total
		for (let i = 0; i < 20; i++) {
			variables.push({
				name: `Scene ${i + 1} Name`,
				variableId: 'SceneName_' + i,
			})
		}

		//Sources - 14 total - Gain, Meter, Mute, Name
		for (let i = 0; i < 14; i++) {
			variables.push({
				name: `Source ${i + 1} Gain`,
				variableId: `SourceGain_${i}`,
			})
			/*variables.push({
				name: `Source ${i + 1} Meter`,
				variableId: `SourceMeter_${i}`,
			})*/
			variables.push({
				name: `Source ${i + 1} Mute`,
				variableId: `SourceMute_${i}`,
			})
			variables.push({
				name: `Source ${i + 1} Name`,
				variableId: `SourceName_${i}`,
			})
		}

		//Zones - 8 total - Gain, Meter, Mute, Name, Source
		for (let i = 0; i < 8; i++) {
			variables.push({
				name: `Zone ${i + 1} Gain`,
				variableId: `ZoneGain_${i}`,
			})
			/*variables.push({
				name: 'Zone Meter' + (i + 1),
				variableId: `ZoneMeter_${i}`,
			})*/
			variables.push({
				name: `Zone ${i + 1} Mute`,
				variableId: `ZoneMute_${i}`,
			})
			variables.push({
				name: `Zone ${i + 1} Name`,
				variableId: `ZoneName_${i}`,
			})
			variables.push({
				name: `Zone ${i + 1} Source`,
				variableId: `ZoneSource_${i}`,
			})
			variables.push({
				name: `Zone ${i + 1} Source Name`,
				variableId: `ZoneSource_${i}_Name`,
			})
		}

		this.setVariableDefinitions(variables)
	},

	checkVariables: function () {
		let self = this

		try {
		} catch (error) {
			self.log('error', 'Error setting Variables from Device: ' + String(error))
		}
	},
}
