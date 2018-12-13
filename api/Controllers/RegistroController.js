var express = require('express');
var router = express.Router();
var model = require('../Models/index');

router.get('/', function (req, res, next) {
    console.log("------------------------------");
    console.log("/");
    model.registro.findAll().then(registros => 
        {
            if (registros.length == 0) {
                console.log("404");
                res.status(404).json(registros)
            }
            else{
                console.log("200");
                res.status(200).json(registros)
            }
        }
    ).catch(error => res.status(400).json({
        error: true,
        data: [],
        error: error
   }));
});

router.get('/:id', function (req, res, next) {
    console.log("------------------------------");
    console.log("/:id");
    model.registro.findOne({
        where: {
            id: req.params.id
        },
    })
        .then(registros => 
        {
            if (registros != null) {
                console.log("200");
                res.status(200).json(registros)    
            }
            else{
                console.log("404");
                res.status(404).json(registros)
            }
        }
        )   
        .catch(error => res.status(400).json({
            error: true,
            data: [],
            error: error
        }));
});

router.post('/', function (req, res, next) {
    console.log("------------------------------");
    console.log("/");
    var fecha = new Date();
    if(req.body.becons == null || req.body.estado == null || req.body.userId == null){
        res.status(400).json({
            error: true,
            data: [],
            error: "Faltan datos"
        });
    }else{
        model.registro.create({
            becons: req.body.becons,
            estado: req.body.estado,
            hora: fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(),
            fecha: fecha.getFullYear() + "-" + (fecha.getMonth()+1) + "-" + fecha.getDate(),
            userId: req.body.userId
        })
        .then(registro => res.status(201).json(registro))
        .catch(error => res.status(400).json({
            error: true,
            data: [],
            error: error
        }));
    }
});

router.put('/:id', function (req, res, next) {
    console.log("------------------------------");
    if(req.body.id_android == null || req.body.nombre == null){
        res.status(400).json({
            error: true,
            data: [],
            error: "Faltan datos"
        });
    }else{
        model.registro.update({
            id_android: req.body.id_android,
            nombre: req.body.nombre
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(registro => res.status(201).json({
                "id": null,
                "id_android": "update",
                "nombre": "update",
                "createdAt": null,
                "updatedAt": null
            }))
        .catch(error => res.status(400).json({
            error: true,
            error: error
        }));
    }
});

router.delete('/:id', function (req, res, next) {
    console.log("------------------------------");
    model.registro.destroy({ where: {
        id: req.params.id
    }})
        .then(status => res.status(201).json({
                "id": null,
                "id_android": "delete",
                "nombre": "delete",
                "createdAt": null,
                "updatedAt": null
            }))
        .catch(error => res.status(400).json({
            error: true,
            error: error
        }));
});

module.exports = router;