
/**Arreglo que contiene todos los endpoints para acceso a al backend.
* *Code:
* @param code código interno para el manejo en frontEnd
* @param endpoint  endpoint para pedir al backEnd
* *
*/
let endpointList: Array<{ code: string, endpoint: string }> = [
  {
    code:'product:list',
    endpoint:"product/list"
  }
];

export default endpointList;
