var express = require('express');
var router = express.Router();
const Place = require('../models/placesSchema.js')



router.post('/places',function (req,res){
    const{nickname,name,latitude,longitude}=req.body //destructuring,ceux que le front me renvoie
    const newplace = new Place({
    nickname: nickname, 
    name: name, 
    latitude: latitude, 
    longitude: longitude

    })
    newplace.save().then((data)=>{
        console.log(data);
        res.status(200).json({
            result:true,data:data.name
        })
        .catch(error=>{
            console.error(error);
            res.status(500).json({error:error})
            
        })
    })
})

router.get('/places/:nickname',function(req,res){
    
    
    Place.find({nickname:{$regex : new RegExp(req.params.nickname,'i')}})
    .then(data=>{res.status(200).json({ result: true, places:data })})


    .catch(error=>{
        console.error(error);
        res.status(500).json({error:error})
        
    })


    })

    router.delete('/places', (req, res) => {
        Place.deleteOne({ nickname:{$regex : new RegExp(req.body.nickname, 'i')},name:{$regex: new RegExp( req.body.name ,'i')}})
        .then((data) => {

           //le premier parametre que l'ont met c pour la recherche nickname et le deuxieme c pour la suppresiion name

          //res.json({data})
          
          if(data.deletedCount>0){
            res.status(200).json({result:true})
                                     }
             else {
           res.status(200).json({result:false, info: 'user not found'})}
           }) 
           
           .catch(error=>{
            console.error(error);
            res.status(500).json({error:error})
            
        })

       });
    





//Cannot set headers after they are sent to the client(2res qui tourne )















module.exports = router;
