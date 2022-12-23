import { base } from "./Airtable";

export async function getCurrentUser(email) {
  const userTable = await base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID);

  // Test Data
  const testEmail = email;
  const airtableField = "Email";

  return userTable
    .select({ filterByFormula: `{${airtableField}} = "${testEmail}"` })
    .firstPage()
    .then(records => {
      return records[0].fields;
    });
}
