import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { ENDPOINT, ITodo } from '../App';
import { KeyedMutator } from 'swr';

const AddTodos = ({ mutate }: { mutate: KeyedMutator<ITodo[]> }) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const update = await fetch(`${ENDPOINT}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(update);

    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps('title')}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps('body')}
          />

          <Button type="submit">Create todo</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth md={12} onClick={() => setOpen(true)}>
          ADD TODO
        </Button>
      </Group>
    </>
  );
};

export default AddTodos;
