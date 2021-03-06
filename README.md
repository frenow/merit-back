# Merit Coin: Projetos Integrados de Aplicações (PIA) 
# Pós-Graduação Desenvolvimento Web Full Stack - Puc Minas
# Backend

![enter image description here](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png)
- Desenvolvido em nodejs + express
![enter image description here](https://miro.medium.com/max/3600/1*fIjRtO5P8zc3pjs0E5hYkw.png)
- Deploy e publicação HEROKU: https://merit-back.herokuapp.com/

![enter image description here](https://firebase.google.com/images/brand-guidelines/logo-built_white.png?hl=pt)
- Integração com a SDK Google Firebase para gerenciamento de notificações cloud-messaging;
- Firebase Realtime Database para armazenamento e sincronismo de dados
- Firebase authentication
- Firebase push notification para envio de notificacao no browser

# SWAGGER DOC http://localhost:3001/api-docs/

# Exemplos da API
- Consulta Histórico de movimentações geral

**GET** localhost:3001/api/history
- Consulta Histórico de movimentações por usuário

**GET** localhost:3001/api/history/66lgpcqVGwWObnzd4UX9Xx1r4uL2
- Consulta saldo do usuário

**GET** localhost:3001/api/balance/66lgpcqVGwWObnzd4UX9Xx1r4uL2
- Grava resgate mensal de credito

**POST** localhost:3001/api/reward
body: 
{
	"id": "66lgpcqVGwWObnzd4UX9Xx1r4uL2",
	"email": "frenow@gmail.com",
	"token": "cq1f4-_QAXlNyfa3wCTNVf:APA91bFL4R5o5bt7-9Zw5CZt0JqhunhtsdXv7o3Hx3Tc_hDUy89OH5osJ8myTIJiC30ym0XLYMKrwv8-tJvndAPCLU7kKSEKskMUq5e4bbBjazVfwSQrHMZjSvgTRN4mlZXkZ84Ox6iD",
	"value": 50
}
- Grava dados do usuario apos o login

**POST** localhost:3001/api/signin
body: 
{
	"id": "66lgpcqVGwWObnzd4UX9Xx1r4uL2",
	"email": "frenow@gmail.com",
	"token": "cq1f4-_QAXlNyfa3wCTNVf:APA91bFL4R5o5bt7-9Zw5CZt0JqhunhtsdXv7o3Hx3Tc_hDUy89OH5osJ8myTIJiC30ym0XLYMKrwv8-tJvndAPCLU7kKSEKskMUq5e4bbBjazVfwSQrHMZjSvgTRN4mlZXkZ84Ox6iD"
}
- Efetua deposito de um usuario para outro

**POST** localhost:3001/api/deposit
body: 
{
	"id_origin": "66lgpcqVGwWObnzd4UX9Xx1r4uL2",
	"id_destination": "NrKoogJHBJQyGCWKNQQ1grdSayk1",
	"email": "frenow@gmail.com",
	"token": "cq1f4-_QAXlNyfa3wCTNVf:APA91bFL4R5o5bt7-9Zw5CZt0JqhunhtsdXv7o3Hx3Tc_hDUy89OH5osJ8myTIJiC30ym0XLYMKrwv8-tJvndAPCLU7kKSEKskMUq5e4bbBjazVfwSQrHMZjSvgTRN4mlZXkZ84Ox6iD",
	"value": 5000
}
- Efetua resgate de produtos

**POST** localhost:3001/api/product_reward
body: 
{
	"id": "66lgpcqVGwWObnzd4UX9Xx1r4uL2",
	"email": "frenow@gmail.com",
	"token": "cq1f4-_QAXlNyfa3wCTNVf:APA91bFL4R5o5bt7-9Zw5CZt0JqhunhtsdXv7o3Hx3Tc_hDUy89OH5osJ8myTIJiC30ym0XLYMKrwv8-tJvndAPCLU7kKSEKskMUq5e4bbBjazVfwSQrHMZjSvgTRN4mlZXkZ84Ox6iD",
	"value": 5000
}



