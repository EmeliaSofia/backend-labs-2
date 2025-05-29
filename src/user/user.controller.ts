import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@ApiTags('User') 
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(@Paginate() query: PaginateQuery): Promise<Paginated<User>> {
        return this.userService.findAllPaginated(query);
    }

    @Post()
    @ApiBody({ type: CreateUserDto }) // ✅ для Swagger UI
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.userService.create(body);
    }
}
