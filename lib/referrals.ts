const validReferrers = [
  "Amit Shah",
  "Priya Sharma",
  "Rajesh Kumar",
  // Add more valid referrers
]

export const validateReferral = (referrerName: string) => {
  return validReferrers.includes(referrerName)
}

