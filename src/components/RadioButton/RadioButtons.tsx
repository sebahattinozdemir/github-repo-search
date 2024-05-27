import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RadioButtons.module.css'; 
import { RootState } from '../../store/store';
import { setLanguage } from '../../features/reposSlice';

const RadioButtons: React.FC = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state: RootState) => state.repos.language);
  const languages = ['JavaScript', 'Scala', 'Python']; 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguage(event.target.value));
  };

  return (
    <fieldset className={styles.radioContainer}>
      <legend>Select a programming language</legend>
      {languages.map(lang => (
        <label key={lang}>
          <input
            type="radio"
            value={lang}
            checked={selectedLanguage === lang}
            onChange={handleChange}
          />
          {lang}
        </label>
      ))}
    </fieldset>
  );
};

export default RadioButtons;
