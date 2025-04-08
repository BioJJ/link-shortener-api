import { BaseEntity } from 'src/modules/common/bases/entities/base.entity'
import { User } from 'src/modules/users/entities/user.entity'
import { Entity, Column, ManyToOne } from 'typeorm'

@Entity()
export class Url extends BaseEntity {
	@Column()
	originalUrl: string

	@Column({ unique: true })
	shortUrl: string

	@Column({ default: true })
	status: boolean

	@ManyToOne(() => User, (user) => user.urls)
	user: User

	@Column({ default: 0 })
	clicks: number
}
