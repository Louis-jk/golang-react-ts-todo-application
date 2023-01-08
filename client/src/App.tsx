import { useState } from 'react';
import './App.css';
import { Box, List, ThemeIcon } from '@mantine/core';
import useSWR from 'swr';
import AddTodos from './components/AddTodos';
import { CheckCircleFillIcon, CheckCircleIcon } from '@primer/octicons-react';

export interface ITodo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = 'http://localhost:3000';

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<ITodo[]>('api/todos', fetcher);

  async function markTodoAddDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: 'PATCH',
    }).then((r) => r.json());

    mutate(updated);
  }

  return (
    <Box
      sx={(theme) => ({
        padding: '2rem',
        width: '100%',
        maxWidth: '40rem',
        margin: '0 auto',
      })}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => {
          return (
            <List.Item
              key={`todo_list__${todo.id}`}
              onClick={() => markTodoAddDone(todo.id)}
              icon={
                todo.done ? (
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="gray" size={24} radius="xl">
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title}
            </List.Item>
          );
        })}
      </List>
      <AddTodos mutate={mutate} />
    </Box>
  );
}

export default App;
