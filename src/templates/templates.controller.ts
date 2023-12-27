import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller()
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @MessagePattern('createTemplate')
  create(@Payload() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @MessagePattern('findAllTemplates')
  findAll() {
    return this.templatesService.findAll();
  }

  @MessagePattern('findOneTemplate')
  findOne(@Payload() id: number) {
    return this.templatesService.findOne(id);
  }

  @MessagePattern('updateTemplate')
  update(@Payload() updateTemplateDto: UpdateTemplateDto) {
    return this.templatesService.update(updateTemplateDto.id, updateTemplateDto);
  }

  @MessagePattern('removeTemplate')
  remove(@Payload() id: number) {
    return this.templatesService.remove(id);
  }
}
