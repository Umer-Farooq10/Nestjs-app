import { Injectable } from '@nestjs/common';
import users from "./__mock__/users.json";

@Injectable()
export class UsersService {
    findAll(role?: 'admin' | 'engineer' | 'intern') {
        console.log(role)
        if(role) {
            console.log('in')
            const user = users.filter(user => user.role === role)
            return user
        }
        return users
    }

    findOne(id: number) {
        const user = users.find(user => user.id === id)
        return user
    }

    create(user: { name: string, email: string, role: 'admin' | 'engineer' | 'intern' }) {
        const listOfUsersId = users.map(user => user.id)
        const maxId = Math.max(...listOfUsersId) + 1
        users.push({id: maxId, ...user})
        return this.findAll().sort((a, b) => b.id - a.id) // For sorting the users by descending order
    }

    update(id: number, updateUser: { name?: string, email?: string, role?: 'admin' | 'engineer' | 'intern' }) {
        const user = this.findOne(id)
        Object.assign(user, updateUser)
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
