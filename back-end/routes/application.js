const express = require("express");

const { addApplication, getApplications, getOtherDepartments } = require("./../controllers/application-controller");

const router = express.Router();

router.post("/add-application", addApplication);
router.get("/get-applications", getApplications);
router.get("/get-other-departments", getOtherDepartments);

module.exports = router;
