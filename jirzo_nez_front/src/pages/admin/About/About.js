import React, {useEffect, useState} from 'react';
import AboutSection from '../../../components/admin/About/AboutSection';
import { getAccesToken } from "../../../api/auth";

import "./about.scss"
import { getAboutInfo } from '../../../api/about';


const About = () => {
  const [about, setAbout] = useState([]);
  const [reloadAbout, setReloadAbout] = useState(false);
  const token = getAccesToken();

  useEffect(() => {
    getAboutInfo(token).then((response) => {
      setAbout(response);
    })
  },  [token, reloadAbout])

  return (
   <>
    <div className="about">
      <AboutSection
        about={about}
        setReloadAbout={setReloadAbout}
      />
    </div>
   </>
  )
}

export default About