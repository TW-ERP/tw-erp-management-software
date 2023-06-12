const db = require('../Models/testModels');
const testController = {};

/* Query for fetching cost and shipment info */
// select bom.bom_name,
// bom_assembly.assembly_quantity,
// sub_assembly.assembly_name,
// sub_assembly_part.part_id,
// sub_assembly_part.part_quantity,
// part.part_name,
// part.part_cost,
// shipping_company.shipping_company_name,
// shipping_company.ship_time
// from bill_of_material bom
// inner join bill_of_material_sub_assembly bom_assembly
// on bom.bom_id = bom_assembly.bom_id
// inner join sub_assembly
// on bom_assembly.assembly_id = sub_assembly.assembly_id
// inner join sub_assembly_part
// on sub_assembly.assembly_id = sub_assembly_part.assembly_id
// inner join part
// on sub_assembly_part.part_id = part.part_id
// inner join shipping_company
// on part.shipping_id = shipping_company.shipping_company_id

testController.getItem = async (req, res, next) => {
  try {
    const query = "SELECT password from user_info where user_name = 'Michael';";

    db.query(query, (err, results) => {
      if (err) {
        next(err);
      }
      //   console.log(results.rows);
      res.locals.people = results.rows;
      return next();
    });
  } catch (err) {
    return next({
      log: 'An error occurred in the testController.js file. Get request failed.',
      message: { err: err },
    });
  }
};

module.exports = testController;
