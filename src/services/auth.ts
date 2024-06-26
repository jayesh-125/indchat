import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../configs/firebase";

export const CreateUserAuth = async (email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        ).then((data: any) => {
            return data.user;
        });
        if (!res) {
            throw new Error("response not found.");
        } else {
            return res;
        }
    } catch (error) {
        throw error;
    }
};

export const SignUserAuth = async (email: string, password: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password).then(
            (data: any) => {
                return data.user;
            }
        );
        if (!res) {
            throw Error("Respond not found.")
        }
        return res;
    } catch (error) {
        throw error;
    }
};

export const SignOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};
