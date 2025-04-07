import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true
		})
	)

	app.enableVersioning({
		type: VersioningType.URI
	})

	const config = new DocumentBuilder()
		.addSecurity('bearer', {
			type: 'http',
			scheme: 'bearer'
		})
		.setTitle('link-shortener-api')
		.setDescription('link-shortener-api')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('docs', app, document)

	const PORT = process.env.PORT ?? 3000

	await app.listen(PORT, '0.0.0.0')

	console.log(`[🤖]: Application is running on: ${await app.getUrl()}`)
}

bootstrap().catch((e) => {
	console.log(e)
})
