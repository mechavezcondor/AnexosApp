'use strict';

const queryString = require('query-string');
const response = require('./network/response');
const { listPatient, createPatient, getPatientId } = require('./components/patient/controller');
const { createAnnexed, removeAnnexed } = require('./components/annexed/controller');
const URL = process.env.URLDB;

// Connection DB
const db = require('./db');

const getPatient = async () => {
  await db(URL);
  try {
    const data = await listPatient();
    return response.success(200, 'Get All Patients Success', data);
  } catch (error) {
    return response.error(400, 'Error Get Patients', error);
  }
};

const getPatientById = async (event) => {
  await db(URL);
  const { id } = event.pathParameters;
  try {
    const data = await getPatientId(id);
    return response.success(200, 'Get All Patients Success', data);
  } catch (error) {
    return response.error(400, 'Error Get Patients', error);
  }
};

const addPatient = async (event) => {
  await db(URL);
  const { name, lastName, age } = queryString.parse(event.body);
  try {
    const data = await createPatient(name, lastName, age);
    return response.success(200, 'Patient Created', data);
  } catch (error) {
    return response.error(400, 'Patient error', error);
  }
};

const updateAnnexed = async (event) => {
  try {
    await db(URL);
    const { id } = event.pathParameters;

    const data = await createAnnexed(id, event);

    return response.success(200, 'Annexed Add', data);
  } catch (error) {
    return response.error(400, 'Error Add Annexed', error);
  };
};

const deleteAnnexed = async (event) => {
  try {
    await db(URL);
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