import { Component, OnInit, OnDestroy} from '@angular/core';
import { SpeechRecognitionService } from './speech-recognition.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
    showSearchButton: boolean;
    speechData: string;
    speechValue: string;
    buttonText: string ='Enable Speech Search';
    btnvalue: string = '';
    typingScheme: string = '';
    test : string = "checked";
    lang: string = '';
  
    constructor(private speechRecognitionService: SpeechRecognitionService) {
        this.showSearchButton = true;
        this.speechData = "";
        this.speechValue = "";
        //this.lang = 'en-us';
        this.buttonText = 'Enable Speech Search';
  
    }

    ngOnInit() {
        console.log("hello")
    }

    ngOnDestroy() {
        this.speechRecognitionService.DestroySpeechObject();
        this.showSearchButton = true;
        this.buttonText = 'Enable Speech Search';
    }

    handleChange(){ 
        this.speechValue = "";
    }

    clearTextBox(){
        this.speechValue = "";
    }

    sendEmail(inputElement){ 
    window.location.href = "mailto:?body=" + inputElement.value;
    }

    copyInputText(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    }

    specialCharacter(specialCharValue){
        this.speechValue = this.speechValue + specialCharValue;
    }

    specialCharacter2(specialCharValue){
        this.speechValue = this.speechValue + " " +specialCharValue;
    }

    backSpace(){
        this.speechValue = this.speechValue.slice(0, -1);
    }

    breakLine(){
        this.speechValue = this.speechValue + '';
    }

    onChange(event): void {  // event will give you full breif of action
        this.lang = event.target.value;
        console.log('Language is:'+this.lang);
        this.speechRecognitionService.setLanguage(this.lang);
    }


    playText(inputElement){ 
        var chatReadMsg = new SpeechSynthesisUtterance(inputElement.value);
        chatReadMsg.rate = 1.0;
        var synth = window.speechSynthesis;
        var voices = synth.getVoices();
         chatReadMsg.voice = voices[1];
        switch(this.lang) { 
            case 'en-US': { 
                chatReadMsg.voice = voices[1];
                break; 
            } 
            case 'en-GB': { 
                chatReadMsg.voice = voices[1]; 
                break; 
            }
            case 'en-IN': { 
                chatReadMsg.voice = voices[1]; 
                break; 
            }
            case 'hi-IN': { 
                chatReadMsg.voice = voices[9]; 
                break; 
            }
            case 'ja-JP': { 
                chatReadMsg.voice = voices[12]; 
                break; 
            }
            case 'ru-RU': { 
                chatReadMsg.voice = voices[17]; 
                break; 
            }
            case 'it-IT': { 
                chatReadMsg.voice = voices[11]; 
                break; 
            }
            case 'fr-FR': { 
                chatReadMsg.voice = voices[8]; 
                break; 
            }
            case 'es-ES': { 
                chatReadMsg.voice = voices[6]; 
                break; 
            } 
            case 'de-DE': { 
                chatReadMsg.voice = voices[2]; 
                break; 
            }
            default: { 
                chatReadMsg.voice = voices[1]; 
                break; 
            } 
        }

        window.speechSynthesis.speak(chatReadMsg);
    }

    activateSpeechSearchMovie(): void {
        this.buttonText = 'Speech To Text Conversion Started';
        
        this.showSearchButton = false;

        this.speechRecognitionService.record()
            .subscribe(
            //listener
            (value) => {
                this.speechData = value;             
                console.log(value);

                if(this.typingScheme=="chat"){
                    this.speechValue = this.speechData;
                }
                if(this.typingScheme=="email"){
                    this.speechData = " " + this.speechData;
                    this.speechValue += this.speechData;
                }
            },
            //errror
            (err) => {
                console.log(err);
                if (err.error == "no-speech") {
                    console.log("--restatring service--");
                    this.activateSpeechSearchMovie();
                }
            },
            //completion
            () => {
                this.showSearchButton = true;
                console.log("--complete--");
                this.activateSpeechSearchMovie();
            });
    }

}