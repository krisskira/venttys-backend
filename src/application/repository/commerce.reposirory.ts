import { firebaseDB } from "../../infrastructure/firebase";
import { iRepository } from "./repository.interface";

export class CommerceRepository implements iRepository<string> {
  get = (): Promise<string> => {
    return new Promise<string>(async (resolve) => {
      const commercesQueryResult = await firebaseDB.collection("commerces");
      const commerces = await commercesQueryResult.get();
      //.where("phone", "==", commercePhoneNumber);

      const commerceRef = commerces.docs.map((c) => c.data());

      console.log("***-> Result", JSON.stringify(commerceRef));
      resolve(JSON.stringify(commerceRef));
    });
  };

  getById = (): Promise<string> => {
    return new Promise<string>((resolve) => {
      resolve("Success");
    });
  };
}
