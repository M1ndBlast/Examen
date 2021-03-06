const express = require('express'),
    router = express.Router(),
    Cryptos = require('../modules/Cryptos'),
    crud = require('../modules/crud')


router.get('/', (req, res, next) =>
{
  res.render('index', { title: 'Express' })
})

router.post('/encriptando', (req, res) =>
{
    let usu = req.body.user,
        pass = req.body.pass,
        msg = req.body.text,
        nTipo = req.body.tipo,
        tipo = req.body.tipo == 0 ? Cryptos.algorthim.AES128 : req.body.tipo == 1 ? Cryptos.algorthim.AES192 : Cryptos.algorthim.AES256

    var msgCry = Cryptos.crypt(msg, pass, tipo)
    console.log('Las contraseñas son:')
    console.log(msg)
    console.log(msgCry)

    crud.registrar(usu, pass, msgCry, nTipo, () => { res.redirect('/') })
})
router.get('/desencriptando', (req, res) =>
{
    let usu = req.body.user,
        pass = req.body.pass,
        msg = req.body.text,
        nTipo = req.body.tipo,
        tipo = req.body.tipo == 0 ? Cryptos.algorthim.AES128 : req.body.tipo == 1 ? Cryptos.algorthim.AES192 : Cryptos.algorthim.AES256
        console.log('llego aqui xD')

    crud.consultar((results) =>
    {
        console.log('imprimiendo result de col 0 en callback')
        console.log(results)
        for (var i = 0; i < results.length; i++)
        {
            results[i].cue_rep = Cryptos.decrypt(results[i].cue_rep,'oli',Cryptos.algorthim.AES128)
        }
        console.log(results)
    })

})

router.get('/message', (req, res) =>
{
    res.render('message')
})

router.get('/reports', (req, res) =>
{
    res.render('reports')
})

module.exports = router

function encriptar()
{

}
