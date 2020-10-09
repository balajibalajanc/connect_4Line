const path= require('path');
const express=require('express');
const hbs=require('hbs');
const { request } = require('http');

const public_dir_path=path.join(__dirname,'../public');
const view_dir_path=path.join(__dirname,'../Templates/views');
const partials_path=path.join(__dirname,'../Templates/partials');

console.log( view_dir_path);
const port=process.env.PORT || 3000
const app=express()
app.set('view engine','hbs');
app.set('views',view_dir_path);
hbs.registerPartials(partials_path);

app.use(express.static(public_dir_path))
app.get('/',(req,res)=>
{
    res.render('index',{
        title:'Hi successfully done Dyamic implementation'
    });
})

app.get('/about',(req,res)=>
{
res.render('about',{title :'FAQ',desc:' balaji &  co'});
})


app.listen(port,()=>{   
    console.log("server is up and running in the port: "+port);
});
