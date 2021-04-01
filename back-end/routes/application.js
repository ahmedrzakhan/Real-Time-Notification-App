const express = require("express");

const {
  addApplication,
  getApplications,
  getDepartmentUsers,
  getOtherDepartments,
  updateApplicationStatus,
} = require("./../controllers/application-controller");

const router = express.Router();

router.post("/add-application", addApplication);
router.get("/get-applications", getApplications);
router.get("/get-department-users", getDepartmentUsers);
router.get("/get-other-departments", getOtherDepartments);
router.post("/update-application-status", updateApplicationStatus);

module.exports = router;
