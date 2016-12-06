var express = require('express');
var router = express.Router();
var orders = require('../orders.json')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(orders.slice(req.query.start, req.query.end));
});
router.get('/search', function (req, res, next) {


    var start = req.query.start || 0;
    var end = req.query.end || 100;
    var status = req.query.status || '';
    var search = req.query.searchString ? new RegExp(req.query.searchString.split(' ').join(' '), "i") : '';
    var arr = orders;

    if (search) {
        arr = orders.filter(function (obj) {
            if (search && (search.test(obj.orderId) || search.test(obj.customer.name) || search.test(obj.customer.address))) {
                return obj;
            }
        });
    }

    if (status != 'undefined' && status != '') {
        var temp = arr.filter(function (obj) {
            if (status == obj.state) {
                return obj;
            }
        })
        arr = temp;
    }

    res.send(arr.slice(start, end));


});

router.post('/updateStatus',function(req,res){
    res.status('200').send({message: 'Order Id '+ req.body.orderId + ' Updated Successfully to ' + req.body.state + ' state' })
})


module.exports = router;
