import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../../redux/contacts/selectors';
import { addContact } from '../../redux/contacts/contactsOperations';
import { toast } from 'react-toastify';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { Form, FormLabel, FormInput, FormBtn } from './ContactForm.styled';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch(); 
  const contacts = useSelector(selectItems);

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const isAdded = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isAdded) {
      return toast.error(`${name} is already in contacts.`);
    }

    const newContact = { name: name, number: number }; 

    dispatch(addContact(newContact));
    resetForm(); 
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>
        Name:
        <FormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </FormLabel>

      <FormLabel>
        Number:
        <FormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </FormLabel>

      <FormBtn type="submit">
        <HiOutlineUserAdd />
        Add contact
      </FormBtn>
    </Form>
  );
};

export default ContactForm;
