import { base } from "./Airtable";

export async function updateCurrentLevel(userId, userEmail, userAddress, tokenID, newLevel) {
  const userTable = await base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID);

  // Get user data to pass in here:
  // User data to update: 
  const fieldsToUpdate = {
    Email: userEmail,
    "User Address": userAddress,
    "Token ID": tokenID,
    "Current Level": newLevel,
  };

  // Updates current level:
  await userTable
    .update(
      userId,
      fieldsToUpdate, 
      function(err, records) {
      if (err) {
        console.error(err);
        return;
      }

      // Log records on success:
      console.log("records[0].fields: ", records.fields);
    });

}
