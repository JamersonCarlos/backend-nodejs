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





conection.sync().then(
    app.listen(3000, () => { 
        console.log('api rodando');
    })
).catch((err) => console.log(err));



