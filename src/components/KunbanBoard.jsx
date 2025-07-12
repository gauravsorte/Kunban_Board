import React, { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
  Input,
  IconButton,
  Button,
} from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { INITIAL_DATA } from './constants'

const getInitialTaskCounter = (initialData) => {
  const taskIds = Object.keys(initialData.tasks)
  if (taskIds.length === 0) return 1

  let maxNum = 0
  taskIds.forEach((id) => {
    const num = parseInt(id.replace('task-', ''), 10)
    if (!isNaN(num) && num > maxNum) {
      maxNum = num
    }
  })
  return maxNum + 1
}

export default function App() {
  const [data, setData] = useState(INITIAL_DATA)
  const [newTaskText, setNewTaskText] = useState({})
  const [taskCounter, setTaskCounter] = useState(() =>
    getInitialTaskCounter(INITIAL_DATA),
  )

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return

    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      })
    } else {
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      })
    }
  }

  const handleAddTask = (columnId) => {
    const text = newTaskText[columnId]?.trim()
    if (!text) return

    const newTaskId = `task-${taskCounter}`
    const newTask = {
      id: newTaskId,
      content: text,
    }

    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          taskIds: [...prev.columns[columnId].taskIds, newTaskId],
        },
      },
    }))

    setTaskCounter((prev) => prev + 1)
    setNewTaskText((prev) => ({ ...prev, [columnId]: '' }))
  }

  return (
    <Box p={4} minH="100vh">
      <Heading mb={6}>Kanban Board</Heading>

      <DragDropContext onDragEnd={onDragEnd}>
        <Flex gap={6} flexWrap="wrap">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds
              .map((taskId) => data.tasks[taskId])
              .filter(Boolean)

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <VStack
                    bg="white"
                    p={4}
                    borderRadius="md"
                    w="300px"
                    minH="400px"
                    align="stretch"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    boxShadow="md"
                  >
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading size="md" className="box-content">
                        {column.title}
                      </Heading>
                    </Flex>

                    {tasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            p={3}
                            mb={2}
                            bg={snapshot.isDragging ? 'blue.100' : 'gray.50'}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="sm"
                          >
                            <Text className="box-content">{task.content}</Text>
                          </Box>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    {/* Add Task Input */}
                    <Box mt={2}>
                      <Input
                        size="sm"
                        placeholder="New task..."
                        value={newTaskText[column.id] || ''}
                        onChange={(e) =>
                          setNewTaskText((prev) => ({
                            ...prev,
                            [column.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddTask(column.id)
                        }}
                        mb={2}
                        className="box-content"
                      />
                      <Button
                        size="sm"
                        colorScheme="blue"
                        w="full"
                        onClick={() => handleAddTask(column.id)}
                      >
                        Add
                      </Button>
                    </Box>
                  </VStack>
                )}
              </Droppable>
            )
          })}
        </Flex>
      </DragDropContext>
    </Box>
  )
}
