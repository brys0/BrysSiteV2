const bodyParser = require('body-parser');
const app = require('express')();
const auth = require('./auth.json');
const { v4: uuidv4 } = require('uuid');
let token = uuidv4();
let swapper;
app.use(bodyParser.json())
app.post('/verify', (req, res) => {
  startSwap();
  if (JSON.stringify(req.body) === JSON.stringify(auth)) {
    return res.status(200).json({verifier: token});
  } else {
    return res
      .status(403)
      .json({ res: 'Incorrect email or password was given' });
  }
})
async function startSwap() {
    if (swapper) return;
    swapper = setInterval(() => {
        token = uuidv4();
    }, 5400000);
}
module.exports = app
