import {AbstractHandler} from "./AbstractHandler.js";
import {LogoutUseCase} from "../network/usecases/LogoutUseCase.js";
import {TokenUtilities} from "../utilities/TokenUtilities.js";
import {router} from "../index.js";


export class LogoutHandler extends AbstractHandler {
    constructor() {
        super();
        this.logoutUseCase = new LogoutUseCase();
    }

     async handle() {
         try {
             await this.logoutUseCase.execute();
             TokenUtilities.deleteToken()
             await router.navigate('/');
         } catch (error) {
             console.log(error);
         }
     }
}

