import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUrlDto } from './dto/create-url.dto'
import { UpdateUrlDto } from './dto/update-url.dto'
import { Url } from './entities/url.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UrlService {
	constructor(
		@InjectRepository(Url)
		private readonly repository: Repository<Url>
	) {}
	async create(createUrlDto: CreateUrlDto) {
		// Gera um código encurtado
		const shortCode = this.generateShortCode(6)
		// Monta a URL completa usando o código encurtado
		const shortUrl = `http://localhost/${shortCode}`

		// Cria um objeto URL e salva no banco
		const url = this.repository.create({
			originalUrl: createUrlDto.originalUrl,
			shortUrl: shortUrl,
			clicks: 0, // Inicializa os cliques como 0
			status: true // Inicializa o status como ativo
		})

		return await this.repository.save(url)
	}

	update(id: number, updateUrlDto: UpdateUrlDto) {
		return `This action updates a #${id} url`
	}

	async findAll() {
		return await this.repository.find({
			select: ['id', 'originalUrl', 'shortUrl', 'clicks', 'status'],
			where: { status: true }
		})
	}

	async findOne(id: number): Promise<Url> {
		const url = await this.repository.findOne({
			select: ['id', 'originalUrl', 'shortUrl', 'clicks', 'status'],
			where: { id }
		})

		if (!url) {
			throw new NotFoundException(`Não achei um url com o id ${id}`)
		}
		return url
	}

	async remove(id: number): Promise<void> {
		await this.findOne(id)

		if (!id) {
			throw new NotFoundException(`Não achei um url com o id ${id}`)
		}
		this.repository.softDelete({ id })
	}

	private generateShortCode(length: number): string {
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let result = ''
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length)
			result += characters[randomIndex]
		}
		return result
	}

	async redirect(shortCode: string): Promise<string> {
		// Busca a URL no banco baseado no short code
		const url = await this.repository.findOne({
			where: {
				shortUrl: `http://localhost/${shortCode}`,
				status: true,
				deletedAt: null
			}
		})

		if (!url) {
			throw new NotFoundException(
				`URL com shortcode ${shortCode} não encontrada.`
			)
		}

		// Incrementa os clicks
		url.clicks += 1
		await this.repository.save(url)

		return url.originalUrl
	}
}
