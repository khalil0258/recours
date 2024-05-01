import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import ProtectedRoutes from "../helpers/ProtectedRoutes";
import Landing from "../screens/landingpage/Landing";
import Effectuer from "../screens/assure/effectuerRecours/Effectuer";
import ConsulterRec from "../screens/assure/consulter_rec/Consulter_rec";
import ConsulterD from "../screens/assure/consulter_D/Consulter_D";
import Home from "../screens/assure/home/Home";
import Compte from "../screens/assure/Compte/Compte";
import { useDispatch, useSelector } from "react-redux";
import { checkIsConnected } from "../redux/actions/authActions";

const RouteContainer = () => {
  const dispatch = useDispatch();
   
  
  const userInfos = useSelector((state) => state.auth?.userInfos);
  const loading = useSelector((state) => state.auth?.loading);
  //console.log(userInfos);
  useEffect(() => {
    // Dispatch the checkIsConnected action when the component mounts
    dispatch(checkIsConnected());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          {/* cette  c est la page d accueil  */}
          <Route path="/" element={<Landing />} />
          {/* hado juste pour l assure  */}
          <Route
            path="/assure"
            element={
              <ProtectedRoutes
                isAuth={userInfos && userInfos?.connected}
                loading={loading}
              />
            }
          >
            {/* Route par défaut pour le tableau de bord */}
            <Route index element={<Home />} />

            <Route path="soumetre_recours" element={<Effectuer />} exact />
            <Route path="consulter_recours" element={<ConsulterRec />} exact />
            <Route path="consulter_decisions" element={<ConsulterD />} exact />
            <Route path="mon_profile" element={<Compte />} exact />
            <Route path="*" element={<Home />} />
          </Route>
          {/* apres ndiro ta3 secretaire  */}
        </Routes>
      </Router>
    </>
  );
};

export default RouteContainer;
