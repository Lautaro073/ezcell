const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: 'TEST-6229067183884225-080917-6a286f43b742af0e5267783a37a15c8d-1128342054'
});
/*mercadopago.configure({
  access_token: 'APP_USR-6229067183884225-080917-d5744e088841b5a2de969ce102b274c6-1128342054'
});*/
router.post('/', (req, res) => {
    let preference = {
      items: [
        {
          title: req.body.title,
          quantity: req.body.quantity,
          currency_id: 'ARS',
          unit_price: req.body.price
        }
      ],
      back_urls: {
        success: 'http://ezecell.store/checkout',
        failure: 'http://ezecell.store/checkout/error',
        pending: 'http://ezecell.store/checkout/pendiente',
      },
      auto_return: 'approved',
    };
  
  
    mercadopago.preferences.create(preference)
      .then(response => {
        res.send(response.body.init_point);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('Error al crear la preferencia');
      });
  });
  module.exports = router;