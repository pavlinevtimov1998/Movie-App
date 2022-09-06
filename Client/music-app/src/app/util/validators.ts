import { AbstractControl } from '@angular/forms';

export const passwordMatching = (password: AbstractControl) => {
  return (rePass: AbstractControl) => {
    if (password.value !== rePass.value) {
      return {
        notMatching: true,
      };
    }

    return null;
  };
};
