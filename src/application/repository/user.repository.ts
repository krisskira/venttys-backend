import { ErrorCodes } from "../../domain";
import { CommerceUser } from "../../domain/commerceUser.interface";
import { firebaseAuth, firebaseDB } from "../../infrastructure/firebase";
import { OperationStatus } from "./../../domain";
import { iUserRepository } from "./repository.interface";

export class UserRepository implements iUserRepository {
    /**
     *
     * @returns All users in database.
     */
    async get(): Promise<CommerceUser[]> {
        return new Promise<CommerceUser[]>(async (resolve, reject) => {
            try {
                const usersQueryResult = await firebaseDB.collection("users").get();
                const users = usersQueryResult.docs.map<CommerceUser>(
                    (u) => <CommerceUser>u.data()
                );
                resolve(users);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Get Commerce User filter by Firebase Auth ID
     * @param auth_id
     * @returns User
     */
    async getById(authId: string): Promise<CommerceUser> {
        return new Promise<CommerceUser>(async (resolve, reject) => {
            try {
                const usersQueryResult = await firebaseDB.collection("users");
                const users = await usersQueryResult
                    .where("auth_id", "==", authId)
                    .get();
                if (!users.size) {
                    reject(ErrorCodes.userNotFound);
                    return;
                }
                const usersData = users.docs.map<CommerceUser>(
                    (user) => <CommerceUser>user.data()
                );
                resolve(usersData[users.size - 1]);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @ignore
     * IMPORTANT!! replace by ´getUsersByDBCommerceID´
     * Get All Commerce Users firter by firebase ID of Commerce collection.
     * @param commerceId
     * @returns CommerceUser
     */
    async getByComercePhone(): Promise<CommerceUser[]> {
        throw "Replace by getUsersByDBCommerceID.";
    }

    async getUsersByDBCommerceID(DBCommerceID: string): Promise<CommerceUser[]> {
        return new Promise<CommerceUser[]>(async (resolve, reject) => {
            try {
                const usersQueryResult = await firebaseDB.collection("users");
                const users = await usersQueryResult
                    .where("commerce", "==", DBCommerceID)
                    .get();
                if (!users.size) {
                    reject(ErrorCodes.userNotFound);
                    return;
                }
                const usersData = users.docs.map<CommerceUser>(
                    (commerce) => <CommerceUser>commerce.data()
                );
                resolve(usersData);
            } catch (error) {
                reject(error);
            }
        });
    }

    async getUsersByEmail(email: string): Promise<CommerceUser> {
        return new Promise<CommerceUser>(async (resolve, reject) => {
            try {
                const usersQueryResult = await firebaseDB.collection("users");
                const users = await usersQueryResult.where("email", "==", email).get();
                if (!users.size) {
                    reject(ErrorCodes.userNotFound);
                    return;
                }
                const usersData = users.docs.map<CommerceUser>(
                    (commerce) => <CommerceUser>commerce.data()
                );
                resolve(usersData[users.size - 1]);
            } catch (error) {
                reject(error);
            }
        });
    }

    async create(data: CommerceUser): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                if (!data.comerce || !data.email || !data.password) {
                    reject(ErrorCodes.requiredFieldsAreMissing);
                    return;
                }
                const userAuth = await firebaseAuth.createUser({
                    email: data.email,
                    password: data.password,
                    displayName: data.name,
                    phoneNumber: data.phone,
                });
                const { password, ...user } = data
                const comemrceRef = await firebaseDB.collection("commerces").doc()
                await firebaseDB.collection("users").doc(userAuth.uid).set({
                    ...user,
                    auth_id: userAuth.uid,
                    commerce: comemrceRef
                });

                resolve(userAuth.uid);
            } catch (error) {
                reject(error);
            }
        });
    }

    async update(data: Partial<CommerceUser>): Promise<OperationStatus> {
        return new Promise<OperationStatus>(async (resolve, reject) => {
            try {
                if (!data.auth_id) {
                    throw ErrorCodes.requiredFieldsAreMissing;
                }

                await firebaseAuth.updateUser(data.auth_id, {
                    ...data,
                });

                const usersQueryResult = await firebaseDB
                    .collection("users")
                    .where("auth_id", "==", data.auth_id)
                    .get();
                if (!!usersQueryResult.size) {
                    const { auth_id, comerce, ...dataToUpdate } = { ...data }
                    if (!!comerce) {
                        const commerceRef = await firebaseDB.collection("commerces").doc(comerce)
                        await usersQueryResult
                            .docs[usersQueryResult.size - 1]
                            .ref.update({ ...dataToUpdate, comerce: commerceRef });
                    } else {
                        await usersQueryResult
                            .docs[usersQueryResult.size - 1]
                            .ref.update(dataToUpdate);
                    }
                    resolve("Completed");
                }
                resolve("NoCompleted");
            } catch (error) {
                reject(error);
            }
        });
    }

    deactivate(authId: string): Promise<OperationStatus> {
        return new Promise<OperationStatus>(async (resolve, reject) => {
            try {
                firebaseAuth.revokeRefreshTokens(authId);
                await firebaseAuth.updateUser(authId, {
                    disabled: true,
                });
                const usersResult = await firebaseDB
                    .collection("users")
                    .where("auth_id", "==", authId)
                    .get();

                if (!!usersResult.size) {
                    await usersResult.docs[usersResult.size - 1].ref.set({
                        enable: false,
                    }); // .delete();
                    resolve("Completed");
                }
                resolve("NoCompleted");
            } catch (error) {
                reject(error);
            }
        });
    }

    async delete(authId: string): Promise<OperationStatus> {
        await firebaseDB.collection("users").doc(authId).delete()
        await firebaseAuth.deleteUser(authId);
        return "Completed";
    }
}
