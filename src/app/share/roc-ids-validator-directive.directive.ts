import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
} from 'taiwan-id-validator'

/**
 * 檢查是否符合中華民國證件格式
 * 1. 身分證
 * 2. 居留證(新式+舊式)
 */
@Directive({
  selector: '[appRocIdsValidator]'
  ,providers: [{
    provide:NG_VALIDATORS,
    useExisting:RocIdsValidatorDirectiveDirective
    ,multi:true
  }]
})
export class RocIdsValidatorDirectiveDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    const val:string = control.value

    if(!val) {
      return null 
    }
    
    if(isNationalIdentificationNumberValid(val) || isResidentCertificateNumberValid(val)){
      return null
    }
    return {rocIds:true}

    //throw new Error('Method not implemented.');
  }

}
