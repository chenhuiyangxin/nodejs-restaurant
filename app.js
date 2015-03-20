var express = require('express');
var app = express();
var db = require("./connect").db;
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());


//主页面
app.get('/main', function(req, res){
    var menus = db.select().table('menu').exec(function(){
        menus = menus._settledValue;
        res.render("main", {
            menus:menus
        });
    });
});

//提交菜单
app.post("/ajax/addOrder",function(req,res){
    var telephone = req.body.telephone;
    var definition = req.body.menus;
    var total = req.body.total;
    db("order")
        .insert({
            telephone:telephone,
            addTime: new Date,
            definition: definition,
            total:total,
            status:1
        })
        .exec(function(){
            res.send(200, "已经成功插入数据");
        });


});



app.listen(3000);
console.log("server started at http://localhost:3000");
