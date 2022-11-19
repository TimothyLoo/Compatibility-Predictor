# Compatibility-Predictor
Datahouse Compatibility Predictor

# Description

This app evaluates a list of applicants to join the Datahouse team. The list of applicants are given a compatability score based on the existing team members.

This app takes in a JSON object that contains 2 arrays. The first array at property 'team' consists of the existing team members. The second array at property 'applicants' consists potential highers. Both arrays are a list of objects. Each object has a name property and an attributes property. At the name property is a string of the team member's or applicant's name. We'll assume each team member and applicant name is unique. The attributes property contains an object of 4 properties: intelligence, strength, endurance, and spicyFoodTolerance.

We will use a weighted average to calculate the applicant's compatablity score.

## Strength and Intelligence
The 2 most important attributes are strength and intelligence. This will consist of 70% of the total compatability score. To determine the what's more important to the team currently, we will calculate the team's average score for intelligence and strength.
If team's average score for intelligence is less than the team's average score for strength, more weight will be given to the applicant's intelligence score.
Intelligence weight: 40%, Strength weight: 30%

If team's average score for strength is less than the team's average score for intelligence, more weight will be given to the applicant's strength score.
Intelligence weight: 30%, Strength weight: 40%

If team's average score for strength and the team's average score for intelligence are equal, the applicant's strength and intelligence scores will be weighted equally.
Intelligence weight: 35%, Strength weight: 45%

## Endurance
The endurance attribute is great to have, but will only be effective when paired with the strength or intelligence attribute. A lesser weight will be given to endurance. The higher the applicant's endurance score, the better.
Endurance weight: 20%

## Spicy Food Tolerance
The spicy food tolerance attribute is important because it will help to determine the applicant's synergy with the rest of the team. To earn a high compatability score for the spicy food tolerance attribute, the applicant's spicy food tolerance should be as close to the team's average spicy food tolerance. The further away from the average, the lower the applicant's spicy food tolerance compatability.
Spicy Food Tolerance weight: 10%

## Results
Each candidate's attributes will be multiplied against the weights for each attribute. The weighted averages will be summed together to get the applicant's compatability score. A resulting JSON object containing an array of applicants and their scores will be returned.