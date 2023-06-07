const express = require('express');
const app = express();
const conection = require('./db/conn');
const SmartBin = require('./models/smartBin');

app.use(express.json());
app.get('/allbins', (req, res) => { 
    const bins = SmartBin.findAll({raw: true});
    const responseObject = { 
        message: 'Todas as lixeiras cadastradas', 
        data: Object.values(bins).length === 0 ? [] : bins
    }
    res.setHeader('Content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
});

app.post('/addbin', (req, res) => { 
    SmartBin.create(req.body).then(
        res.json({message: 'Lixeira Adicionado com sucesso!'})
    ).catch((err) => console.log(err));
});

app.put('/update/:id', (req, res) => { 
    const id = req.params.id;
    const newAltura = req.body.update;
    SmartBin.update({altura_lixo: newAltura}, {where: {identidade: id}}).then(
        res.json({message: 'Atualizada com sucesso'})
    ).catch((err) => console.log(err));    
});

conection.sync().then(
    app.listen(3000, () => { 
        console.log('api rodando');
    })
).catch((err) => console.log(err));



