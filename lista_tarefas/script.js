(() => {
  const $ = (s) => document.querySelector(s);
  const form = $('#form');
  const input = $('#input');
  const list = $('#list');
  const empty = $('#empty');

  // ── MUDANÇA 1: limite de caracteres no input ──
  const MAX_CHARS = 60;
  input.setAttribute('maxlength', MAX_CHARS);

  // ── MUDANÇA 2: contador de caracteres ──
  const counter = document.createElement('p');
  counter.className = 'text-xs text-slate-400 mt-1 text-right';
  counter.textContent = `0/${MAX_CHARS}`;
  input.parentElement.appendChild(counter);

  input.addEventListener('input', () => {
    const len = input.value.length;
    counter.textContent = `${len}/${MAX_CHARS}`;
    // fica vermelho ao atingir o limite
    counter.classList.toggle('text-red-400', len >= MAX_CHARS);
    counter.classList.toggle('text-slate-400', len < MAX_CHARS);
  });

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
      li.className = 'flex items-center justify-between bg-white/3 p-3 rounded-lg gap-2';

      const left = document.createElement('div');
      // ── MUDANÇA 5: min-w-0 para respeitar o espaço disponível ──
      left.className = 'flex items-center gap-3 min-w-0 flex-1';

      const chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.checked = !!t.completed;
      chk.className = 'w-4 h-4 flex-shrink-0';
      chk.addEventListener('change', () => { t.completed = !t.completed; render(); });

      const span = document.createElement('span');
      span.textContent = t.title;
      // ── MUDANÇA 3: truncate para cortar texto que vaza ──
      span.className = 'text-white ml-2 truncate block';
      span.title = t.title; // tooltip com texto completo ao passar o mouse
      if (t.completed) span.classList.add('task-completed');

      left.appendChild(chk);
      left.appendChild(span);

      const actions = document.createElement('div');
      actions.className = 'flex gap-2 flex-shrink-0';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.className = 'text-sm text-slate-200 px-2 py-1 rounded bg-white/5';
      editBtn.addEventListener('click', () => {
        const newTitle = prompt('Editar tarefa', t.title);
        if (newTitle == null) return;
        const trimmed = newTitle.trim();
        if (!trimmed) return alert('Título vazio não permitido');
        // ── MUDANÇA 4: limite de 60 chars no prompt de edição ──
        if (trimmed.length > MAX_CHARS) return alert(`Máximo de ${MAX_CHARS} caracteres`);
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
    counter.textContent = `0/${MAX_CHARS}`;
    counter.classList.remove('text-red-400');
    counter.classList.add('text-slate-400');
    render();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      counter.textContent = `0/${MAX_CHARS}`;
      counter.classList.remove('text-red-400');
      counter.classList.add('text-slate-400');
    }
  });

  render();
})();