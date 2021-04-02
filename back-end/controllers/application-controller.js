const Application = require("./../Models/Application");
const User = require("./../Models/User");

const addApplication = async (req, res) => {
  const {
    assignedToUserId,
    assignedToUserName,
    assignedToUserEmail,
    assignedDepartment,
    createdBy,
    createdDate,
    department,
    message,
    status,
  } = req.body;

  const application = new Application({
    assignedDepartment,
    assignedToUserId,
    assignedToUserName,
    assignedToUserEmail,
    createdBy,
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
  const { createdBy, assignedDepartment, status } = req.query;

  if (assignedDepartment) {
    const applications = await Application.find({
      assignedDepartment: assignedDepartment,
      status: { $ne: "Approved" },
    });
    return res.send(applications);
  } else {
    const applications = await Application.find(
      {
        createdBy: createdBy,
        status: status,
      },
      { createdBy: 0 }
    ).limit(5);
    return res.send(applications);
  }
};

const getOtherDepartments = async (req, res) => {
  const { department } = req.query;

  const departments = await User.find(
    { department: { $ne: department } },
    { department: 1 }
  );

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
    assignedTo,
    createdBy,
    createdDate,
    department,
    _id,
    message,
    status,
  } = req.body;

  Application.findById(_id)
    .then((application) => {
      (application.assignedTo = assignedTo),
        (application.createdBy = createdBy),
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
