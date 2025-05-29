import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery, Paginated, PaginateConfig } from 'nestjs-paginate';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto); 
        return this.usersRepository.save(user);
    }
    
    async findAllPaginated(query: PaginateQuery): Promise<Paginated<User>> {
        const paginateConfig: PaginateConfig<User> = {
            sortableColumns: ['id', 'name', 'email'],
            defaultSortBy: [['id', 'ASC']],
            searchableColumns: ['name', 'email'],
        };

        return paginate(query, this.usersRepository, paginateConfig);
    }
}
