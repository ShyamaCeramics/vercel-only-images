const express = require('express');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('routes'))

const port = 9000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from shyama app' });
});

app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
