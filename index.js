// AtlasIED Atmopshere

const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const constants = require('./src/constants')
const utils = require('./src/utils')

class atmosphereInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
			...constants,
			...utils,
		})

		this.socket = undefined

		this.INTERVAL = null //used for polling device for feedbacks
		this.KEEPALIVE_INTERVAL = null //used for keeping connection alive

		this.variableValues = {}
	}

	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}

		this.stopIntervals()
	}

	async init(config) {
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.updateStatus(InstanceStatus.Connecting)

		this.config = config

		this.stopIntervals()

		if (this.config.controllerId === undefined) {
			this.config.controllerId = 10
		}

		this.initActions()
		this.initFeedbacks()
		this.initVariables()
		this.initPresets()

		this.init_tcp()
	}
}

runEntrypoint(atmosphereInstance, UpgradeScripts)
