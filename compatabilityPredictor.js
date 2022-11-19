const {
  evaluateIntStr,
  enduranceMultiplier,
  sftMultiplier,
  sftAverage,
} = require('./evaluateTeam');
const readline = require('readline');

const compatabilityPredictor = (data) => {
  // I - JSON object: 2 arrays [team], [applicants]
  // O - JSON object: [applicants w/ compatability scores]

  // evaluate team
  // find out what the team needs
  // if the team's average intelligence is lower than the team's average strength
  // put more weight on the candidate's intelligence attribute
  // if the team's average strength is lower than the team's average intelligence
  // put more weight on the candidate's strength attribute
  // if the team's average intelligence and average strength are equal
  // weight the candidate's strength and intelligence attribute equally
  const [intMul, strMul] = evaluateIntStr(data.team);
  // the weight on endurance should be lower than the weights of intelligence and strength
  // the higher the candidate's score on endurance, the better
  const endMul = enduranceMultiplier;
  // the weight on the SpicyFoodTolerance should be the lowest of the 4 attributes
  const sftMul = sftMultiplier;

  // calculate the average of the SpicyFoodTolerance of the team
  // the further away the candidate's SpicyFoodTolerance is from the team's average
  // the lower the score
  const teamSftAvg = sftAverage(data.team);

  // create result obj: compatability
  const compatability = { scoredApplicants: [] };

  // evaluate applicants
  const applicants = data.applicants;
  // iterate through applicants
  for (const applicant of applicants) {
    const candidate = { name: applicant.name };
    const int = applicant.attributes.intelligence * (intMul / 10);
    const str = applicant.attributes.strength * (strMul / 10);
    const end = applicant.attributes.endurance * (endMul / 10);
    const sfDif = applicant.attributes.spicyFoodTolerance - teamSftAvg;
    const sft = sftMul - Math.abs(sfDif / 100);
    candidate.score = Number((int + str + end + sft).toFixed(2));
    compatability.scoredApplicants.push(candidate);
  }

  // return compatability as JSON object
  return JSON.stringify(compatability);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "what is your filename? (use the format './filename.json'): ",
  (ans) => {
    let sampleData = require(ans);
    console.log(compatabilityPredictor(sampleData));
    rl.close();
  }
);
