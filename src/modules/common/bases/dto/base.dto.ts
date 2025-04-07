import { IsOptional } from 'class-validator'

export class BaseDTO {
	@IsOptional()
	id?: number
	@IsOptional()
	createdAt?: Date
	@IsOptional()
	updatedAt?: Date
	@IsOptional()
	deletedAt?: Date
}
