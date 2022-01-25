import clipboard from "clipboardy";
import { copyLimitEnter, waitForEnter } from "./inquiry.js";

let copyLimit;

/**
 * Joins the Email IDs of students with ", " and copies the string to clipboard.
 *
 * Google APIs don't allow accounts outside of workspace to access the
 * admin API, so a string of the emails is copied, and can be pasted into
 * the dialogue box on the site.
 *
 * @param `interestedStudents` The array of intersted students
 */
async function copy({ interestedStudents }) {
  console.log(
    `Number of Suitable Entries found : ${interestedStudents.length} entries`
  );

  copyLimit = parseInt((await copyLimitEnter()).copyLimit) ?? 10;

  await copyNToClipboard({ interestedStudents }, 0);
}

async function copyNToClipboard({ interestedStudents }, n) {
  if (n > interestedStudents.length) return;

  let skip = await waitForEnter(n, interestedStudents.length);

  let copyEMailIDs;

  if (!skip) {
    copyEMailIDs = interestedStudents
      .slice(n, n + copyLimit)
      .map((student) => student.email)
      .join(", ");

    clipboard.writeSync(copyEMailIDs);
  }

  await copyNToClipboard({ interestedStudents }, n + copyLimit);
}

export { copy, copyLimit };
