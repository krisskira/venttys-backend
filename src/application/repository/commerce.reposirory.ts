import { firebaseDB } from "../../infrastructure/firebase";
import { Commerce, OperationStatus } from "./../../domain/index";
import { iRepository } from "./repository.interface";

export class CommerceRepository implements iRepository<Commerce> {
    async get(): Promise<Commerce[]> {
        return new Promise<Commerce[]>(async (resolve, reject) => {
            try {
                const commercesQueryResult = await firebaseDB
                    .collection("commerces")
                    .get();
                const commerces = commercesQueryResult.docs.map<Commerce>(
                    (c) => <Commerce>c.data()
                );
                resolve(commerces);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getById(commercePhoneNumber: string | number): Promise<Commerce[]> {
        return new Promise<Commerce[]>(async (resolve, reject) => {
            try {
                const commercesQueryResult = await firebaseDB.collection("commerces");
                const commerces = await commercesQueryResult
                    .where("phone", "==", commercePhoneNumber)
                    .get();
                if (!commerces.size) {
                    reject("commerce_not_found");
                    return;
                }
                const commercesData = commerces.docs.map<Commerce>(
                    (commerce) => <Commerce>commerce.data()
                );

                resolve(commercesData);
            } catch (error) {
                reject(error);
            }
        });
    }

    async create(commerceInfo: Commerce): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                const commercesQueryResult = await firebaseDB
                    .collection("commerces")
                    .add(commerceInfo);
                resolve(commercesQueryResult.id);
            } catch (error) {
                reject(error);
            }
        });
    }

    async update(data: Partial<Commerce>): Promise<OperationStatus> {
        return new Promise<OperationStatus>(async (resolve, reject) => {
            try {
                const commercesQueryResult = await firebaseDB
                    .collection("commerces")
                    .where("phone", "==", data.phone)
                    .get();
                if (!!commercesQueryResult.docs.length) {
                    await commercesQueryResult.docs[
                        commercesQueryResult.docs.length
                    ].ref.set(data);
                    resolve("Completed");
                }
                resolve("NoCompleted");
            } catch (error) {
                reject(error);
            }
        });
    }

    async deactivate(
        commercePhoneNumber: string | number
    ): Promise<OperationStatus> {
        return new Promise<OperationStatus>(async (resolve, reject) => {
            try {
                const commercesQueryResult = await firebaseDB
                    .collection("commerces")
                    .where("phone", "==", commercePhoneNumber)
                    .get();
                if (!!commercesQueryResult.docs.length) {
                    await commercesQueryResult.docs[
                        commercesQueryResult.docs.length
                    ].ref.set({ enable: false }); // .delete();
                    resolve("Completed");
                }
                resolve("NoCompleted");
            } catch (error) {
                reject(error);
            }
        });
    }
}
