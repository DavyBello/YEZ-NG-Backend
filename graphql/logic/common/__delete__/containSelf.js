module.exports = ({ TC, resolver }) => TC.get(resolver).wrapResolve(next => async (rp) => {
  // get sourceUser from resolveParams (rp)
  const { args, sourceUser, sourceUserType } = rp;
  if (`${sourceUser._id}` === `${args.record._id}`) {
    const result = await next(rp);
    return result;
  }
  throw new Error(`This ${sourceUserType.toLowerCase()} can only edit itself`);
});
