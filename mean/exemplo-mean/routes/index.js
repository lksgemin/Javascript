var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var contatoSchema = new Schema({
	nome: { type: String, required: true },
	telefone: { type: String, required: true }
});

var Contato = mongoose.model('contato', contatoSchema);
var conexoes = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.adicionaContato = function(req, res) {
	var contato = new Contato(req.body);
	contato.save(function(error, contato) {
		if(error) res.send(500);

		res.send(201);
	});
}

router.listaContatos = function(req, res) {
	Contato.find({}, function(error, contatos) {
		if(error) res.send(500);

		res.json({ contatos: contatos });
	});
}

module.exports = router;
