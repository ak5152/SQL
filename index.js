const { faker } = require('@faker-js/faker');
const mysql=require('mysql2');
const path=require("path");
let express=require("express");
let app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'ashuvns2004@',
  });
  //inserting new data//
  
let  getRandomUser=()=> {
    return [
      faker.string.uuid(),
      faker.internet.userName(),
       faker.internet.email(),
      
       faker.internet.password(),
      
    ];
  };

//   let q="insert into user(id,username,email,password) values ?";
//   let data=[];
//   for(let i=0;i<=100;i++){
//    data.push(getRandomUser());  //100 fake users ka information//
//   }
 
//  try{ connection.query(q,[data],(err,result)=>{
//      if(err) throw err;
//      console.log(result);
//      console.log(result.length);
//      console.log(result[0]);
//      console.log(result[1]);
//     });
//  }  catch(err){
//      console.log(err);
//  }
//   connection.end(); 

//get route//
  
  app.get("/",(req,res)=>{
    let q="select count(*) from user";
    try{ connection.query(q,(err,result)=>{
              if(err) throw err;
             let count=result[0]["count(*)"];
             res.render("home.ejs",{count});
             });
          }  catch(err){
              console.log(err);
              res.send("some error in db");
        }
  
  });
  //show route//
  app.get("/user",(req,res)=>{
    let q=`select *from user`;
    try{ connection.query(q,(err,users)=>{
      if(err) throw err;
     
     res.render("showusers",{users});
     });
  }  catch(err){
      console.log(err);
      res.send("some error in db");
}  
  });

  //edit route//
  app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select *from user where id='${id}'`;
    try{ connection.query(q,(err,result)=>{
      if(err) throw err;
     let user=result[0];
    res.render("edit.ejs",{user});
     });
  }  catch(err){
      console.log(err);
      res.send("some error in db");
}  
  });

  app.listen("8080",()=>{
    console.log("server is listening port");
  })




 