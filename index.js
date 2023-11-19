const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let data = [
    { id: 1, name: 'Prof. Léo Raiz' },
    { id: 2, name: 'Prof. Fausto' },
    // Dados ficticios para teste
];

// Rotas
app.get('/api/items', (req, res) => {
    res.json(data);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = data.length + 1;
    data.push(newItem);
    res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    data = data.map(item => (item.id === itemId ? { ...item, ...updatedItem } : item));

    res.json({ message: 'Usuário atualizado com sucesso' });
});

app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    data = data.filter(item => item.id !== itemId);
    res.json({ message: 'Usuário deletado com sucesso' });
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`servidor está rodando em http://localhost:${port}`);
});
