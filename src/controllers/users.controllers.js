import connection from "../database";
import bcryptjs from 'bcryptjs'

function porcessDBError(err){
  return {
    error: true,
    code: err.code,
    message: err.message
  }
}

export async function addUser(req,res){
  const { fullname, email } = req.body
  const salt = await bcryptjs.genSalt(10)
  const password = await bcryptjs.hash(req.body.password,salt)

  const query = connection.query(`insert into users (fullname, email, password) values ('${fullname}','${email}','${password}')`,function(err,result) {
    if (err) 
      res.status(400).send(porcessDBError(err));
    else 
      res.status(200).send({"error": false, "message": "User added succesfully"})
  })
}

export async function deleteUser(req,res){
  const id = req.params.id

  connection.query(`delete from users where id = ${id}`,function(err,result){
    if (err) 
      res.status(400).send(porcessDBError(err));
    else{
      if(result.affectedRows === 0)
        res.status(203).send({"error": true, "message": "User not found"})
      else
        res.status(203).send({"error": false, "message": "User delete successfully"})
    } 
    
  })
}

export async function getUser(req,res){
  const query = connection.query(`select id, fullname, email, created_at, updated_at from users where id = ${req.params.id}`, function(err, result) {
    if (err) 
      res.status(400).send(porcessDBError(err));
    else 
      res.status(200).send(result)
  })
}

export async function getUsers(req,res){
  const query = connection.query("select id, fullname, email, created_at, updated_at from users", function(err, result) {
    if (err) 
      res.status(400).send(porcessDBError(err));
    else 
      res.status(200).send(result)
  })
}

export async function updateUser(req,res){
  const id = req.params.id
  
  const { fullname, email } = req.body
  const salt = await bcryptjs.genSalt(10)
  const password = await bcryptjs.hash(req.body.password,salt)

  connection.query(`update users set fullname = '${fullname}', email = '${email}', password = '${password}', updated_at=CURRENT_TIMESTAMP where id = ${id}`,function(err,result){
    if (err) 
      res.status(400).send(porcessDBError(err));
    else{
      if(result.affectedRows === 0)
        res.status(203).send({"error": true, "message": "User not found"})
      else
        res.status(203).send({"error": false, "message": "User modified successfully"})
    } 
    
  })

}