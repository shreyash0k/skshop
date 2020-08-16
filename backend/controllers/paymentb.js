var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey"
});

exports.getToken = (req,res) =>{

  gateway.clientToken.generate({}, function (err, response) {
    if(err){
      res.status(500).json({
        "error":err.message
      })
    }else{
      res.json(response)
    }
  });

}

exports.processPayment = (req,res) =>{
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amount = req.body.amount
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if(err){
      res.status(500).json({
        "error":err.message
      })
    }else{
      res.json(result)
    }
  });
}
