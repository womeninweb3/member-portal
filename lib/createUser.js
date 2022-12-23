import { base } from "./Airtable";

export function createUser() {
  // const fields = {
  //   Email: "0_test@gmail.com",
  //   "User Address": "0x0",
  //   "Token ID": "3",
  //   "Current Level": 1,
  // };
  const fields = {
    Email: "betonelon@gmail.com",
    "User Address": "0x0",
    "Token ID": "4",
    "Current Level": 1,
  };
  base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_ID).create(
    [
      {
        fields,
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
}
