import { reverse } from 'lodash';

const sortMessages = (messages, delay=0) => {
  const start = Date.now();

  let now = start;

  while (now - start < delay) {
    now = Date.now();
  }

  return reverse(messages);
};

export {
  sortMessages,
};
