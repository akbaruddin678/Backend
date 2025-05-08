// Database name
const DB_NAME = "NavttcProject";

// Mapping of indicators to categories
const categoryMap = {
  "Skilled Workforce": "WorkforceReadiness",
  "International Certification": "WorkforceReadiness",
  "Productive Employment": "WorkforceReadiness",
  "Skilled Labor Export": "WorkforceReadiness",
  "Skilled Labor Export Earnings": "WorkforceReadiness",
  "Recognition of Prior Learning (RPL)": "WorkforceReadiness",
  "National Accreditation": "QualityAssurance",
  "International Accreditation": "QualityAssurance",
  "Licensing Regime (Assessors)": "QualityAssurance",
  Employability: "WorkforceReadiness",
};

module.exports = { DB_NAME, categoryMap };
