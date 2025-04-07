import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUrlDto {
  @IsNotEmpty()
    @ApiProperty({
      example: 'https://example.com/example',
      description: `Url padrao enviada a ser encurtada.`
    })
    originalUrl: string
}
