const express = require('express');
const app = express();
const conection = require('./db/conn');
const SmartBin = require('./models/smartBin');

app.use(express.json());
app.get('/allbins', async (req, res) => { 
    const bins = await SmartBin.findAll({raw: true});
    const responseObject = { 
        message: 'Todas as lixeiras cadastradas', 
        data: Object.values(bins).length === 0 ? [] : bins
    }
    res.setHeader('Content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
});

app.get('/getbin/:identidade', async (req, res) => { 
    const bin = await SmartBin.findOne({where: {identidade: req.params.identidade}});
    const responseObject = { 
        message: 'Lixeira encontrada', 
        data: bin
    }
    res.setHeader('content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
})

app.post('/addbin', (req, res) => { 
    SmartBin.create(req.body).then(
        res.json({message: 'Lixeira Adicionado com sucesso!'})
    ).catch((err) => console.log(err));
});

app.put('/update/:identidade', (req, res) => { 
    const identidade = req.params.identidade;
    const newAltura = req.body.update;
    SmartBin.update({altura_lixo: newAltura}, {where: {identidade: identidade}}).then(
        res.json({message: 'Atualizada com sucesso'})
    ).catch((err) => console.log(err));    
});

conection.sync().then(
    app.listen(3000, () => { 
        console.log('api rodando');
    })
).catch((err) => console.log(err));



