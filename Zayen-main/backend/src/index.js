import app from './server.js'

app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})

import connection from './database.js';

connection()00