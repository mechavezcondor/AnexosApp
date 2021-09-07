<!-- PROJECT LOGO -->

<p align="center">
    <h1 align="center">AnexosApp</h1> 

   <p align="center">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </p>
   
  <p align="center">
    API to create patients and add attachments to patients (images, pdf, word, excel).
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technologies">Technologies</a></li>
    <li><a href="#architecture-and-data-model">Architecture and data model</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## Installation

Use the package manager [npm](https://docs.npmjs.com/) to install AnexosApp.

```bash
npm install
```

## Usage

Use the ```serverless deploy```  command to get the project up and running.

```bash
serverless deploy
```

## Technologies

Project is created with:

* NodeJS
* AWS API Gateway
* AWS Lambda
* AWS S3
* MongoDB

## Architecture and data model

![The Architecture](/images/architecture.png "Architecture")

## Structure

![The structure](/images/structure.png "Architecture")

### Data model

```javascript
// Patient Schema
const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    annexed: [{
        location: {
            type: String,
            required: true
        },
        Key: {
            type: String,
        }
    }]
})

// Annexed Schema
const annexedSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    Key: {
        type: String,
    }
})
```

## EndPoints
```javascript
endpoints:
  GET - https://by1z2co6p8.execute-api.us-east-2.amazonaws.com/dev/patients
  GET - https://by1z2co6p8.execute-api.us-east-2.amazonaws.com/dev/patients/{id}
  POST - https://by1z2co6p8.execute-api.us-east-2.amazonaws.com/dev/patients
  PATCH - https://by1z2co6p8.execute-api.us-east-2.amazonaws.com/dev/patients/annexed/{id}
  DELETE - https://by1z2co6p8.execute-api.us-east-2.amazonaws.com/dev/patients/annexed/{id}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)