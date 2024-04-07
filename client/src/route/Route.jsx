import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "../helpers/ProtectedRoutes";
import Landing from "../screens/landingpage/Landing";
import Effectuer from "../screens/assure/effectuerRecours/Effectuer";
import ConsulterRec from "../screens/assure/consulter_rec/Consulter_rec";
import ConsulterD from "../screens/assure/consulter_D/Consulter_D";
import Home from "../screens/assure/home/Home";
import Compte from "../screens/assure/Compte/Compte";

const RouteContainer = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* cette  c est la page d accueil  */}
          <Route path="/" element={<Landing />} />
          {/* hado juste pour l assure  */}
          <Route path="/assure" element={<ProtectedRoutes isAuth={true} />}>
            {/* Route par défaut pour le tableau de bord */}
            <Route index element={<Home />} />
            <Route path="tableau_de_bord" element={<Home />} exact />
            <Route path="soumetre_recours" element={<Effectuer />} exact />
            <Route path="consulter_recours" element={<ConsulterRec />} exact />
            <Route path="consulter_decisions" element={<ConsulterD />} exact />
            <Route path="mon_profile" element={<Compte />} exact />
          </Route>
          {/* apres ndiro ta3 secretaire  */}
        </Routes>
      </Router>
    </>
  );
};

export default RouteContainer;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoutes from "../helpers/ProtectedRoutes";
import Landing from "../screens/landingpage/Landing";
import Effectuer from "../screens/assure/effectuerRecours/Effectuer";
import Consulter_rec from "../screens/assure/consulter_rec/Consulter_rec";
import Consulter_D from "../screens/assure/consulter_D/Consulter_D";
import Home from "../screens/assure/home/Home";
import Compte from "../screens/assure/Compte/Compte";

const RouteContainer = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* cette  c est la page d accueil  */}
          <Route path="/" element={<Landing />} />
          {/* hado juste pour l assure  */}
          <Route path="/assure" element={<ProtectedRoutes isAuth={true} />}>
            {/* Route par défaut pour le tableau de bord */}
            <Route index element={<Home />} />
            <Route path="tableau_de_bord" element={<Home />} exact />
            <Route path="soumetre_recours" element={<Effectuer />} exact />
            <Route path="consulter_recours" element={<Consulter_rec />} exact />
            <Route path="consulter_decisions" element={<Consulter_D />} exact />
            <Route path="mon_profile" element={<Compte />} exact />
          </Route>
          {/* apres ndiro ta3 secretaire  */}
        </Routes>
      </Router>
    </>
  );
};

export default RouteContainer;
