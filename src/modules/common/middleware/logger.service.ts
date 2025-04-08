import { Injectable } from '@nestjs/common'
import pino from 'pino'

@Injectable()
export class LoggerService {
	private readonly loggerInstance = pino({
		level: 'info',
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true, // Habilita cores nos logs
				translateTime: 'SYS:standard', // Adiciona timestamps formatados
				ignore: 'pid,hostname', // Remove `pid` e `hostname` dos logs
				singleLine: true // Mostra logs em uma única linha
			}
		}
	})

	get logger(): pino.Logger {
		return this.loggerInstance
	}

	logInfo(
		message: string,
		additionalData?: Record<string, unknown> | string
	): void {
		this.logger.info({ message, additionalData })
	}

	logDebug(
		message: string,
		additionalData?: Record<string, unknown> | string
	): void {
		this.logger.debug({ message, additionalData })
	}

	logError(
		message: string,
		additionalData?: Record<string, unknown> | string
	): void {
		this.logger.error({ message, additionalData })
	}
}
