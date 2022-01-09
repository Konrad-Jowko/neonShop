import React from 'react';
import PropTypes from 'prop-types';

import styles from './About.module.scss';

const About = ({about}) => {
  const {crew, contact} = about;

  return (
    <div className={styles.root}>
      <h2 className={styles.header}> Our Team! </h2>

      <div className={styles.crewContainer}>
        {crew.map(member => (
          <div key={member.name} className={styles.crewMember}>
            <h3 className={styles.crewName}> {member.name} </h3>
            <div className={styles.crewImgContainer}>
              <img className={styles.crewImg} alt={member.photo} src={`./images/${member.photo}`} />
            </div>

            <h3 className={styles.crewSpeciality}> Specializes in: <span className={styles.crewSpecialityHighlight}> {member.speciality} </span> </h3>
            <p className={styles.crewBio}> {member.bio} </p>
          </div>
        ))}
      </div>

      <h2 className={styles.header}> You want to contact us? </h2>
      <div className={styles.contactContainer}>
        <h3 className={styles.contactInfo}> Our email: <br /> <span className={styles.contactInfoHighlight}> {contact.email} </span></h3>
        <h3 className={styles.contactInfo}> Telephone contact: <br /> <span className={styles.contactInfoHighlight}> {contact.tel} </span></h3>
        <h3 className={styles.contactInfo}> Our adress: <br />  <span className={styles.contactInfoHighlight}> {contact.adress} </span></h3>
        <h3 className={styles.contactInfo}> Working hours: <br /> <span className={styles.contactInfoHighlight}> {contact.hours} </span></h3>
      </div>
    </div>
  );
};

About.propTypes = {
  about: PropTypes.object,
};

export default About;
