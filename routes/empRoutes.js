const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const empModel=require('../model/empData')


function emproutes(nav){
    router.get('/',async(req,res)=>{
        try {
            const data=await empModel.find();
            res.render('home',{
                data,
                nav
            })
        } catch (error) {
            res.status(404).send('No data');
        }
    })
    router.get('/addemp',(req,res)=>{
        res.render('employeeform',{nav})
    })

    router.post('/addemp',async(req,res)=>{
        try {
            var item=req.body;
            const data=new empModel(item);
            await data.save();
            res.redirect('/emp')
        } catch (error) {
            res.status(404).send('Post unsuccessfull!')
        }
    
    })
    router.get('/update/:id',async(req,res)=>{
        const data=await empModel.findOne({"_id":req.params.id});
        res.render('updateform',{
            id:req.params.id,
            data,nav
    
        })
    })
    router.post('/edit/:id',async(req,res)=>{
        try {
            const id=req.params.id;
            await empModel.findByIdAndUpdate(id,req.body);
            res.redirect('/emp')
        } catch (error) {
            res.status(404).send('Update failed')
        }
    })
    router.get('/delete/:id',async(req,res)=>{
        try {
            const id=req.params.id;
            await empModel.findByIdAndDelete(id,req.body);
            res.redirect('/emp')
        } catch (error) {
            res.status(404).send('Delete failed!')
        }
    })
    return router
}
module.exports=emproutes