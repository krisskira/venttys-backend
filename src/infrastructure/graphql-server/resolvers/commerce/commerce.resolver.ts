import { ApolloError, toApolloError } from "apollo-server-express";
import {
    createCommerceController,
    deactivateCommerceController,
    enrollUsersAtCommerceController,
    getCommerceByPhoneNumberController,
    getCommercesController,
    getUsersByCommerceController,
    removeUserOfCommerceController,
    updateCommerceController,
} from "../../../../application/controllers";
import { Commerce } from "../../../../domain";
import { CommerceUser } from "../../../../domain/commerceUser.interface";
import { iResolver } from "../../../graphql-server/interfaces";
// import { Notification } from "../../../interfaces/pubSub.interface";

const commerces: iResolver<void> = async (...[, , context]) => {
    try {
        return await getCommercesController();
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: commerces",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const commerceBy: iResolver<{ phoneNumber: string }> = async (
    ...[, { phoneNumber }, context]
) => {
    try {
        return await getCommerceByPhoneNumberController(phoneNumber);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: commerceBy",
            type: "ERROR",
            msg: error.toString(),
        });
        throw new ApolloError(error.toString(), "INTERNAL_SERVER_ERROR")
    }
};

const createCommerce: iResolver<{ commerceInfo: Commerce }> = async (
    ...[, { commerceInfo }, context]
) => {
    try {
        return await createCommerceController(commerceInfo);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: createCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const updateCommerce: iResolver<{ commerceInfo: Partial<Commerce> }> = async (
    ...[, { commerceInfo }, context]
) => {
    try {
        return await updateCommerceController(commerceInfo);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: updateCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const deactivateCommerce: iResolver<{ phoneNumber: string }> = async (
    ...[, { phoneNumber }, context]
) => {
    try {
        return await deactivateCommerceController(phoneNumber);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: deactivateCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const usersByCommerce: iResolver<{ phoneNumber: string }> = async (
    ...[, { phoneNumber }, context]
) => {
    try {
        return await getUsersByCommerceController(phoneNumber);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: usersByCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const enrollUserAtCommerce: iResolver<{ userInfo: CommerceUser }> = async (
    ...[, { userInfo }, context]
) => {
    try {
        return await enrollUsersAtCommerceController(userInfo);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: enrollUserAtCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};

const dropUserOfCommerce: iResolver<{ userEmail: string }> = async (
    ...[, { userEmail }, context]
) => {
    try {
        return await removeUserOfCommerceController(userEmail);
    } catch (error) {
        context?.logger?.log({
            tag: "***-> Resolver: dropUserOfCommerce",
            type: "ERROR",
            msg: error.message,
        });
        throw toApolloError(error, "INTERNAL_SERVER_ERROR");
    }
};
module.exports = {
    Query: {
        commerces,
        commerceBy,
        // usersByCommerce,
    },
    //   Mutation: {
    //     commerce: createCommerce,
    //     updateCommerce,
    //     deactivateCommerce,
    //     enrollUserAtCommerce,
    //     dropUserOfCommerce,
    //   },
};
