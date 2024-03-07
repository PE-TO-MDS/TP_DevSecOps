const express = require('express');
const giftListRoutes = require('./api/routes/giftListRoutes');
const giftListModel = require('./api/models/giftListModel');

const app = express();
app.use(express.json());

// Redirection de la racine vers /gifts
app.get('/', (req, res) => {
    res.redirect('/api/gifts');
});

app.use((req, res, next) => {
    req.db = giftListModel.pool;
    next();
});

// Assurez-vous que la route /gifts est définie dans giftListRoutes
app.use('/api', giftListRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
