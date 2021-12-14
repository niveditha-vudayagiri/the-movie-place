import { UserService } from './../model/service/user.service';
import { User } from './../model/user';
import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { FormGroup } from "@angular/forms";

@Injectable({
    providedIn:'root'
})
export class CustomValidationService{

    constructor(private userService:UserService){}

    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }
          const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
          const valid = regex.test(control.value);
          return valid ? null : { invalidPassword: true };
        };
      }

    languageValidator() : ValidatorFn{
        return (control: AbstractControl):{ [key:string]: any}|null =>
            this.validateLanguage(control?.value) ? null: {wrongLanguage : control.value};
    }

    genreValidator() : ValidatorFn{
        return (control: AbstractControl):{ [key:string]: any}|null =>
            this.validateGenre(control?.value) ? null: {wrongGenre : control.value};
    }

      /*MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
          const passwordControl = formGroup.controls[password];
          const confirmPasswordControl = formGroup.controls[confirmPassword];
    
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
          } else {
            confirmPasswordControl.setErrors(null);
          }
        }
      }*/

      /*userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
          setTimeout(() => {
            if (this.validateUserName(userControl.value)) {
              resolve({ userNameNotAvailable: true });
            } else {
              resolve(null);
            }
          }, 1000);
        });
      }

      validateUserName(userName: string) {
        let UserList:string[]=[];
        this.userService.getAll().subscribe({
            next: (users: User[])=>
            {
                users.forEach(user => {
                    UserList.push(user.username)
                })
            },
            error:
            () => console.log('Cannot get users!')
        }
        )
        return (UserList.indexOf(userName) > -1);
      }*/

      validateLanguage(language: string) {
        let languages=[
            "Afrikaans",
            "Albanian",
            "Amharic",
            "Arabic",
            "Aragonese",
            "Armenian",
            "Asturian",
            "Azerbaijani",
            "Basque",
            "Belarusian",
            "Bengali",
            "Bosnian",
            "Breton",
            "Bulgarian",
            "Catalan",
            "Central Kurdish",
            "Chinese",
            "Chinese (Hong Kong)",
            "Chinese (Simplified)",
            "Chinese (Traditional)",
            "Corsican",
            "Croatian",
            "Czech",
            "Danish",
            "Dutch",
            "English",
            "English (Australia)",
            "English (Canada)",
            "English (India)",
            "English (New Zealand)",
            "English (South Africa)",
            "English (United Kingdom)",
            "English (United States)",
            "Esperanto",
            "Estonian",
            "Faroese",
            "Filipino",
            "Finnish",
            "French",
            "French (Canada)",
            "French (France)",
            "French (Switzerland)",
            "Galician",
            "Georgian",
            "German",
            "German (Austria)",
            "German (Germany)",
            "German (Liechtenstein)",
            "German (Switzerland)",
            "Greek",
            "Guarani",
            "Gujarati",
            "Hausa",
            "Hawaiian",
            "Hebrew",
            "Hindi",
            "Hungarian",
            "Icelandic",
            "Indonesian",
            "Interlingua",
            "Irish",
            "Italian",
            "Italian (Italy)",
            "Italian (Switzerland)",
            "Japanese",
            "Kannada",
            "Kazakh",
            "Khmer",
            "Korean",
            "Kurdish",
            "Kyrgyz",
            "Lao",
            "Latin",
            "Latvian",
            "Lingala",
            "Lithuanian",
            "Macedonian",
            "Malay",
            "Malayalam",
            "Maltese",
            "Marathi",
            "Mongolian",
            "Nepali",
            "Norwegian",
            "Norwegian Bokmål",
            "Norwegian Nynorsk",
            "Occitan",
            "Oriya",
            "Oromo",
            "Pashto",
            "Persian",
            "Polish",
            "Portuguese",
            "Portuguese (Brazil)",
            "Portuguese (Portugal)",
            "Punjabi",
            "Quechua",
            "Romanian",
            "Romanian (Moldova)",
            "Romansh",
            "Russian",
            "Scottish Gaelic",
            "Serbian",
            "Serbo",
            "Shona",
            "Sindhi",
            "Sinhala",
            "Slovak",
            "Slovenian",
            "Somali",
            "Southern Sotho",
            "Spanish",
            "Spanish (Argentina)",
            "Spanish (Latin America)",
            "Spanish (Mexico)",
            "Spanish (Spain)",
            "Spanish (United States)",
            "Sundanese",
            "Swahili",
            "Swedish",
            "Tajik",
            "Tamil",
            "Tatar",
            "Telugu",
            "Thai",
            "Tigrinya",
            "Tongan",
            "Turkish",
            "Turkmen",
            "Twi",
            "Ukrainian",
            "Urdu",
            "Uyghur",
            "Uzbek",
            "Vietnamese",
            "Walloon",
            "Welsh",
            "Western Frisian",
            "Xhosa",
            "Yiddish",
            "Yoruba",
            "Zulu"
        ];

        return (languages.indexOf(language) > -1);
      }

      validateGenre(genre: string){
          let genres=['Action','Adventure','Animated','Comedy','Drama','Fantasy','Historical',
          'Horror','Sci-fi','Thriller','Western','International'];

          return ( genres.indexOf(genre)>-1);
      }

}