# README

### aplicação de validação de CPF/CNPJ

Backend API rest com rails
Frontend SPA com react.js
Banco de dados Postgresql

Faça clone da aplicação com ```git@github.com:marisnner7/neoway.git```
Em seguida instale rode ``` bundle```
Pode ser necassário rodar migrations ```rails db:migrate```
Popule o banco de dados com dados de teste ```rails db:seed```
Abra o servidor backend com ```rails s```
servidor pode ser acessado em ```http://localhost:3001/api/v1``` no seu browser favorito. 
Testes de backend podem ser rodados com 
```
rspec spec
```
Gems utilizadas: shoulda matchers, rack-cors, faker, cpf_cnpj. 

Aplicação frontend com react não finalizada. 
Navege até a pasta do frontend com ```cd crud-users```
Inicie com ```yarn start```