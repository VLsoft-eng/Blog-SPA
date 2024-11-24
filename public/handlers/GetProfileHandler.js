import {GetProfileUseCase} from "../network/usecases/GetProfileUseCase.js";
import {AbstractHandler} from "./AbstractHandler.js";

export class GetProfileHandler extends AbstractHandler{
    constructor() {
        super();
        this.getProfileUseCase = new GetProfileUseCase();
    }

    async handle() {
        const nameProfileInput = document.getElementById("name-profile-input");
        const emailProfileInput = document.getElementById("email-profile-input");
        const phoneProfileInput = document.getElementById("phone-profile-input");
        const genderProfileInput = document.getElementById("gender-profile-input");
        const birthProfileInput = document.getElementById("birth-profile-input");

        try{
            const profileInfo =  await this.getProfileUseCase.execute();
            const formattedBirthDate = this.formatDate(profileInfo.birthDate);
            if (profileInfo.phoneNumber) {
                phoneProfileInput.value = profileInfo.phoneNumber;
            }

            nameProfileInput.value = profileInfo.fullName;
            emailProfileInput.value = profileInfo.email;
            genderProfileInput.value = profileInfo.gender;
            birthProfileInput.value = formattedBirthDate;
        } catch (error)
        {
            return error
        }
    }
}