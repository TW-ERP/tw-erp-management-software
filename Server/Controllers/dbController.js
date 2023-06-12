const db = require('../Models/testModels.js');

const dbController = {}

dbController.getInfo = async (req, res, next) => {
  console.log('in get info method of db controller')
  const { itemName, quantity } = req.body; //destructure data

  //test datatypes and content
  if(typeof itemName !== 'string' || typeof quantity !== 'number') {
    return next({
      log: 'Data received in dbController.getInfo does not meet required data types',
      message: { err: 'itemName and/or quantity are incorrect data types' }
    })
  }

  //check data is correct type
  console.log('test', req.body)
  const query =
    `select product.product_name,
    bom.bom_name,
    bom_assembly.assembly_quantity,
    sub_assembly.assembly_name,
    sub_assembly_part.part_id,
    sub_assembly_part.part_quantity,
    part.part_name,
    part.part_cost,
    shipping_company.shipping_company_name,
    shipping_company.ship_time
    from product
    inner join bill_of_material bom
    on product.bom_id = bom.bom_id and product.product_name = '${itemName}'
    inner join bill_of_material_sub_assembly bom_assembly
    on bom.bom_id = bom_assembly.bom_id
    inner join sub_assembly
    on bom_assembly.assembly_id = sub_assembly.assembly_id
    inner join sub_assembly_part
    on sub_assembly.assembly_id = sub_assembly_part.assembly_id
    inner join part
    on sub_assembly_part.part_id = part.part_id
    inner join shipping_company
    on part.shipping_id = shipping_company.shipping_company_id`

  //query database -> get Shuai Table
  const productInfo = await db.query(query)
    .then(data => data.rows)
    .catch(err => next({
      log: 'Error occurred getting information in database from dbController.getInfo',
      message: { err: `${err}` }
    }))

  if(productInfo.length === 0) {
    return next({
      log: 'No data exists',
      message: { err: 'no data for itemName exists in database' }
    })
  }

  //generate item cost by multiplying assembly quantity, parts quantity and cost
  const itemCost = productInfo.reduce((acc, cur) => {
    acc = acc + (cur.part_cost * cur.part_quantity * cur.assembly_quantity);
    return acc;
  }, 0);

  //generate total cost by multiply item cost and order quantity
  const totalCost = itemCost * quantity;

  //determine longest ship time
  const shipTime = productInfo.reduce((acc, cur) => {
    acc = cur.ship_time > acc ? cur.ship_time : acc;
    return acc;
  }, 0);

  console.log('Woo math!', `$${totalCost}`);
  console.log('Woo ship time!', `${shipTime} days`);

  //calculate selling price
  const markUp = 1.5;
  const price = (totalCost * markUp);

  console.log('Woo charge em!', `$${price}`);

  res.locals.priceTag = {
    cost: totalCost,
    shipTime: shipTime,
    price: price
  }

  return next()
}

module.exports = dbController;