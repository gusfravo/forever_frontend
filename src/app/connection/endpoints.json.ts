
/**Arreglo que contiene todos los endpoints para acceso a al backend.
* *Code:
* @param code código interno para el manejo en frontEnd
* @param endpoint  endpoint para pedir al backEnd
* *
*/
let endpointList: Array<{ code: string, endpoint: string }> = [
  {
    code:'auth:login',
    endpoint:"auth/login"
  },{
    code: 'auth:signup',
    endpoint: 'auth/signup'
  },{
    code: 'patient:update',
    endpoint: 'patient/update'
  },{
    code: "patient:list",
    endpoint: "patient/list"
  },{
    code: "patient:get",
    endpoint: "patient/get"
  },{
    code: "medicalRecord:findByPatient",
    endpoint: "medicalRecord/findByPatient"
  },{
    code: "inheritFamily:update",
    endpoint: "inheritFamily/update"
  },{
    code: "inheritFamily:findByMedicalRecord",
    endpoint: "inheritFamily/findByMedicalRecord"
  },{
    code: "nonPathologicalHistory:update",
    endpoint: "nonPathologicalHistory/update"
  },{
    code: "nonPathologicalHistory:findByMedicalRecord",
    endpoint: "nonPathologicalHistory/findByMedicalRecord"
  },{
    code: "patient:findAllByDoctor",
    endpoint: "patient/findAllByDoctor"
  },{
    code: "pathologicalHistory:findByMedicalRecord",
    endpoint: "pathologicalHistory/findByMedicalRecord"
  },{
    code: "pathologicalHistory:update",
    endpoint: "pathologicalHistory/update"
  },{
    code: "gynecoObstetricHistory:findByMedicalRecord",
    endpoint: "gynecoObstetricHistory/findByMedicalRecord"
  },{
    code: "gynecoObstetricHistory:update",
    endpoint: "gynecoObstetricHistory/update"
  },{
    code: "patient:upload",
    endpoint: "patient/upload"
  },{
    code: "medicalNote:findAllByDoctorAndPatient",
    endpoint: "medicalNote/findAllByDoctorAndPatient"
  },{
    code: "medicalNote:update",
    endpoint: "medicalNote/update"
  },{
    code: "medicalNote:get",
    endpoint: "medicalNote/get"
  },{
    code: "medicalNote:findLastByDoctorPatiend",
    endpoint: "medicalNote/findLastByDoctorPatiend"
  },{
    code: "patient:searchAndfindByDoctor",
    endpoint:"patient/searchAndfindByDoctor"
  },{
    code: "attachMedicalNote:findAllByMedicalNote",
    endpoint:"attachMedicalNote/findAllByMedicalNote"
  },{
    code: "attachMedicalNote:update",
    endpoint:"attachMedicalNote/update"
  },{
    code: "attachMedicalNote:deleteOne",
    endpoint:"attachMedicalNote/deleteOne"
  },{
    code: "attachMedicalNote:upload",
    endpoint:"attachMedicalNote/upload"
  }
];

export default endpointList;
