const express=require('express')
const mongoose =require('mongoose')
const Model =require('./models/model')
const app=express()


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req, res)=>{
    res.send('Hello')
})
app.get('/blog',(req, res)=>{
    res.send('Hello players')
})

app.get('/player',async(req, res)=>{
    try{
        const models=await Model.find({});
        res.status(200).json(models);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
app.get('/player/:id',async(req, res)=>{
    try{
        const{id}=req.params
        const model=await Model.findById(id);
        res.status(200).json(model);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


app.post('/player', async(req, res)=>{
    try{
        const model=await Model.create(req.body)
        res.status(200).json(model)



    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/player/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const player = await Model.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!player){
            return res.status(404).json({message: `cannot find any player with ID ${id}`})
        }
        const updatedPlayer = await Product.findById(id);
        res.status(200).json(updatedPlayer);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete('/player/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const player = await Model.findByIdAndDelete(id);
        if(!player){
            return res.status(404).json({message: `cannot find any pplayer with ID ${id}`})
        }
        res.status(200).json(player);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//query 1 higest goal
app.get('/highest-goal-scorer', async (req, res) => {
    try {
        const highestScorer = await Model.findOne().sort('-goals').limit(1);
        res.status(200).json(highestScorer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//------------------
///-----Higest pass accurecy---

app.get('/highest-pass-accuracy', async (req, res) => {
    try {
        const highestPassAccuracyPlayer = await Model.findOne().sort('-passAccuracy').limit(1);
        res.status(200).json(highestPassAccuracyPlayer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//----------


///-------------Players from liver pool--------//
app.get('/players-from-liverpool', async (req, res) => {
    try {
        const liverpoolPlayers = await Model.find({ club: 'Liverpool' });
        res.status(200).json(liverpoolPlayers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

///------///
//---pass accurecy more than 85//
app.get('/players-with-high-pass-accuracy', async (req, res) => {
    try {
        const highPassAccuracyPlayers = await Model.find({ passacc: { $gt: 85 } });
        res.status(200).json(highPassAccuracyPlayers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//---//

mongoose.connect('mongodb+srv://admin:abcd123@cluster0.43z70kq.mongodb.net/players?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected')
    app.listen(4000, ()=>{
        console.log('Nod app is running port 4000')
    })
}).catch((err)=>{
    console.log(err)
})