import { IDepartment, IStaff } from ".";

export const isDepartment = (obj: object): obj is IDepartment => {
  return "_id" in obj && "name" in obj;
};

export const isStaff = (obj: object): obj is IStaff => {
  return (
    "_id" in obj && "name" in obj && "surname" in obj && "department" in obj
  );
};
