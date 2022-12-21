import { base } from "./Airtable";

export async function getUser() {
  const userTable = await base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID);

  // Test Data
  const testEmail = "hello@seemcat.com";
  const airtableField = "Email";

  await userTable
    .select({ filterByFormula: `{${airtableField}} = "${testEmail}"` })
    .firstPage(function (err, records) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("records[0].fields: ", records[0].fields);
      return records[0].fields;
    });
}
