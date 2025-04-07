import { Column, Entity, BeforeInsert, OneToMany } from 'typeorm'
import { hashSync } from 'bcrypt'
import { BaseEntity } from 'src/modules/common/bases/entities/base.entity'
import { Url } from 'src/modules/url/entities/url.entity'

@Entity()
export class User extends BaseEntity {
	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ default: true })
	status: boolean

	@Column({ type: 'datetime', nullable: true })
	lastLogin: Date

	@OneToMany(() => Url, (url) => url.user)
	urls: Url[]

	@BeforeInsert()
	hashPassword() {
		this.password = hashSync(this.password, 10)
	}
}
