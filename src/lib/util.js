export const getPaginationInfo = (page, limit, count) => {
  return {
    page: +page,
    limit: +limit,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };
};
export const toUpperCaseStationName1=(req, res, next)=>{
  const {stationName}=req.params;
  if(stationName){
    req.params.stationName=stationName.toUpperCase();
    next();
  }
  else{
    next(new Error("parametre stationName inexistant"));
  }
}
export const toUpperCaseStationName=(req, res, next)=>{
  const {site:stationName, idClient:regionName}=req.body;
  if(stationName && regionName){
    req.body.stationName=stationName.toUpperCase();
    req.body.regionName=regionName.toUpperCase();
    next();
  }
  else{
    next(new Error("parametre site et /ou idClient inexistant"));
  }
}
