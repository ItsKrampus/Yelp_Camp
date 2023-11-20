const mongoose=require('mongoose');
const Campground=require('../models/campground');
const {places, descriptors}=require('./seedHelpers');
const cities=require('./cities');
const campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/YelpCamp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
})

const db= mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log('database connected')
})


const sample= array=>array[Math.floor(Math.random() * array.length)]

const seedDb= async()=>{
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000=Math.floor(Math.random()*1000);
        const camp=new campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
}

seedDb().then(()=>{
    mongoose.connection.close()
})