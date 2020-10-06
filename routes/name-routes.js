const router = require("express").Router();
const nid = require("nanoid");
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

router.post("/", async (req, res) => {
  try {
    let { page, rowsPerPage } = req.body;
    let totalEntries = await Names.count();
    if (totalEntries % rowsPerPage == 0) {
      totalPages = parseInt(totalEntries / rowsPerPage);
    } else {
      totalPages = parseInt(totalEntries / rowsPerPage) + 1;
    }
    if (page > totalPages) {
      page = totalPages;
    }
    if (totalEntries == 0) {
      return res.status(200).json({
        names: [],
        page: 1,
        pages: rowsPerPage,
        rows: rowsPerPage,
      });
    }
    const names = await Names.findAll({
      attributes: [
        "id",
        ["first_name", "firstName"],
        ["middle_name", "middleName"],
        ["last_name", "lastName"],
      ],
      limit: rowsPerPage,
      offset: (page - 1) * rowsPerPage,
    });
    return res.status(200).json({
      names: names,
      page: page,
      pages: totalPages,
      rows: totalEntries,
    });
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
    let id = nid.nanoid(10);
    let name = await Names.create({
      id: id,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
    });
    console.log(name.dataValues);
    return res.status(200).json({ id, firstName, middleName, lastName });
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
