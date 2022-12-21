const Airtable = require("airtable");

console.log("process.env.AIRTABLE_API_KEY: ", process.env.NEXT_PUBLIC_AIRTABLE_API_KEY);
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
});
export const base = Airtable.base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);
