import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { CurrentUser } from './auth/decorators/current-user.decorator'
import { User } from './modules/users/entities/user.entity'
import { IsPublic } from './auth/decorators/is-public.decorator'
import { ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import { UrlService } from './modules/url/url.service'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly service: UrlService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('/me')
	getMe(@CurrentUser() currentUser: User) {
		return currentUser
	}

	@IsPublic()
	@ApiOperation({
		summary: 'Route to redirect to the original URL',
		description:
			'This route allows you to access the original URL using the short code.',
		tags: ['Url']
	})
	@Get(':shortCode')
	async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
		const originalUrl = await this.service.redirect(shortCode)
		if (originalUrl) {
			return res.redirect(originalUrl)
		} else {
			throw new NotFoundException('URL not found')
		}
	}
}
