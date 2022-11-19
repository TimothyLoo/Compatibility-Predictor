module.exports = {
  evaluateIntStr: (team) => {
    const intTotal = team.reduce(
      (total, member) => total + member.attributes.intelligence,
      0
    );
    const intAvg = intTotal / team.length;

    const strTotal = team.reduce(
      (total, member) => total + member.attributes.strength,
      0
    );
    const strAvg = strTotal / team.length;

    let intMul, strMul;

    if (intAvg < strAvg) {
      intMul = 0.4;
      strMul = 0.3;
    } else if (strAvg < intAvg) {
      intMul = 0.3;
      strMul = 0.4;
    } else {
      intMul = 0.35;
      strMul = 0.35;
    }

    return [intMul, strMul];
  },
  enduranceMultiplier: 0.2,
  sftMultiplier: 0.1,
  sftAverage: (team) => {
    const sftTotal = team.reduce(
      (total, member) => total + member.attributes.spicyFoodTolerance,
      0
    );
    const sftAvg = sftTotal / team.length;

    return sftAvg;
  },
};
