# zuxs

A small library for managing the state of a React application.

## How to use

### Installation

Run `npm i zuxs` command

### Create store

`create` function returns a hook that can be used inside your React components. State has to be updated immutably, so you have to use the `set` function that allows you to skip state merging (`{...state, value: newValue}`). For more convenience, there is a set of simple operators that simplify changes to arrays:

* `append` - Inserts a value at the end of the array;
* `removeItem` - Deletes a value by index or predicate;
* `updateItem` - Updates a value by index or predicate;

But you can create your own operators.

`get` allows you to get a state slice.

Define methods for changing the state in the state itself! Then just use them in your components.

```tsx
interface TodoStore {
  todos: Todo[];
  addTodo: (item: Todo) => void;
  removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => {
  return {
    todos: [
      {
        id: '1',
        title: 'First todo',
        text: 'First todo text'
      },
      {
        id: '2',
        title: 'Second todo',
        text: 'Second todo text'
      }
    ],
    addTodo: (item) => {
      set({ todos: append([item]) });
    },
    removeTodo: (id) => {
      set({ todos: removeItem((item) => item.id === id) });
    }
  }
})
```

### Use a store hook in your React components

```tsx
export const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <ul className={styles.todoList}>
      {
        todos.map((todo) => {
          return (
            <TodoItem todo={todo} key={todo.id} />
          );
        })
      }
    </ul>
  );
};
```