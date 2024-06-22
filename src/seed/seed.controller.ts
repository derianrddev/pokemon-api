import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @ApiOperation({ summary: 'Execute seed' })
  @ApiResponse({ status: 200, description: 'Seed executed successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
