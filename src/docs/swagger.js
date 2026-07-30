import swaggerJSDoc from "swagger-jsdoc";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authDoc = YAML.load(path.join(__dirname, "auth.yaml"));
const patientDoc = YAML.load(path.join(__dirname, "patient.yaml"));
const doctorDoc = YAML.load(path.join(__dirname, "doctor.yaml"));
const appointmentDoc = YAML.load(path.join(__dirname, "appointment.yaml"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MediConnect API",
      version: "1.0.0",
      description: "REST API documentation for the MediConnect Healthcare Backend",
    },
    servers: [{url: "http://localhost:5000"}],

    paths: {
      ...authDoc.paths,
      ...patientDoc.paths,
      ...doctorDoc.paths,
      ...appointmentDoc.paths,
    },

    components: {
      ...authDoc.components,
      ...patientDoc.components,
      ...doctorDoc.components,
      ...appointmentDoc.components,
    },
  },

  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;