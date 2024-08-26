const data = require('./res.json')
// Example JSON data

const jsonData = data
// Function to find duplicate score_id
function findDuplicateScoreIds (data) {
  const scoreIds = data.map(item => item.score_id)
  const duplicateScoreIds = []

  // Create a Set to track unique score_ids
  const seen = new Set()

  // Iterate through the scoreIds array
  for (const scoreId of scoreIds) {
    if (seen.has(scoreId)) {
      // If scoreId is already in the Set, it's a duplicate
      if (!duplicateScoreIds.includes(scoreId)) {
        duplicateScoreIds.push(scoreId)
      }
    } else {
      // Add the scoreId to the Set
      seen.add(scoreId)
    }
  }

  return duplicateScoreIds
}

// Usage
const comments = jsonData.data.data
const duplicates = findDuplicateScoreIds(comments)

console.log('Duplicate score_ids:', duplicates)
