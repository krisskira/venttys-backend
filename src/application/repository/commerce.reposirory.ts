import { Commerce, CommerceSchedule } from "../../domain/commerce.interface";
import { firebaseDB } from "../../infrastructure/firebase";
import { DayName, DaysCode, ErrorCodes, OperationStatus } from "./../../domain";
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

  async getById(id: string): Promise<Commerce> {
    return new Promise<Commerce>(async (resolve, reject) => {
      try {
        const commercesDoc = await firebaseDB
          .collection("commerces")
          .doc(id)
          .get();
        if (!commercesDoc.exists) {
          reject(ErrorCodes.commerceNotFound);
          return;
        }
        resolve(<Commerce>commercesDoc.data());
      } catch (error) {
        reject(error);
      }
    });
  }

  async getByComercePhone(
    commercePhoneNumber: string | number
  ): Promise<Commerce[]> {
    return new Promise<Commerce[]>(async (resolve, reject) => {
      try {
        const commercesQueryResult = await firebaseDB.collection("commerces");
        const commerces = await commercesQueryResult
          .where("phone", "==", commercePhoneNumber)
          .get();
        if (!commerces.size) {
          reject(ErrorCodes.commerceNotFound);
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
      const commerdceData: Commerce = {
        ...commerceInfo,
        enable: true,
        commerce_status: "Close",
        delivery_price: 0,
        delivery_time: "0 min",
        paymentMehods: [],
        messages: this.genCommerceMessages(),
        schedules: this.genWeekDays() as Commerce["schedules"]
      };

      try {
        const commercesQueryResult = await firebaseDB
          .collection("commerces")
          .add(commerdceData);
          await commercesQueryResult.update({
              commerceId: commercesQueryResult.id
          })
        resolve(commercesQueryResult.id);
      } catch (error) {
        reject(error);
      }
    });
  }

  async update(data: Partial<Commerce>): Promise<OperationStatus> {
    return new Promise<OperationStatus>(async (resolve, reject) => {
        await firebaseDB
          .collection("commerces")
          .doc(data.commerceId!)
          .update({...data});
          resolve("Completed");
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

  private genWeekDays(): CommerceSchedule {
    return DaysCode.reduce<CommerceSchedule>((schedule, d, i) => {
      return {
        ...schedule,
        [d]: {
          number_day: i + 1,
          code: d,
          name: DayName[i],
          enable: false,
          close: {
            hour: 0,
            minute: 0,
          },
          open: {
            hour: 0,
            minute: 0,
          },
        },
      };
    }, {});
  }

  private genCommerceMessages(): Commerce["messages"] {
    return {
      open: {
        enable: false,
        value: "",
      },
      await: {
        enable: false,
        value: "",
      },
      close: {
        enable: false,
        value: "",
      },
    };
  }
}
