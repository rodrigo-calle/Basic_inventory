const express = require('express');
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');// instalar: npm install body-parser

const pool = require('../database').pool;

//Parsear el body usando body parser
app.use(bodyParser.json()); // body en formato json
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //body formulario


let indexPage = (app)=>{
    app.get('/', (req, res)=>{
        console.log("Página Inicio");
        res.render('../public/views/pages/home.ejs');
        //res.end();
    })
};

//Products Routes

let productsPage = (app)=>{
    app.get('/products', async (req, res)=>{
        const link = '../public/views/products/product.ejs';
        console.log('Products page');    
        const products = await pool.query('SELECT * FROM products');
        res.render(link, {products: products});       
    });
}

let addProductPage = (app)=>{
    app.get('/products/add', urlencodedParser, async(req, res)=>{
        //const { id } = req.params;
        let option = await pool.query('SELECT * FROM category');           
        let h = JSON.parse(JSON.stringify(option));
        res.render('../public/views/products/add.ejs', { h: h })//, { result: result });
        console.log(h[0].id)
        
    })

    app.post('/products/add', urlencodedParser, async (req, res)=>{
        let name = req.body.name;
        let description = req.body.description;
        let category_id = req.body.category_id;       
    
        const newProduct = {
            name,
            description,
            category_id
        }
        try{
            await pool.query('INSERT INTO products set ?', [newProduct])
            res.redirect('/products');
            console.log('Registro exitoso');       
        }catch(e){
            console.error('Error al registrar producto'+e);
            res.redirect('/products/add');
        }
    });

    app.get('/products/edit/:id', async (req, res)=>{
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = ? ', [id])

        //console.log(product[0])
        let option = await pool.query('SELECT * FROM category');           
        let h = JSON.parse(JSON.stringify(option));
        //res.render('../public/views/products/add.ejs', { h: h })//, { result: result });
        console.log(h.id)
        //----
        res.render('../public/views/products/edit.ejs', { product: product[0], h: h});
    });


    app.post('/products/edit/:id', urlencodedParser, async (req, res)=>{
       const { id }  = req.params;
       const { name, description, category_id } = req.body;
       const editedProduct = {
           name, 
           description,
           category_id
           
       }
       await pool.query('UPDATE products set ? WHERE id = ?', [editedProduct, id]);
        res.redirect('/products');

    });

    app.get('/products/delete/:id',  async (req, res)=>{
        //console.log(req.params.id)
        //res.send('Eliminado');
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE ID = ?', [id]);
        res.redirect('/products')
    });
}



//Category Routes
let categoryPage = (app)=>{
    app.get('/category', async (req, res)=>{
       console.log('Category page');
       const link ='../public/views/categories/category.ejs'; 
       const categories = await pool.query('SELECT * FROM category');        
       res.render(link, { categories: categories });
       console.log(categories)   
    });

    app.get('/category/add', (req, res)=>{
        res.render('../public/views/categories/add.ejs');
    });


    app.post('/category/add', urlencodedParser, async (req, res)=>{
        let name = req.body.name;
        let description = req.body.description;
        
        const newCategory = {
            name, 
            description
        } 
        try{
            await pool.query('INSERT INTO category set ?', [newCategory]);
            console.log('Registro de categoria exitoso');
             res.redirect('/category');
        }catch(e){
            console.log('Error en el registro de categoria: '+ e);
        }     
    })

    app.get('/category/edit/:id', async (req, res)=>{
       
        const { id } = req.params;
        const category = await pool.query('SELECT * FROM category WHERE id = ? ', [id])
        console.log(category[0]);
        res.render('../public/views/categories/edit.ejs', { category: category[0]});        
    });


    app.post('/category/edit/:id', urlencodedParser,  async (req, res)=>{
        const { id } = req.params;
        const { name, description } = req.body;
        const editedCategory = {
            name,
            description
        }
        await pool.query('UPDATE category SET ? WHERE id = ?', [editedCategory, id])
        res.redirect('/category');
    });

    app.get('/category/delete/:id', async(req, res)=>{
        const { id } = req.params;
        await pool.query('DELETE FROM category WHERE ID = ?', [id]);
        res.redirect('/category');
    });          
}



module.exports = {
    productsPage,
    addProductPage,

    categoryPage, 
    indexPage, 
}