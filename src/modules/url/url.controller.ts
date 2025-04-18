import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Req
} from '@nestjs/common'
import { UrlService } from './url.service'
import { CreateUrlDto } from './dto/create-url.dto'
import { UpdateUrlDto } from './dto/update-url.dto'
import {
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger'
import { DefaultUnauthorizedResponse } from '../common/swagger/DefaultUnauthorizedResponse'
import { DefaultForbiddenResponse } from '../common/swagger/DefaultForbiddenResponse'
import { DefaultInternalServerErrorResponse } from '../common/swagger/DefaultInternalServerErrorResponse'
import { Url } from './entities/url.entity'
import { AuthRequest } from 'src/auth/models/AuthRequest'

@Controller('url')
@ApiTags('Urls')
export class UrlController {
	constructor(private readonly service: UrlService) {}

	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Post()
	@ApiBody({ type: CreateUrlDto })
	async create(
		@Body() createUrlDto: CreateUrlDto,
		@Req() request: AuthRequest
	) {
		const user = request.user
		const url = await this.service.create(createUrlDto, user)
		return url.shortUrl
	}

	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Patch(':id')
	@ApiBody({ type: UpdateUrlDto })
	async update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
		return await this.service.update(+id, updateUrlDto)
	}

	@ApiOperation({
		summary: 'Route to get all Urls',
		description: 'This route allows you to retrieve all Urls.',
		tags: ['Url']
	})
	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Get()
	async findAll(): Promise<Url[]> {
		return await this.service.findAll()
	}

	@ApiOperation({
		summary: 'Route to get Url by ID',
		description: 'This route allows you to retrieve Url by id.',
		tags: ['Url']
	})
	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Url> {
		return await this.service.findOne(+id)
	}

	@ApiOperation({
		summary: 'Route to delete Url by ID',
		description: 'This route allows you to retrieve Url by id.',
		tags: ['Url']
	})
	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.service.remove(+id)
	}
}
