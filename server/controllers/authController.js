
import { LoginSchema, User_Schema } from "../schemaValidator/schema.js";
import { HandelOnSuccess } from "../utils/responseHandeler.js";
import { CreateUser, CustUserLogin } from "../service/authService.js";
import AppError from "../error/app.error.js";


export const CreateUserCtrl = async (req, res, next) => {
    try {
        const schema = User_Schema();
        const { error, value } = schema.validate(req.body);

        if (error) {
            const errorMessage = error.details[0].message;
            console.log("eerro msg", errorMessage)
            throw new AppError(errorMessage);
        }
        console.log("valu in req body", value)
        const user = await CreateUser(value);
        console.log("user is created", user)
        HandelOnSuccess(res)(user);


    } catch (error) {
        next(error);
    }
};




export const UserLoginCtrl = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // Check if email or password is missing
        if (!email || !password) {
            throw new AppError("Email and password are required.");
        }
        const schema = LoginSchema();
        const { error, value } = schema.validate({ email, password });
        if (error) {
            const errorMessage = error.details[0].message;
            throw new AppError(errorMessage);
        }

        const result = await CustUserLogin(value)
        if (!result) {  // Handle if result is null or undefined
            throw new AppError("Invalid login credentials.");
        }
        HandelOnSuccess(res)(result);
    } catch (error) {
        //console.log("errror in login", error)
        next(error);
    }
}