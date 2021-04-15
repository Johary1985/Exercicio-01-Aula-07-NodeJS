const colors = require('colors');
const express = require ('express')
const { Sequelize, DataTypes } = require ('sequelize');
const task = require('./models/task');
const Tareas_Node = require ('./models/task')
const app = express ();

//Metodo 01 do site Sequelize para BD SQlite
const sequelize = new Sequelize ({ dialect: 'sqlite', storage:'./task-list.db'});
const tasks = Tareas_Node ( sequelize, DataTypes)

//Parse JSON para tratar as REQUEST
app.use(express.json()) 

//Metodo POST Para gerar dados:
app.post('/tasks', async (req, res) =>{
    const nueva_tarea = await tasks.create({
        description: req.body.description,
        done: req.body.done
    })
    res.json({ nueva_tarea })
})

//Metodo PUT para atualizar uma tarefa
app.put('/tasks/:id', async (req, res) =>{
    const tarea_ID = req.params.id
    const body = req.body
    const tarea = await tasks.findByPk(tarea_ID)
    tarea.update({description: body.description, done: body.done});        
    res.send('Actualizado com Sucesso!!!')
})


//Metodo GET .findByPK 
app.get('/tasks/:id', async (req, res) =>{
  const tarea_ID = req.params.id 
  const tarea = await tasks.findByPk(tarea_ID)
  res.json({ tarea })
})

//Metodo GET .findAll
app.get('/tasks', async (req, res) =>{    
    const tareas = await tasks.findAll()
    res.json ({ tareas })
})

//Metodo DELETE para apagar tarefas
app.delete('/tasks/:id', async (req, res) => {
    try{const ID = req.params.id
        const borrar = await tasks.destroy({ where: { ID: ID } })
        res.send({ action: 'Borrar Tarea', borrar: borrar })} 
    catch (error) {
        return res.send('Id borrado:')
    }
})

app.listen (3000, () => {
    console.log('Porta 3000 ONLINE'.bgGreen .black)
})