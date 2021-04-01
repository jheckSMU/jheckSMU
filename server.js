const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Connect to MySQL
var mysql = require('mysql');
//Connect to MySQL
var con = mysql.createConnection({
    host: "mysqldockerexample_mysql_1",
    port: "3306",
    user: "exampleuser",
    password: "password",
    database: "classicmodels"
});

//Open Connection
con.connect(function(err) {
    if (err) throw err;
});

// create router
var router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});
// REGISTER  ROUTES
app.use('/api', router);

//GET// 
//api/get/products
router.get('/get/products', function (req, res) {
    con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));// Result in JSON format
    });
});

//api/get/product/{productCode}
router.get('/get/product/:productCode', function (req, res) {
    var inputParam = req.params.productCode;
    con.query(`SELECT * FROM products where productCode=${inputParam}`, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));// Result in JSON format
    });
});

//api/get/offices
router.get('/get/offices', function (req, res) {
    con.query("SELECT * FROM offices", function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));// Result in JSON format
    });
});

//api/get/office/{officeCode}
router.get('/get/office/:officeCode', function (req, res) {
    var inputParam = req.params.officeCode;
    con.query(`SELECT * FROM offices where officeCode=${inputParam}`, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));// Result in JSON format
    });
});

//api/get/office/{officeCode}
router.get('/get/office/:officeCode', function (req, res) {
    var inputParam = req.params.officeCode;
    con.query(`SELECT * FROM offices where officeCode=${inputParam}`, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));// Result in JSON format
    });
});

// POST// /api/products
router.post('/products', async (req, res) => {
    var productCode = req.body.productCode;
    var productName = req.body.productName;
    var productLine = req.body.productLine;
    var productScale = req.body.productScale;
    var productVendor = req.body.productVendor;
    var productDescription = req.body.productDescription;
    var quantityInStock = req.body.quantityInStock;
    var buyPrice = req.body.buyPrice;
    var MSRP = req.body.MSRP;

    con.query(`INSERT INTO products (productCode,productName,productLine,productScale,productVendor,productDescription,quantityInStock,buyPrice,MSRP) 
    VALUES ("${productCode}","${productName}","${productLine}","${productScale}","${productVendor}","${productDescription}",${quantityInStock},${buyPrice},${MSRP})`,
    function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
    });
});

// POST// /api/products
router.post('/offices', async (req, res) => {
    var officeCode = req.body.officeCode;
    var city = req.body.city;
    var phone = req.body.phone;
    var addressLine1 = req.body.addressLine1;
    var addressLine2 = req.body.addressLine2;
    var state = req.body.state;
    var country = req.body.country;
    var postalCode = req.body.postalCode;
    var territory = req.body.territory;

    con.query(`INSERT INTO offices (officeCode,city,phone,addressLine1,addressLine2,state,country,postalCode,territory) 
    VALUES ("${officeCode}","${city}","${phone}","${addressLine1}","${addressLine2}","${state}","${country}","${postalCode}","${territory}")`,
    function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format
    });
});

// /api/product/{productCode}
router.put('/product/:productCode', async (req, res) => {
    var inputParam = req.params.productCode;
    var buyPrice = req.body.buyPrice;

    con.query(`UPDATE products SET buyPrice="${buyPrice}" WHERE productCode="${inputParam}"`, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format 
    });
});

// /api/office/{officeCode}
router.put('/office/:officeCode', async (req, res) => {
    var inputParam = req.params.officeCode;
    var territory = req.body.territory;

    con.query(`UPDATE offices SET territory="${territory}" WHERE officeCode=${inputParam}`, function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result)); // Result in JSON format 
    });
});

// DELETE// /api/product/{productCode}
router.delete('/product/:productCode', async (req, res) => {
    var productCode = req.params.productCode;
    con.query(`DELETE FROM products WHERE productCode="${productCode}"`,function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

// DELETE// /api/office/{officeCode}
router.delete('/office/:officeCode', async (req, res) => {
    var officeCode = req.params.officeCode;
    con.query(`DELETE FROM offices WHERE officeCode=${officeCode}`,function (err, result, fields) {
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));