CREATE TABLE bill_of_material (
	bom_id int GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (bom_id),
	bom_name text NOT NULL
);

CREATE TABLE shipping_company (
	shipping_company_id int GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (shipping_company_id),
	shipping_company_name text NOT NULL,
	ship_time int NOT NULL
);

CREATE TABLE product (
	product_id INT GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (product_id) ,
	product_name text NOT NULL,
	bom_id int NOT NULL,
	FOREIGN KEY (bom_id) REFERENCES bill_of_material(bom_id)
);

CREATE TABLE sub_assembly (
	assembly_id int GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (assembly_id),
	assembly_name text NOT NULL
);

CREATE TABLE bill_of_material_sub_assembly (
	_id int GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (_id),
	bom_id int NOT NULL,
	FOREIGN KEY (bom_id) REFERENCES bill_of_material(bom_id),
	assembly_id int NOT NULL,
	FOREIGN KEY (assembly_id) REFERENCES sub_assembly(assembly_id),
	assembly_quantity int NOT NULL
);

CREATE TABLE part (
	part_id int GENERATED ALWAYS AS IDENTITY, 
	PRIMARY KEY (part_id),
	part_name text NOT NULL,
	part_cost int NOT NULL,
	shipping_id int NOT NULL,
	FOREIGN KEY (shipping_id) REFERENCES shipping_company(shipping_company_id)
);

CREATE TABLE sub_assembly_part (
	_id int GENERATED ALWAYS AS IDENTITY,
	PRIMARY KEY (_id),
	assembly_id int NOT NULL,
	FOREIGN KEY (assembly_id) REFERENCES sub_assembly(assembly_id),
	part_id int  NOT NULL,
	FOREIGN KEY (part_id) REFERENCES part(part_id),
	part_quantity int NOT NULL
);

CREATE TABLE user_info (
  _id int GENERATED ALWAYS AS IDENTITY,
  PRIMARY KEY (_id),
  user_name text NOT NULL,
  password text NOT NULL
);
