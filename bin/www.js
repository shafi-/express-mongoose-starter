const app = require('../app');

const port = process.env.PORT || 4000;

//start the server
app.listen(port, () => {
  console.log(`listening on ${port}...`); // eslint-disable-line
});
