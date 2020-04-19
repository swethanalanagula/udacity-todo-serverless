import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { parseUserId } from '../auth/utils'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'

const todoAccess = new TodoAccess()

export async function getAllTodos(
    jwtToken: string
): Promise<TodoItem[]> {

    const userId = parseUserId(jwtToken)

    return todoAccess.getAllTodos(userId)
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    jwtToken: string
): Promise<TodoItem> {

    const todoId = uuid.v4()
    const userId = parseUserId(jwtToken)

    return await todoAccess.createTodo({
        userId,
        todoId,
        done: false,
        ...createTodoRequest,
        createdAt: new Date().getTime().toString()
    })
}