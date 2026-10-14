// BizAgent chat widget (mock replies only; no API calls yet)
const MOCK_REPLY = 'Hi! I’m BizAgent. My AI brain isn’t connected yet.';
const REPLY_DELAY_MS = 600;

const chat = document.getElementById('chat');
const chatWindow = document.getElementById('chat-window');
const toggleBtn = document.getElementById('chat-toggle');
const closeBtn = document.getElementById('chat-close');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

function setOpen(open) {
  chat.classList.toggle('is-open', open);
  chatWindow.setAttribute('aria-hidden', String(!open));
  chatWindow.inert = !open;
  toggleBtn.setAttribute('aria-expanded', String(open));
  toggleBtn.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
  if (open) {
    input.focus();
  } else {
    toggleBtn.focus();
  }
}

function addMessage(text, from) {
  const item = document.createElement('li');
  item.className = `chat-msg chat-msg-${from}`;
  item.textContent = text; // never innerHTML for user/bot text
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
  return item;
}

toggleBtn.addEventListener('click', () => {
  setOpen(!chat.classList.contains('is-open'));
});

closeBtn.addEventListener('click', () => setOpen(false));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && chat.classList.contains('is-open')) {
    setOpen(false);
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  const typing = addMessage('BizAgent is typing…', 'bot');
  typing.classList.add('chat-msg-typing');

  setTimeout(() => {
    typing.remove();
    addMessage(MOCK_REPLY, 'bot');
  }, REPLY_DELAY_MS);
});
