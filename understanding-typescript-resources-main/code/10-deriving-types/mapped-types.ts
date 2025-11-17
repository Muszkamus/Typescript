type ReadPermissions = "no-read" | "read";
type WritePermissions = "no-write" | "write";

type FilePermissions = `${ReadPermissions}-${WritePermissions}`;
// "no-read-no-write" | "no-read-write" | "read-no-write" | "read-write"

// TypeScript generates this union  — no manual typing.

type DataFile = {
  data: string;
  permissions: FilePermissions; // A simple data file object where the permissions must be one of those 4 exact strings.
};

type DataFileEventNames = `${keyof DataFile} changed`; // "data changed" | "permissions changed"

type DataFileEvents = {
  [Key in DataFileEventNames]: () => void;
  // A mapped type uses the string union created above to build an object with the exact event names as keys, each pointing to a callback function.

  // type DataFileEvents = {
  //     "data changed": () => void;
  //     "permissions changed": () => void;
  // }
};
