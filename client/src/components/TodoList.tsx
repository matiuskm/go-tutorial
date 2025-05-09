import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../App"
import { Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import TodoItem from "./TodoItem"

export type Todo = {
    _id: string
    body: string
    completed: boolean
}

const TodoList = () => {
    const {data: todos, isLoading} = useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/todos`)
                console.log('base url', BASE_URL)
                const data = await res.json()
                console.log('data', data)
                if (!res.ok) throw new Error(data.error || "Something went wrong")

                return data || []
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <>
            <Text 
                fontSize={"4xl"} 
                textTransform={"uppercase"}
                fontWeight={"bold"}
                textAlign={"center"}
                my={2}
                bgGradient='linear(to-l, #0b85f8, #00ffff)'
                bgClip='text'
            >
                Today's Task
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size={"xl"} />
                </Flex>
            )}
            {!isLoading && todos?.length === 0 && (
                <Stack alignItems={"center"} gap={3}>
                    <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                        All tasks completed! 👍
                    </Text>
                    <img src="/go.png" alt="go logo" width={70} height={70} />
                </Stack>
            )}
            <Stack gap={3}>
                {todos?.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} />
                ))}
            </Stack>
        </>
    )
}

export default TodoList