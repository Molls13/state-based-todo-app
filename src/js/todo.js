/* Todo app javascript */
const form = document.querySelector('.form');
const ul = document.querySelector('.todo');
const state = {
  todos: [],
};

const template = (todo) => {
  if (todo.done) {
    return `<li class="todo__item--completed" data-testid="todoItem"><p>${todo.task}</P>
        <button class="todo__button" data-testid="btnDeleteTodo">remove</button>
        </li>`;
  }
  return `<li class="todo__item" data-testid="todoItem"><p>${todo.task}</P></li>`;
};

const addEListeners = () => {
  const listItems = document.querySelectorAll('li');
  listItems.forEach((listItem, i) => {
    const pTags = listItem.childNodes[0];
    const buttonTags = listItem.childNodes[2];
    pTags.addEventListener('click', () => {
      const todo = state.todos[i];
      if (!todo.done) {
        todo.done = true;
        state.todos.splice(i, 1);
        state.todos = [...state.todos, todo];
        window.dispatchEvent(new Event('statechange'));
      } else {
        todo.done = false;
        state.todos.sort((a, b) => b.id - a.id).sort((a, b) => a.done - b.done);
        window.dispatchEvent(new Event('statechange'));
      }
    });
    if (buttonTags) {
      buttonTags.addEventListener('click', () => {
        state.todos.splice(i, 1);
        window.dispatchEvent(new Event('statechange'));
      });
    }
  });
};
const renderTodolist = () => {
  const htmlContent = state.todos.map((todo) => template(todo));
  ul.innerHTML = htmlContent.join('');
  addEListeners();
};

let counter = 0;
const handleSubmit = (e) => {
  e.preventDefault();
  const input = e.target.firstElementChild;
  if (!input.value.trim()) {
    return Error('please submit valid input');
  }
  const todo = {
    id: counter += 1,
    task: input.value,
    done: false,
  };
  state.todos = [todo, ...state.todos];
  input.value = '';
  return window.dispatchEvent(new Event('statechange'));
};

form.addEventListener('submit', handleSubmit);
window.addEventListener('statechange', renderTodolist);
