const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const MongoURI = "mongodb+srv://theneoalpha:VikashKaushik@cluster0.fxhrtlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// Connect to MongoDB
mongoose.connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/users', require('./routes/user'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
