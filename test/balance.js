process.env.NODE_ENV = 'test';
 
 
//Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../app');

chai.use(chaiHttp);
 
//Aqui é o bloco principal que executará o nossos testes:
describe('Balance', function() {

    /**
     * Teste da rota: /GET
    */
    describe('/GET balance', function() {
    it('Deve retornar o saldo', function(done) {
        chai.request(server)
        .get('/api/balance/66lgpcqVGwWObnzd4UX9Xx1r4uL2')
        .end(function(error, res) {
            //Se tudo der certo deve retornar o status: 200 - OK
            res.should.have.status(200);
            //E em seguida retornar em um array:
            res.should.be.json;
            res.body.should.be.a('object');
            //res.body.should.be.a('array');
            //res.body.length.should.be.eql(0);
        done();
        });
    });
    });
});