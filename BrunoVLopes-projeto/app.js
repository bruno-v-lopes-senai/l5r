// Módulos - Instalação comandos no terminal: > npm install express body-parser mysql
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Instância do express
const app = express();

// Conexão com MySQL
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306
});

// Acessa o BD l5r
sql.query("use l5r");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares - para carregar os arquivos CSS, JS, Imagens...
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

// Rota da página principal - http://localhost:8081/
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

// Rota da página cadastro - http://localhost:8081/cadastro
app.get('/cadastro', (req,res)=>{
    res.sendFile(__dirname + '/cadastro.html');
});

// Rota (POST) que recebe os dados enviados pelo formulário (Nome e Idade) e insere no BD
app.post('/cadastro', (req,res)=>{
    sql.query("insert into ficha values (?,?,?,?,?,?)",[ ,req.body.nome, req.body.familia, req.body.clan, req.body.escola, req.body.xp]);
    res.redirect('/cadastro');
});

// Rota que recebe a requisição sem ou com parâmetro e responde com os dados do BD (Todos os dados ou Id)
app.get('/select/:parametro?', (req,res)=>{
    if(!req.params.parametro){
        sql.query("select * from ficha order by id",(err, results, filds)=>{
            res.json(results);
    });
    }else {
        sql.query("select * from ficha where id = ?",[req.params.parametro],(err, results, filds)=>{
            res.json(results);
        });
    }
}); 

// Rota que recebe a requisição com parâmetro e responde com os dados do BD (Nome) 
app.get('/select/nome/:parametro?', (req,res)=>{
    sql.query("select * from ficha where nome = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

// Rota que recebe a requisição com parâmetro e responde com os dados do BD (Clan) 
app.get('/select/clan/:parametro?', (req,res)=>{
    sql.query("select * from ficha where clan = ?",[req.params.parametro],(err, results, filds)=>{
        res.json(results);
    });
    
});

// Rota que recebe a requisição com parâmetros e atualiza os dados do BD (Nome e/ou Idade) 
app.get('/update/:nome/:familia/:clan/:escola/:xp/:id', (req,res)=>{
    sql.query("update ficha set nome = ?, familia = ?, clan = ?, escola = ?, xp = ? where id = ?",[req.params.nome, req.params.familia, req.params.clan, req.params.escola, req.params.xp, req.params.id],(err, results, filds)=>{
        res.redirect('/cadastro');
    });
});

// Rota que recebe a requisição com parâmetro e apaga os dados do BD
app.get('/delete/:id',(req,res)=>{
    sql.query("delete from ficha where id = ?",[req.params.id],(err,results,filds)=>{
        res.redirect('/cadastro');
    })
});

// Rota da página sobre - http://localhost:8081/sobre
app.get('/sobre', (req,res)=>{
    res.sendFile(__dirname + '/sobre.html');
});

// Escuta a porta 8081 aguardando requisição
app.listen(8081, ()=>{
    console.log('Servidor rodando!');
});