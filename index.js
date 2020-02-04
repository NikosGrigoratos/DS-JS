const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const expbs = require('express-handlebars');

app.engine('handlebars', expbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/cpappform', (req, res) => {
    res.render('cpappform');
})

app.get('/stappform', (req, res) => {
    res.render('stappform');
})

app.get('/studentjobsearch', (req, res) => {
    res.render('studentjobsearch');
})

app.get('/addition', (req, res) => {
    res.render('addition');
})

app.post('/stapp', (req, res) => {
    var xhr = new XMLHttpRequest();
    var stapp = {student:req.body.it, semester:req.body.semester, nonPassedLessons:req.body.npl};
    console.log(JSON.stringify(stapp));

    var url = 'http://localhost:8080/spring-hb/studentapp/addstapp';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(stapp);
    xhr.send(data);
    res.redirect('/addition')

});

app.post('/cpapp', (req, res) => {
    var xhr = new XMLHttpRequest();
    var cpapp = {company:req.body.company, positionField:req.body.field, position:req.body.position};
    console.log(JSON.stringify(cpapp));
    
    var url = 'http://localhost:8080/spring-hb/companyapp/addcpapp';
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
        }
    };
    var data = JSON.stringify(cpapp);
    xhr.send(data);
    res.redirect('/addition')
});

app.post('/results', (req, res) => {
    var xhr = new XMLHttpRequest();
    var st = req.body.it;

    var url = 'http://localhost:8080/spring-hb/assignedjobs/getjob/'+st;
    console.log(url)

    xhr.open("GET", url, true);
    xhr.send('');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status === 200){
                var json = JSON.parse(xhr.responseText);
                console.log(json);
                res.render('searchresult', json)
            }else{
                res.send("No job found!")
            }
            

        }
    };
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
