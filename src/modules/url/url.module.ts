import { Module } from '@nestjs/common'
import { UrlService } from './url.service'
import { UrlController } from './url.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Url } from './entities/url.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Url])],
	controllers: [UrlController],
	providers: [UrlService],
	exports: [UrlService]
})
export class UrlModule {}
