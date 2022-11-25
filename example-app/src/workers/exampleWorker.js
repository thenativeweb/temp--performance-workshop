self.onmessage = ({ data: { question } }) => {
  new Promise(resolve => setTimeout(resolve, 3000)).
  then(
    () => {
      self.postMessage({
        answer: 42,
      });
    }
  );
};
