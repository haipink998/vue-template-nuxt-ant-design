export default (context) => {
  const { app } = context;
  app.head.script = [
    ...context.app.head.script,
    {
      src: 'js/test.js'
    }
  ];
}