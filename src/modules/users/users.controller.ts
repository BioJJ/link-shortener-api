import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { IsPublic } from 'src/auth/decorators/is-public.decorator'
import {
	ApiTags,
	ApiBody,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiUnauthorizedResponse,
	ApiOperation
} from '@nestjs/swagger'
import { DefaultUnauthorizedResponse } from '../common/swagger/DefaultUnauthorizedResponse'
import { DefaultForbiddenResponse } from '../common/swagger/DefaultForbiddenResponse'
import { DefaultInternalServerErrorResponse } from '../common/swagger/DefaultInternalServerErrorResponse'

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@IsPublic()
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Post()
	@ApiBody({ type: CreateUserDto })
	async create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return await this.usersService.create(createUserDto)
	}

	@ApiOperation({
		summary: 'Route to get all Users',
		description: 'This route allows you to retrieve all Users.',
		tags: ['User']
	})
	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Get()
	async findAll(): Promise<User[]> {
		return await this.usersService.findAll()
	}

	@ApiOperation({
		summary: 'Route to get User by ID',
		description: 'This route allows you to retrieve user by id.',
		tags: ['User']
	})
	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User> {
		return await this.usersService.findOne(+id)
	}

	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Patch(':id')
	@ApiBody({ type: UpdateUserDto })
	async update(
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto
	): Promise<void> {
		return await this.usersService.update(+id, updateUserDto)
	}

	@ApiUnauthorizedResponse(DefaultUnauthorizedResponse)
	@ApiForbiddenResponse(DefaultForbiddenResponse)
	@ApiInternalServerErrorResponse(DefaultInternalServerErrorResponse)
	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return await this.usersService.remove(+id)
	}
}
