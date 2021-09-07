'use strict';

const queryString = require('query-string');
const response = require('./network/response');
const controllerPatient = require('./components/patient/controller');
const { createAnnexed, removeAnnexed } = require('./components/annexed/controller');

// Connection DB
const { connect } = require('./db');

const getPatient = async () => {
  try {
    connect();
    const data = await controllerPatient.listPatient();

    return response.success(200, 'Get All Patients Success', data);
  } catch (error) {
    return response.error(400, 'Error Get All Patients', error);
  }
};

const getPatientById = async (event) => {
  try {
    connect();
    const { id } = event.pathParameters;
    const data = await controllerPatient.getPatientId(id);

    return response.success(200, 'Get All Patients Success', data);
  } catch (error) {
    return response.error(400, 'Error Get Patients', error);
  }
};

const addPatient = async (event) => {
  try {
    connect();
    const { name, lastName, age } = queryString.parse(event.body);
    const data = await controllerPatient.createPatient(name, lastName, age);

    return response.success(200, 'Patient Created', data);
  } catch (error) {
    return response.error(400, 'Error patient create', error);
  }
};

const updateAnnexed = async (event) => {
  try {
    connect();
    const { id } = event.pathParameters;
    const data = await createAnnexed(id, event);

    return response.success(200, 'Annexed Add', data);
  } catch (error) {
    return response.error(400, 'Error Add Annexed', error);
  };
};

const deleteAnnexed = async (event) => {
  try {
    connect();
    const { id } = event.pathParameters;
    const { key, idPatient } = queryString.parse(event.body);
    const data = await removeAnnexed(id, key, idPatient);

    return response.success(200, 'Annexed delete', data);
  } catch (error) {
    return response.error(400, 'Error Annexed delete', error);
  }
};

module.exports = {
  getPatient,
  getPatientById,
  addPatient,
  updateAnnexed,
  deleteAnnexed
};