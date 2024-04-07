import { Injectable, NotFoundException } from '@nestjs/common';
import users from "./__mock__/users.json";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    findAll(role?: 'admin' | 'engineer' | 'intern') {
        if(role) {
            const rolesArray = users.filter(user => user.role === role)
            if(rolesArray.length === 0) {
                throw new NotFoundException("Role not found")
            }
            return rolesArray
        }
        return users
    }

    findOne(id: number) {
        const user = users.find(user => user.id === id)
        if(!user) {
            throw new NotFoundException("User not found")
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const listOfUsersId = users.map(user => user.id)
        const maxId = Math.max(...listOfUsersId) + 1
        users.push({id: maxId, ...createUserDto})
        return this.findAll().sort((a, b) => b.id - a.id) // For sorting the users by descending order
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id)
        Object.assign(user, updateUserDto)
        return user
    }

    delete(id) {
        const user = this.findOne(id)
        const index = users.indexOf(user)
        console.log(index);
        if (index != -1) {
            users.splice(index, 1)
        }
        return this.findAll()
    }
}
