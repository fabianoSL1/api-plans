import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { GetPlanUseCase } from '../../application/use-cases/get-plan';
import { CreatePlanRequest } from '../../application/dto/create-plan.dto';
import { CreatePlanUseCase } from '../../application/use-cases/create-plan';

@Controller('plans')
export class PlanController {
  constructor(
    @Inject('PlanRepository') private readonly planRepository: PlanRepository,
  ) {}

  @Get(':id')
  async get(@Param('id') planId: string) {
    const getPlan = new GetPlanUseCase(this.planRepository);

    return await getPlan.execute(planId);
  }

  @Post()
  @HttpCode(201)
  async post(@Body() body: CreatePlanRequest) {
    const createPlan = new CreatePlanUseCase(this.planRepository);

    return await createPlan.execute(body);
  }
}
