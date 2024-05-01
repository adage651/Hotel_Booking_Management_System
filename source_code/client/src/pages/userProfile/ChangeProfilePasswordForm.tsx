import './ChangeProfilePasswordForm.css';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import notify from 'devextreme/ui/notify';
import { ValidationRule } from 'devextreme-react/common';
import Form, { Item, Label } from 'devextreme-react/form';
import Validator, { ValidatorTypes } from 'devextreme-react/validator';
import { FormPopup } from './FormPopup.tsx';
import { PasswordTextBox } from './PasswordTextBox.tsx';

const saveNewPassword = (): void => {
  notify({ message: 'Password Changed', position: { at: 'bottom center', my: 'bottom center' } }, 'success');
};

export const ChangeProfilePasswordForm = ({ visible, setVisible }) => {
  const confirmField = useRef<Validator>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(false);
  const [confirmedPasswordValid, setConfirmedPasswordValid] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

const passwordValidators = useMemo((): ValidationRule[] => {
  return [
    {
      type: 'stringLength',
      min: 7,
      message: 'Password must be at least 7 characters long',
    },
    {
      type: 'pattern',
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    },
  ];
}, []);

const confirmPasswordValidators = useMemo((): ValidationRule[] => {
  return [
    {
      type: 'compare',
      message: 'Passwords do not match',
      comparisonTarget: () => newPassword,
    },
    ...passwordValidators,
  ];
}, [newPassword, passwordValidators]);

  useEffect(() => {
    const formValues = [currentPassword, newPassword, confirmedPassword];
    const validity = [currentPasswordValid, newPasswordValid, confirmedPasswordValid];

    setIsSaveDisabled(
      formValues.some((value) => !value) ||
      validity.some((value) => !value)
    );
  }, [
    currentPassword,
    newPassword,
    confirmedPassword,
    currentPasswordValid,
    newPasswordValid,
    confirmedPasswordValid
  ]);

  const checkConfirm = useCallback(() => {
    confirmField.current?.instance.validate();
  }, []);

  const onCurrentPasswordValidated = useCallback((e: ValidatorTypes.ValidatedEvent) => {
    setCurrentPasswordValid(!!e.isValid);
  }, []);

  const onConfirmedPasswordValidated = useCallback((e: ValidatorTypes.ValidatedEvent) => {
    setConfirmedPasswordValid(!!e.isValid);
  }, []);

  const onNewPasswordValidated = useCallback((e: ValidatorTypes.ValidatedEvent) => {
    setNewPasswordValid(!!e.isValid);
  }, []);

  const onNewPasswordChange = useCallback((value) => {
    setNewPassword(value);

    checkConfirm();
  }, [checkConfirm]);

  return <FormPopup
    title='Change Password'
    visible={visible}
    width={360}
    height={410}
    wrapperAttr={{ class: 'change-profile-password-popup' }}
    isSaveDisabled={isSaveDisabled}
    onSave={saveNewPassword}
    setVisible={setVisible}
  >
    <Form id='form'
      labelMode='outside'
      showColonAfterLabel
      labelLocation='top'>
      <Item>
        <Label text='Current Password' />
        <PasswordTextBox
          value={currentPassword}
          placeholder='Current Password'
          onValueChange={setCurrentPassword}
          onValueValidated={onCurrentPasswordValidated}
        />
      </Item>

      <Item>
        <div className='h-separator' />
      </Item>

      <Item>
        <Label text='Password' />
<PasswordTextBox
  value={newPassword}
  placeholder='Password'
  onValueChange={onNewPasswordChange}
  onValueValidated={onNewPasswordValidated}
  validators={passwordValidators}
/>
      </Item>

      <Item>
        <Label text='Confirm Password' />
<PasswordTextBox
  ref={confirmField}
  value={confirmedPassword}
  placeholder='Confirm Password'
  validators={confirmPasswordValidators}
  onValueChange={setConfirmedPassword}
  onValueValidated={onConfirmedPasswordValidated}
/>
      </Item>
    </Form>
  </FormPopup>;
};