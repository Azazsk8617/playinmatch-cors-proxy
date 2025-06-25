const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const token = req.headers['x-csrf-token'];
    const form = new URLSearchParams();
    form.append('phone', req.body.mobile);
    form.append('username', req.body.username);
    form.append('email', req.body.email);
    form.append('password', req.body.password);
    form.append('password_confirmation', req.body.mobile);

    const response = await axios.post('https://playinmatch.com/api2/v2/register', form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-TOKEN': token
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
