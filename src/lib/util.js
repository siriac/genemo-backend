export const getPaginationInfo = (page, limit, count) => {
  return {
    page: +page,
    limit: +limit,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };
};
export const toUpperCaseStationName=(req, res, next)=>{
  const {stationName}=req.params;
  if(stationName){
    req.params.stationName=stationName.toUpperCase();
    next();
  }
  else{
    next(new Error("parametre stationName inexistant"));
  }
}
