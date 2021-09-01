'use strict';

const queryString = require('query-string');

module.exports.getPatient = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `get all patients`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.getPatientById = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Id paciente ${event.pathParameters.id}`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.patientAdd = async (event) => {
  const { name, lastName } = queryString.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Create Patient',
        input: `name: ${name}; lastName: ${lastName}`,
      },
      null,
      2
    ),
  };
};

module.exports.updateAnnexed = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'getUsers..',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.deleteAnnexed = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Id paciente ${event.pathParameters.id}`,
        input: event,
      },
      null,
      2
    ),
  };
};
