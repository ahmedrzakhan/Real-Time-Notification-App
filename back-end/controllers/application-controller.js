const Application = require("./../Models/Application");
const User = require("./../Models/User");

const addApplication = async (req, res) => {
  const {
    assignedTo,
    createdBy,
    createdDate,
    department,
    message,
    status,
  } = req.body;

  const application = new Application({
    assignedTo,
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
  const { assignedTo, createdBy, status } = req.query;

  if (assignedTo) {
    const applications = await Application.find({ assignedTo: assignedTo });
    return res.send(applications);
  } else {
    const applications = await Application.find(
      {
        createdBy: createdBy,
        status: status,
      },
      { createdBy: 0 }
    );
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

module.exports = { addApplication, getApplications, getOtherDepartments };
