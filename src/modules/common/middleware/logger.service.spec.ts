import { LoggerService } from './logger.service'

jest.mock('pino', () => {
	const mockLogger = {
		info: jest.fn(),
		debug: jest.fn(),
		error: jest.fn()
	}
	return jest.fn(() => mockLogger)
})

describe('LoggerService', () => {
	let loggerService: LoggerService

	beforeEach(() => {
		loggerService = new LoggerService()
	})

	describe('logInfo', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should log info messages', () => {
			const message = 'Hello, world!'
			const additionalData = { key: 'value' }

			loggerService.logInfo(message, additionalData)

			expect(loggerService.logger.info).toHaveBeenCalledWith({
				message,
				additionalData
			})
		})
	})

	describe('logDebug', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should log debug messages', () => {
			const message = 'Debugging info'
			const additionalData = { debug: true }

			loggerService.logDebug(message, additionalData)

			expect(loggerService.logger.debug).toHaveBeenCalledWith({
				message,
				additionalData
			})
		})
	})

	describe('logError', () => {
		afterEach(() => {
			jest.clearAllMocks()
		})

		it('should log error messages', () => {
			const message = 'An error occurred'
			const additionalData = { error: true }

			loggerService.logError(message, additionalData)

			expect(loggerService.logger.error).toHaveBeenCalledWith({
				message,
				additionalData
			})
		})
	})
})
