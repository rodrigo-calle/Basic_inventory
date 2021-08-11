const express = require('express');
const app = express();
const port = 3000;

//ROUTES
const routes = require('./routes/routes');
//const routeProducts = require('./routes/products');
//END ROUTES
//views
app.set('view engine', 'ejs');
app.use(express.static("public"));//this is for styles
//end views



//Routes pages
routes.productsPage(app);
routes.addProductPage(app);

//Category pages
routes.categoryPage(app);

//Generics pages
routes.indexPage(app);




app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

 

