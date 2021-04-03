const Application = require("./../Models/Application");
const User = require("./../Models/User");

const addApplication = async (req, res) => {
  const {
    assignedToUserId,
    assignedToUserName,
    assignedToUserEmail,
    assignedDepartment,
    createdByUserId,
    createdByUserName,
    createdByUserEmail,
    createdDate,
    department,
    message,
    status,
  } = req.body;

  const application = new Application({
    assignedToUserId,
    assignedToUserName,
    assignedToUserEmail,
    assignedDepartment,
    createdByUserId,
    createdByUserName,
    createdByUserEmail,
    createdDate,
    department,
    message,
    status,
  });

  try {
    const savedApplication = await application.save();
    res.send(savedApplication);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getApplications = async (req, res) => {
  const {
    createdByUserId,
    assignedDepartment,
    assignedToUserId,
    status,
  } = req.query;

  if (assignedDepartment && assignedToUserId) {
    const assignedApplications = await Application.find({
      assignedDepartment: assignedDepartment,
      assignedToUserId: assignedToUserId,
    });

    const departmentApplications = await Application.find({
      assignedDepartment: assignedDepartment,
      status: { $ne: "Approved" },
    });

    const applications = [...assignedApplications, ...departmentApplications];

    const filteredApplications = Array.from(
      new Set(applications.map((a) => a.id))
    ).map((id) => applications.find((a) => a.id === id));

    return res.send(filteredApplications);
  } else {
    const applications = await Application.find(
      {
        createdByUserId: createdByUserId,
        status: status,
      },
      {
        assignedToUserId: 0,
        createdByUserEmail: 0,
        createdByUserId: 0,
        createdByUserName: 0,
      }
    ).limit(5);
    return res.send(applications);
  }
};

const getOtherDepartments = async (req, res) => {
  const { department } = req.query;

  let departments = await User.distinct("department");

  departments = departments.filter((dept) => dept !== department);

  res.send(departments);
};

const getDepartmentUsers = async (req, res) => {
  const { department } = req.query;

  const users = await User.find(
    { department: department },
    { email: 1, name: 1 }
  );

  res.send(users);
};

const updateApplicationStatus = async (req, res) => {
  const {
    assignedToUserName,
    assignedToUserEmail,
    assignedDepartment,
    createdDate,
    department,
    _id,
    message,
    status,
  } = req.body;

  Application.findById(_id)
    .then((application) => {
      (application.assignedToUserName = assignedToUserName),
        (application.assignedToUserEmail = assignedToUserEmail),
        (application.assignedDepartment = assignedDepartment),
        (application.createdDate = createdDate),
        (application.department = department),
        (application.message = message),
        (application.status = status);

      application
        .save()
        .then((application) => {
          res.send(application);
        })
        .catch((error) => {
          console.log("Error in finding application", error);
        });
    })
    .catch((error) => {
      res.status(400).send("Error in updating application", error);
    });
};

module.exports = {
  addApplication,
  getApplications,
  getDepartmentUsers,
  getOtherDepartments,
  updateApplicationStatus,
};
