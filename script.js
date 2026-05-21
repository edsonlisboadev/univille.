(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);
  const form = $('#form');
  const input = $('#input');
  const list = $('#list');
  const empty = $('#empty');

  const state = { tasks: [] };

  const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;

  function render() {
    list.innerHTML = '';
    if (!state.tasks.length) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    state.tasks.forEach(t => {
      const li = document.createElement('li');
      li.className = 'flex items-center justify-between bg-white/3 p-3 rounded-lg';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';

      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = !!t.completed;
      chk.className = 'w-4 h-4';
      chk.addEventListener('change', () => { t.completed = !t.completed; render(); });

      const span = document.createElement('span');
      span.textContent = t.title;
      span.className = 'text-white ml-2';
      if (t.completed) span.classList.add('task-completed');

      left.appendChild(chk);
      left.appendChild(span);

      const actions = document.createElement('div');
      actions.className = 'flex gap-2';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'text-sm text-slate-200 px-2 py-1 rounded bg-white/5';
      editBtn.addEventListener('click', () => {
        const newTitle = prompt('Editar tarefa', t.title);
        if (newTitle == null) return;
        const trimmed = newTitle.trim();
        if (!trimmed) return alert('Título vazio não permitido');
        t.title = trimmed; render();
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Excluir';
      delBtn.className = 'text-sm text-red-300 px-2 py-1 rounded bg-white/5';
      delBtn.addEventListener('click', () => {
        state.tasks = state.tasks.filter(x => x.id !== t.id);
        render();
      });

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    state.tasks.unshift({ id: id(), title: v, completed: false, createdAt: Date.now() });
    input.value = '';
    render();
  });

  // allow Enter in input (already handled by form submit), keep input focused
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') input.value = '';
  });

  render();
})();
