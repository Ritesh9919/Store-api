const Product = require('../models/product');
const { options } = require('../routes/product');

module.exports.getAllProducts = async(req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObjet = {};
    if(featured) {
       queryObjet.featured = featured === 'true'? true:false;
    }

    if(company) {
        queryObjet.company = company;
    }

    if(name) {
        queryObjet.name = { $regex: name, $options:'i' }
    }

    if(numericFilters) {
        console.log(numericFilters);
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          };
          const regEx = /\b(<|>|>=|=|<|<=)\b/g;
          let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
          );
          const options = ['price', 'rating'];
          filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)) {
                queryObjet[field] = {[operator]:value}
            }
          })
    }

    let result = Product.find(queryObjet);
    if(sort) {
        let sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result.sort('createdAt');
    }


    //select
    if(fields) {
        let fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    
    const products = await result;
    return res.status(200).json({msg:products, nbhits:products.length});
}




