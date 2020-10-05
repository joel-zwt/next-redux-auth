const router = require("express").Router();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("next-dash", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});

const Names = sequelize.define("Name", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  middle_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
});

router.get("/", async (req, res) => {
  try {
    const names = await Names.findAll({
      attributes: [
        "id",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
      ],
    });
    return res.status(200).json(names);
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

router.post("/add", async (req, res) => {
  try {
    let { firstName, middleName, lastName } = req.body;
    let name = await Names.create({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    });
    console.log(name.dataValues);
    return res.status(200).json({ firstName, middleName, lastName });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    console.log(req.body);
    let { firstName, middleName, lastName } = req.body;
    let id = req.params.id;
    let name = await Names.findOne({ where: { id: id } });
    if (name == null) {
      return res.status(404).json({ message: "This name does not exist." });
    }
    await Names.update(
      {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
      },
      { where: { id: id } }
    );
    return res.status(200).json({ id, firstName, middleName, lastName });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let name = await Names.findOne({ where: { id: id } });
    if (name == null) {
      return res.status(404).json({ message: "This name does not exist." });
    }
    await Names.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).end();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
});

module.exports = router;
