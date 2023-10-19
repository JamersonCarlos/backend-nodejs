const express = require('express');
const app = express();
const conection = require('./db/conn');
const SmartBin = require('./models/smartBin');
// const admin = require('./firebase-config');

app.use(express.json());

// const notification_options = {
//     priority: "high",
//     timeToLive: 60 * 60 * 24
// };

app.get('/', async(req, res) => { 
    const bins = await SmartBin.findAll({raw: true});
    const responseObject = { 
        message: 'Todas as lixeiras cadastradas', 
        data: Object.values(bins).length === 0 ? [] : bins
    }
    res.setHeader('Content-type', 'application/json');
    const jsonResponse = JSON.stringify(responseObject);
    res.end(jsonResponse);
});

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

app.put('/updateDetection/:identidade', (req, res) => { 
    const identidade = req.params.identidade;
    const detectionMetano = req.body.detectionMetano;
    SmartBin.update({detectionMetano: detectionMetano}, {where: {identidade: identidade}}).then(
        res.json({message: 'Atualizada com sucesso'})
    ).catch((err) => console.log(err));
});

// app.post('/firebase/notification', (req, res)=>{
//     const  registrationToken = req.body.registrationToken
//     const message = req.body.message
//     const options =  notification_options
//     const payload = {
//         'notification': {
//           'title': `just logged an event`,
//           'body': `${req.body.message}`,
//         }, 
//       };

//       admin.messaging().sendToDevice(registrationToken, payload, options)
//       .then( response => {

//        res.status(200).send("Notification sent successfully")
       
//       })
//       .catch( error => {
//           console.log(error);
//       });

// })

conection.sync().then(
    app.listen(process.env.PORT || 3000, () => { 
        console.log('api rodando');
    })
).catch((err) => console.log(err));



