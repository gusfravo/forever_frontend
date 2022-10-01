
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
  },{
    code: "product:get",
    endpoint: "product/get"
  },{
    code: "product:update",
    endpoint: "product/update"
  },{
    code: "level:list",
    endpoint: "level/list"
  },{
    code: "level:get",
    endpoint: "level/get"
  },{
    code: "level:update",
    endpoint: "level/update"
  },{
    code: "productLevelPrice:findAllByProduct",
    endpoint: "productLevelPrice/findAllByProduct"
  },{
    code: "productLevelPrice:get",
    endpoint: "productLevelPrice/get"
  },{
    code: "productLevelPrice:update",
    endpoint: "productLevelPrice/update"
  }
];

export default endpointList;
