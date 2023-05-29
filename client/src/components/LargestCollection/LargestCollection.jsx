import React, { useState } from 'react';
import {nanoid} from 'nanoid';
import data from './data.json';
import styles from './LargestCollection.module.scss';
const LargestCollection = () => {

  const [btnState, setStateBtn] = useState(data.articles);

  const btnMap=(elem) => <button key={nanoid()} className={elem.isPush ? styles.buttonActive : styles.button} onClick={handleClick}>
    <div>
      <div className={styles.elemTitle}>{elem.title}</div>
      <div className={styles.elemBody}>{elem.body}</div>
      </div>
      </button>

  const handleClick = ({ target:{innerText} }) => {
    
    setStateBtn(btnState.map((elem) => {
      
      return {
        ...elem,
        isPush: (innerText === elem.body||innerText === elem.title ? true : false)
      }
    }
    ));
  }
  return (
    <div className={styles.section}>
      <div className={styles.collectionBtn}>
        {btnState.map(btnMap)}
      </div>
    </div>
  );
}
export default LargestCollection;
